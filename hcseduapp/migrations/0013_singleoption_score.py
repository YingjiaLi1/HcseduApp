# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-08-24 15:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hcseduapp', '0012_auto_20190824_1505'),
    ]

    operations = [
        migrations.AddField(
            model_name='singleoption',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]
