# Generated by Django 4.1.3 on 2022-12-09 19:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("cpanel", "0005_alter_general_settings_address"),
    ]

    operations = [
        migrations.CreateModel(
            name="rating",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("stars", models.IntegerField(default=None)),
                ("comment", models.TextField(blank=True, default=None, null=True)),
                ("likes", models.IntegerField(blank=True, default=0, null=True)),
                ("dislikes", models.IntegerField(blank=True, default=0, null=True)),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "book",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="cpanel.book",
                        verbose_name="book",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="user",
                    ),
                ),
            ],
        ),
    ]
