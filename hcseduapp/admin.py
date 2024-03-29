from django.contrib import admin
from hcseduapp.models import UserProfile,Topic, Question, Finished_Questions, FreeTextA, MultipleChoiceQ, MultipleChoiceA, LinkedQ, AssertionReasonQ, SingleOption, AssertionReasonA

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'picture', 'score')

class TopicAdmin(admin.ModelAdmin):
    list_display = ('topic', 'description')

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('questionid', 'description', 'topic', 'type', 'linkedstatus', 'video', 'image', 'explanation')

class Finished_QuestionsAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'score')

class FreeTextAAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer', 'score')

class SingleOptionAdmin(admin.ModelAdmin):
    list_display = ('question', 'opno', 'opcontent','score')

class MultipleChoiceQAdmin(admin.ModelAdmin):
    list_display = ('question', 'opno', 'opcontent')

class MultipleChoiceAAdmin(admin.ModelAdmin):
    list_display = ('question', 'opno', 'opscore', 'explanation', 'video')

class LinkedQAdmin(admin.ModelAdmin):
    list_display = ('question', 'opno', 'linkedid')

class AssertionReasonQAdmin(admin.ModelAdmin):
    list_display = ('question', 'opno', 'opcontent')

class AssertionReasonAAdmin(admin.ModelAdmin):
    list_display = ('question', 'firstno', 'secondno', 'score', 'explanation')

# Register your models here.


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Finished_Questions, Finished_QuestionsAdmin)
admin.site.register(FreeTextA, FreeTextAAdmin)
admin.site.register(SingleOption, SingleOptionAdmin)
admin.site.register(MultipleChoiceQ, MultipleChoiceQAdmin)
admin.site.register(MultipleChoiceA, MultipleChoiceAAdmin)
admin.site.register(LinkedQ, LinkedQAdmin)
admin.site.register(AssertionReasonQ, AssertionReasonQAdmin)
admin.site.register(AssertionReasonA, AssertionReasonAAdmin)
