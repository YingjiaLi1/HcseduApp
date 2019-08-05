from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from itertools import chain


from hcseduapp.models import UserProfile, Topic, Question, Finished_Questions, FreeTextQ, FreeTextA, MultipleChoiceQ, \
    MultipleChoiceA, LinkedQ, LinkedA, AssertionReasonQ, AssertionReasonA
import json;

# Create your views here.

def index(request):
    context_dict = {'boldmessage': "Learn more about Human-Centred Security Here!"}
    return render(request, 'hcseduapp/index.html', context=context_dict)


def question(request):
    curr_question = Question.objects.filter(questionid=4)[0]
    print(curr_question)
    multi_options = MultipleChoiceQ.objects.filter(question=curr_question)
    assrea_options = AssertionReasonQ.objects.filter(question=curr_question)

    return render(request, 'hcseduapp/question.html',
                  {'curr_question': curr_question, 'multi_options': multi_options, 'assrea_options': assrea_options, })


@csrf_exempt
def verify_answer(request):
    print("test1")
    selected_option = str(request.GET.get('selectedOption'))
    print(selected_option)

    answer_list = selected_option.split(",")
    queno = answer_list[0]
    ori_question = Question.objects.get(questionid=queno)
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

    print(score)
    print(explanation)

    data = (selected_option, score, explanation)



    return HttpResponse(json.dumps({"data": data}))
