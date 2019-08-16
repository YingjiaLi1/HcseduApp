from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
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


def topic(request):
    topics = Topic.objects.all()

    return render(request, 'hcseduapp/topic.html', {"topics": topics})


@csrf_exempt
def showTopic(request):
    topic_name = request.GET.get('tarId')
    curr_topic = Topic.objects.filter(topic=topic_name)[0]
    topic_description = curr_topic.description

    topic_info = (topic_name, topic_description)
    return HttpResponse(json.dumps(topic_info))


def question(request):
    curr_question = Question.objects.filter(questionid=7)[0]
    # print(curr_question.type)
    multi_options = MultipleChoiceQ.objects.filter(question=curr_question)
    assrea_options = AssertionReasonQ.objects.filter(question=curr_question)

    return render(request, 'hcseduapp/question.html',
                  {'curr_question': curr_question, 'multi_options': multi_options, 'assrea_options': assrea_options, })


@csrf_exempt
def next_question(request):
    current_queid = int(request.GET.get('currentQue'))
    # print("current q id: "+str(current_queid))
    curr_question = Question.objects.filter(questionid=current_queid)[0]
    curr_topic = Topic.objects.filter(topic=curr_question.topic)[0].topic
    # print(curr_topic)
    curr_type = curr_question.type
    linkstatus = curr_question.linkedstatus
    curr_link_status = curr_question.linkedstatus
    curr_question_jsonable = {"description": curr_question.description, "type": curr_question.type,
                              "video": curr_question.video, "image": curr_question.image, "questionid": curr_question.questionid}



    if curr_type == "Multiple Choice":
        multi_options = MultipleChoiceQ.objects.filter(question=curr_question)
        m_opid = []
        m_opno = []
        m_opcontent = []
        for m_option in multi_options:
            m_opid.append(m_option.id)
            m_opno.append(m_option.opno)
            m_opcontent.append(m_option.opcontent)

        question = (curr_question_jsonable, curr_topic, m_opno, m_opcontent, m_opid, curr_link_status)

    elif curr_type == "Single Choice":
        single_options = MultipleChoiceQ.objects.filter(question=curr_question)
        sg_opid = []
        sg_opno = []
        sg_opcontent = []
        for sg_option in single_options:
            sg_opid.append(sg_option.id)
            sg_opno.append(sg_option.opno)
            sg_opcontent.append(sg_option.opcontent)

            question = (curr_question_jsonable, curr_topic, sg_opno, sg_opcontent, sg_opid, curr_link_status)


    elif curr_type == "Assertion Reason":
        assrea_options = AssertionReasonQ.objects.filter(question=curr_question)
        ar_opid = []
        ar_opno = []
        ar_opcontent = []
        for ar_option in assrea_options:
            ar_opid.append(ar_option.id)
            ar_opno.append(ar_option.opno)
            ar_opcontent.append(ar_option.opcontent)

        # print(ar_opcontent)
        question = (curr_question_jsonable, curr_topic, ar_opno, ar_opcontent, ar_opid, curr_link_status)



    return HttpResponse(json.dumps(question))



@csrf_exempt
def verify_answer(request):
    # print("test1")
    selected_option = str(request.GET.get('selectedOption'))
    free_answer = str(request.GET.get('FreeAnswer'))

    answer_list = selected_option.split(",")
    queno = answer_list[0]
    # print(answer_list)
    all_options = answer_list[1:]
    # print("test: a"+(",".join(all_options)))
    my_answers = ",".join(all_options)
    ori_question = Question.objects.get(questionid=queno)
    que_exp = ori_question.explanation
    queid = ori_question.id
    linkstatus = ori_question.linkedstatus
    que_type = ori_question.type
    # freetext_answer = FreeTextQ.objects.filter(question=queid).update(text=free_answer)
    # print("queid: " + queid.__str__())
    # print("checkstatus"+firstlink_opno)
    score = 0
    explanation = []
    # print(free_answer)

    curr_user = request.user
    # print("username: "+curr_user)
    question_finished = Finished_Questions.objects.filter(question=ori_question)

    if que_type == "Free Text":
        free_exp = FreeTextA.objects.filter(question=queid)[0].answer
        free_score = FreeTextA.objects.filter(question=queid)[0].score
        # print("user_exist: "+user_exist)
        # print("question_finished:"+question_finished))

        if free_answer!="":
            if question_finished:
                    Finished_Questions.objects.filter(question=ori_question).update(answer=free_answer, score=free_score)
            else:
                Finished_Questions.objects.create(user=curr_user, question=ori_question, answer=free_answer, score=free_score)

        data = (score, free_exp, free_score, que_exp, que_type, linkstatus)

    elif que_type == "Assertion Reason":
        assrea_answers = AssertionReasonA.objects.filter(question=queid)
        first_op = answer_list[1]
        del answer_list[0: 2]
        second_op = ','.join(answer_list)
        # print(first_op)

        for ar_option in assrea_answers:
            if first_op == ar_option.firstno:
                explanation.append(ar_option.explanation)
                # print(explanation)
                # print(ar_option.secondno)
                if second_op == ar_option.secondno:
                    score += ar_option.score

        if all_options:
            if question_finished:
                    Finished_Questions.objects.filter(question=ori_question).update(answer=my_answers, score=score)
            else:
                Finished_Questions.objects.create(user=curr_user, question=ori_question, answer=my_answers,
                                                  score=score)

        data = (selected_option, score, explanation, que_exp, que_type, linkstatus)

    elif que_type == "Multiple Choice":
        multi_answers = MultipleChoiceA.objects.filter(question=queid)
        for option in answer_list:
            for m_option in multi_answers:
                if option == m_option.opno:
                    score += m_option.opscore
                    explanation.append(m_option.explanation)
                    video = m_option.video

        if all_options:
            if question_finished:
                    Finished_Questions.objects.filter(question=ori_question).update(answer=my_answers, score=score)
            else:
                Finished_Questions.objects.create(user=curr_user, question=ori_question, answer=my_answers, score=score)

        data = (selected_option, score, explanation, que_exp, que_type, linkstatus, video)


    elif que_type == "Single Choice":
        single_answers = MultipleChoiceA.objects.filter(question=queid)
        for option in answer_list:
            for sg_option in single_answers:
                if option == sg_option.opno:
                    score += sg_option.opscore
                    explanation.append(sg_option.explanation)

        if all_options:
            if question_finished:
                    Finished_Questions.objects.filter(question=ori_question).update(answer=my_answers, score=score)
            else:
                Finished_Questions.objects.create(user=curr_user, question=ori_question, answer=my_answers, score=score)

        data = (selected_option, score, explanation, que_exp, que_type, linkstatus)
    # print(score)
    # print(explanation)


    return HttpResponse(json.dumps({"data": data}))


@csrf_exempt
def next_LinkQ(request):
    selected_option = str(request.GET.get('selectedOption'))

    answer_list = selected_option.split(",")
    # print("answer list:  "+str(selected_option))
    queno = answer_list[0]
    firstlink_opno = answer_list[1]

    linkqid = LinkedQ.objects.filter(opno=firstlink_opno)[0].linkedid
    # print(str(linkqid))
    linked_que = Question.objects.filter(questionid=str(linkqid))[0]
    # print(str(linkedq.id))
    linkedq_oriid = linked_que.id
    linkq_topic = Topic.objects.get(topic=linked_que.topic).topic
    linkq_type = linked_que.type
    linkedQ_jsonable = {"description": linked_que.description, "type": linkq_type, "video": linked_que.video, "image":linked_que.image, "questionid":linked_que.questionid}

    if linkq_type == "Multiple Choice":
        link_multi_options = MultipleChoiceQ.objects.filter(question=linkedq_oriid)
        link_opid = []
        link_opno = []
        link_opcontent = []
        for link_option in link_multi_options:
            link_opid.append(link_option.id)
            link_opno.append(link_option.opno)
            link_opcontent.append(link_option.opcontent)

        linkinfo = (linkedQ_jsonable, linkq_topic, link_opno, link_opcontent, link_opid)

    elif linkq_type == "Assertion Reason":
        link_assrea_options = AssertionReasonQ.objects.filter(question=linkedq_oriid)
        ar_opid = []
        ar_opno = []
        ar_opcontent = []
        for ar_option in link_assrea_options:
            ar_opid.append(ar_option.id)
            ar_opno.append(ar_option.opno)
            ar_opcontent.append(ar_option.opcontent)

        # print(ar_opcontent)
        linkinfo = (linkedQ_jsonable, linkq_topic, ar_opno, ar_opcontent, ar_opid)

    return HttpResponse(json.dumps(linkinfo))


@csrf_exempt
def end_train(request):
    current_queid = int(request.GET.get('currentQue'))
    return HttpResponse(json.dumps({"data": current_queid}))


def myhistory(request):
    curr_user = request.user
    finished_ques = Finished_Questions.objects.filter(user = curr_user)
    # myQues = Question.objects.filter()
    totalscore = 0
    for que in finished_ques:
        totalscore += que.score

    return render(request, 'hcseduapp/myhistory.html', {'finished_ques': finished_ques, 'user': curr_user, 'totalscore': totalscore})


def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
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

    return render(request, 'hcseduapp/register.html',
                  {'user_form': user_form, 'profile_form': profile_form, 'registered': registered})


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        errors = {}
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('index'))
            else:
                return HttpResponseRedirect("Your account is disabled")
        else:
            errors = {"Invalid Username and/or Password"}

        return render(request, 'hcseduapp/login.html', {'errors': errors})
    else:
        return render(request, 'hcseduapp/login.html', {})


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


@login_required
def profile(request, username):
    user = User.objects.get(username=username)
    user_profile = UserProfile.objects.get(user=user)

    if request.method == 'POST':
        #user_form = UserForm(request.POST, instance=user)
        profile_form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
        if profile_form.is_valid():
            #user_form.save()
            profile_form.save()
            #messages.success(request, _('Your profile was successfully updated!'))
            #return redirect('settings:profile')
            return redirect('profile', user.username)
        else:
            print(profile_form.errors)
    else:
        #user_form = UserForm(instance=user)
        profile_form = UserProfileForm(instance=user_profile)
    return render(request, 'hcseduapp/profile.html', {
        'userprofile': user_profile,
        'selecteduser': user,
        'form' : profile_form
    })
