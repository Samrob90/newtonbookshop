from django import forms
from . import models


class LoginForm(forms.Form):

    username = forms.CharField(
        widget=forms.TextInput(
            attrs={"placeholder": "Username", "class": "form-control"}
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"placeholder": "Password", "class": "form-control"}
        )
    )


# bookform
class BooksForm(forms.ModelForm):
    bookchoice = (
        ("PAPERBACK", "PAPERBACK"),
        ("AUDIOBOOK", "AUDIOBOOK"),
        ("EBOOK", "EBOOK"),
        ("HARDCOVER", "HARDCOVER"),
    )
    title = forms.CharField(
        widget=forms.TextInput(
            attrs={"placeholder": "Title", "class": "form-control mb-2 rounded-1"}
        )
    )
    author = forms.CharField(
        widget=forms.TextInput(
            attrs={"placeholder": "author", "class": "form-control mb-2 rounded-1"}
        )
    )
    quantity = forms.CharField(
        widget=forms.NumberInput(
            attrs={
                "placeholder": "quatity",
                "class": "form-control mb-2 rounded-1",
                "min": 0,
            }
        )
    )

    booktype = forms.ChoiceField(
        choices=bookchoice,
        widget=forms.Select(
            attrs={
                "placeholder": "Select book type",
                "class": "form-control mb-2 rounded-1",
            }
        ),
    )
    booktypeprice = forms.CharField(
        widget=forms.NumberInput(
            attrs={
                "placeholder": "0.00 GHS",
                "class": "form-control mb-2 rounded-1",
            }
        )
    )

    class Meta:
        model = models.book
        fields = []
