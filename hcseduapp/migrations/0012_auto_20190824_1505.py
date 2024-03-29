# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-08-24 15:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hcseduapp', '0011_multiplechoicea_video'),
    ]

    operations = [
        migrations.CreateModel(
            name='SingleOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opno', models.CharField(default=None, max_length=10)),
                ('opcontent', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='ifsingle',
            field=models.BooleanField(choices=[(True, 'Yes'), (False, 'No')], default=False),
        ),
        migrations.AddField(
            model_name='singleoption',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hcseduapp.Question'),
        ),
    ]
