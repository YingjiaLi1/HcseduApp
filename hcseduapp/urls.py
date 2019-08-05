from django.conf.urls import url
from hcseduapp import views

app_name = 'hcseduapp'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^question/$', views.question, name='question'),
    url(r'^verify/$', views.verify_answer, name='verify_answer'),

]
