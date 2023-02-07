# Generated by Django 4.1.3 on 2023-02-07 02:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("cpanel", "0002_book_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dealofweek",
            name="book",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="cpanel.book",
                verbose_name="Choose a book",
            ),
        ),
        migrations.AlterField(
            model_name="dealofweek",
            name="discount",
            field=models.IntegerField(default=None, verbose_name="Discount off (%)"),
        ),
        migrations.AlterField(
            model_name="dealofweek",
            name="periode",
            field=models.DateTimeField(default=None, verbose_name="Expirind date"),
        ),
        migrations.AlterField(
            model_name="dealofweek",
            name="quantity",
            field=models.IntegerField(default=None, verbose_name="Books quantity"),
        ),
    ]