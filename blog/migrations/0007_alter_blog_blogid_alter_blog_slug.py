# Generated by Django 4.1.3 on 2022-12-05 22:02

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0006_blog_slug_alter_blog_blogid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog",
            name="blogid",
            field=models.UUIDField(
                default=uuid.UUID("ff38a9e8-f4e9-4c43-ab34-292076c8a36f"),
                editable=False,
            ),
        ),
        migrations.AlterField(
            model_name="blog",
            name="slug",
            field=models.SlugField(default=None, unique=True),
        ),
    ]
