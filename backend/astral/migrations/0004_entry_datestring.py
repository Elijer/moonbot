# Generated by Django 3.2.9 on 2021-11-12 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('astral', '0003_auto_20211112_0246'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='dateString',
            field=models.CharField(default=-2012, max_length=10),
            preserve_default=False,
        ),
    ]
