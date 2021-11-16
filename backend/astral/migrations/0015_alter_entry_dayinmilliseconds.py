# Generated by Django 3.2.9 on 2021-11-16 20:33

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('astral', '0014_auto_20211116_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='dayInMilliseconds',
            field=models.PositiveBigIntegerField(null=True, validators=[django.core.validators.MaxValueValidator(35185644000000)]),
        ),
    ]
