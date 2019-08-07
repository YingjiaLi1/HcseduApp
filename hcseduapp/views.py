from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from hcseduapp.forms import UserForm, UserProfileForm
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core import serializers
from itertools import chain
from hcseduapp.models import UserProfile, Topic, Question, Finished_Questions, FreeTextQ, FreeTextA, MultipleChoiceQ, \
    MultipleChoiceA, LinkedQ, LinkedA, AssertionReasonQ, AssertionReasonA
import json;

# Create your views here.

def index(request):
    context_dict = {'boldmessage': "Learn more about Human-Centred Security Here!"}
    return render(request, 'hcseduapp/index.html', context=context_dict)


def question(request):

    curr_question = Question.objects.filter(questionid=2)[0]
    print(curr_question)
    multi_options = MultipleChoiceQ.objects.filter(question=curr_question)
    assrea_options = AssertionReasonQ.objects.filter(question=curr_question)

    return render(request, 'hcseduapp/question.html',
                  {'curr_question': curr_question, 'multi_options': multi_options, 'assrea_options': assrea_options, })


@csrf_exempt
def next_question(request):
    current_queid = int(request.GET.get('currentQue'))

    curr_question = Question.objects.filter(questionid=current_queid)[0]
    curr_topic = Topic.objects.filter(topic=curr_question.topic)[0].topic
    print(curr_topic)
    curr_question_jsonable = {"description": curr_question.description, "type": curr_question.type, "video": curr_question.video, "image": curr_question.image}
    multi_options = MultipleChoiceQ.objects.filter(question=curr_question)
    assrea_options = AssertionReasonQ.objects.filter(question=curr_question)

    m_opid = []
    m_opno = []
    m_opcontent = []
    for m_option in multi_options:
            m_opid.append(m_option.id)
            m_opno.append(m_option.opno)
            m_opcontent.append(m_option.opcontent)

    # multi_options_jsonable = {"opno": multi_options.opno, "opcontent": multi_options.opcontent}

    # print(curr_question_jsonable)

    # ajax_question = serializers.serialize("json", curr_question)

    # multi_options_jsonable = (m_opno, m_opcontent)
    question = (curr_question_jsonable, curr_topic, m_opno, m_opcontent, m_opid)

    return HttpResponse(json.dumps(question))


# @csrf_exempt
# def next_question(request):
#     current_queid = int(request.GET.get('currentQue'))
#
#     curr_question = Question.objects.filter(questionid=current_queid)[0]
#     curr_question_jsonable = {"explanation": curr_question.explanation}
#     multi_options = MultipleChoiceQ.objects.filter(question=curr_question)
#     assrea_options = AssertionReasonQ.objects.filter(question=curr_question)
#
#     print(curr_question_jsonable)
#
#     # ajax_question = serializers.serialize("json", curr_question)
#
#     return HttpResponse(json.dumps(curr_question_jsonable))


@csrf_exempt
def verify_answer(request):
    # print("test1")
    selected_option = str(request.GET.get('selectedOption'))
    # print(selected_option)

    answer_list = selected_option.split(",")
    queno = answer_list[0]
    ori_question = Question.objects.get(questionid=queno)
    que_exp = ori_question.explanation
    queid = ori_question.id
    multi_answers = MultipleChoiceA.objects.filter(question=queid)
    assrea_answers = AssertionReasonA.objects.filter(question=queid)

    score = 0
    explanation = []
    for option in answer_list:
        for m_option in multi_answers:
            if option == m_option.opno:
                score += m_option.opscore
                explanation.append(m_option.explanation)

    # print(score)
    # print(explanation)

    data = (selected_option, score, explanation, que_exp)

    return HttpResponse(json.dumps({"data": data}))








def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid() :
            user = user_form.save(commit=True)
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user

            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']
            profile.save()
            registered = True

        else:
            print(user_form.errors, profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    return render(request,'hcseduapp/register.html', {'user_form': user_form, 'profile_form': profile_form, 'registered': registered})


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        errors = {}
        if user:
            if user.is_active:
                login(request,user)
                return HttpResponseRedirect(reverse('index'))
            else:
                return HttpResponseRedirect("Your account is disabled")
        else:
            errors = { "Invalid Username and/or Password" }

        return render(request, 'hcseduapp/login.html', { 'errors' : errors })
    else:
        return render(request, 'hcseduapp/login.html', {})


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))

