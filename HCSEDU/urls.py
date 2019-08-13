"""HCSEDU URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from hcseduapp import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^question/$', views.question, name='question'),
    url(r'^admin/', admin.site.urls),
    url(r'^verify/$', views.verify_answer, name='verify_answer'),
    url(r'^nextQue/$', views.next_question, name='next_question'),
    url(r'^nextLinkQ/$', views.next_LinkQ, name='next_LinkQ'),
    url(r'^endTraining/$', views.end_train, name='end_train'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^topic/$', views.topic, name='topic'),
    url(r'^showTopic/$', views.showTopic, name='show_topic'),
    url(r'^profile/(?P<username>[\w\-]+)/$', views.profile, name='profile'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
