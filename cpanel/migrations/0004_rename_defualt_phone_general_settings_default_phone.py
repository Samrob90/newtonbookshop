# Generated by Django 4.1.3 on 2022-12-03 23:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("cpanel", "0003_general_settings"),
    ]

    operations = [
        migrations.RenameField(
            model_name="general_settings",
            old_name="defualt_phone",
            new_name="default_phone",
        ),
    ]