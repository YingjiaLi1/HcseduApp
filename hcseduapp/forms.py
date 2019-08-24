from django import forms
from django.contrib.auth.models import User
from hcseduapp.models import UserProfile,Topic, Question, Finished_Questions,FreeTextA, MultipleChoiceQ, MultipleChoiceA, LinkedQ, AssertionReasonQ, AssertionReasonA
from django.forms.widgets import RadioSelect


class UserForm(forms.ModelForm):
    password =forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username','email','password',)
        # exclude = ('score',)


class UserProfileForm(forms.ModelForm):

    class Meta:
        model = UserProfile
        fields = ('picture', 'email', 'score',)
        # exclude = ('score','user',)



class MultipleChoiceForm(forms.ModelForm):
    class Meta:
        model = MultipleChoiceQ
        fields = ('opno','opcontent')
