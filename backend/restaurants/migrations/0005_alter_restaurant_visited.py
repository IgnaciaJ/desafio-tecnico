# Generated by Django 4.0.2 on 2022-02-02 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0004_alter_restaurant_visited'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='visited',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
