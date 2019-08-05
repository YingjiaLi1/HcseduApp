from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

# Create your models here.
TOPIC_CHOICES = (
    ('default','Please select:'),
    ('Social Engineering','Social Engineering'),
    ('Password Design','Password Design'),
    ('Side-channel Attack','Side-channel Attack'),
    ('Malwares','Malwares'),

)

TYPE_CHOICES = (
    ('default','Please select:'),
    ('Free Text','Free Text'),
    ('Multiple Choice','Multiple Choice'),
    ('Assertion Reason','Assertion Reason'),
)

BOOL_CHOICES = ((True, 'Yes'), (False, 'No'))


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # name = models.CharField(max_length=30, blank=False)
    picture = models.ImageField(upload_to='profile_images', blank=True)
    email = models.EmailField(max_length=50,blank=True)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username


class Topic(models.Model):
    topic = models.CharField(max_length=30, choices=TOPIC_CHOICES, default='default')
    description = models.CharField(max_length=2000)

    def __str__(self):
        return self.topic


class Question(models.Model):
    questionid = models.IntegerField(unique = True, default = 0)
    description = models.CharField(max_length=2000)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='default')
    linkedstatus = models.BooleanField(choices=BOOL_CHOICES, default=False)
    video = models.FileField(upload_to="questions", blank=True, verbose_name='Video Upload', validators=[FileExtensionValidator(allowed_extensions=['mp4','webm','ogg'])])
    image = models.FileField(upload_to="questions", blank=True, verbose_name='Thumbnail Upload', validators=[FileExtensionValidator(allowed_extensions=['png','jpeg','jpg'])])
    explanation = models.CharField(max_length=2000, blank=True, default="null")

    def __str__(self):
        return str(self.questionid)


class Finished_Questions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=2000,default=None)
    score = models.IntegerField(blank=False, default=0)

    def __str__(self):
        return self


class FreeTextQ(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=2000)

    def __str__(self):
        return self


class FreeTextA(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=2000)
    score = models.IntegerField(blank=False, default=0)

    def __str__(self):
        return str(self.question)


class MultipleChoiceQ(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    opno = models.CharField(max_length=10,default=None)
    opcontent = models.CharField(max_length=200)

    def __str__(self):
        return str(self.question)


class MultipleChoiceA(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    opno = models.CharField(max_length=10,default=None)
    opscore = models.IntegerField(blank=False, default=0)
    explanation = models.CharField(max_length=2000)

    class Meta:
        unique_together = (('question', 'opno'), )

    def __str__(self):
        return str(self.question)


class LinkedQ(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_id")
    linkedid = models.ForeignKey(Question, to_field="questionid", db_column="questionid", related_name="linked_question_id")

    class Meta:
        unique_together = (('question', 'linkedid'), )

    def __str__(self):
        return str(self.question)


class LinkedA(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_answer_id")
    opno = models.CharField(max_length=10,default=None)
    linkedid = models.ForeignKey(Question, to_field="questionid", db_column="questionid", related_name="linked_question_answer_id")
    linkno = models.CharField(max_length=10,default=None)
    score = models.IntegerField(blank=False, default=0)
    explanation = models.CharField(max_length=2000)

    class Meta:
        unique_together = (('question', 'opno', 'linkedid', 'linkno'), )

    def __str__(self):
        return str(self.question)


class AssertionReasonQ(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    opno = models.CharField(max_length=10,default=None)
    opcontent = models.CharField(max_length=200)

    def __str__(self):
        return str(self.question)


class AssertionReasonA(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    firstno = models.CharField(max_length=10,default=None)
    secondno = models.CharField(max_length=10,default=None)
    score = models.IntegerField(blank=False, default=0)
    explanation = models.CharField(max_length=2000)

    class Meta:
        unique_together = (('question', 'firstno', 'secondno'), )

    def __str__(self):
        return str(self.question)
