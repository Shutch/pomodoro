# Generated by Django 4.0.4 on 2022-05-10 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timer', '0002_alter_timer_end_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timer',
            name='end_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]