# Generated by Django 4.1.3 on 2023-02-07 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("cpanel", "0005_remove_dealofweek_created_by"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="onsale",
            name="created_by",
        ),
    ]