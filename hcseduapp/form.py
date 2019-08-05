from django import forms
from django.contrib.auth.models import User
from hcseduapp.models import UserProfile,Topic, Question, Finished_Questions, FreeTextQ, FreeTextA, MultipleChoiceQ, MultipleChoiceA, LinkedQ, LinkedA, AssertionReasonQ, AssertionReasonA
from django.forms.widgets import RadioSelect


class MultipleChoiceForm(forms.ModelForm):
    class Meta:
        model = MultipleChoiceQ
        fields = ('opno','opcontent')
