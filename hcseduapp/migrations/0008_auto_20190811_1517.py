# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-08-11 15:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hcseduapp', '0007_auto_20190807_2014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(default='default.jpg', upload_to='profile_images'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='score',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]