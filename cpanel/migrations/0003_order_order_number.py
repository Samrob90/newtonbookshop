# Generated by Django 4.1.3 on 2022-12-22 15:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("cpanel", "0002_remove_order_uuid"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="order_number",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
