# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-08-12 16:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hcseduapp', '0008_auto_20190811_1517'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='type',
            field=models.CharField(choices=[('default', 'Please select:'), ('Free Text', 'Free Text'), ('Single Choice', 'Single Choice'), ('Multiple Choice', 'Multiple Choice'), ('Assertion Reason', 'Assertion Reason')], default='default', max_length=30),
        ),
    ]
