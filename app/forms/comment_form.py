from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields import (
    DateTimeField,SelectField, SelectMultipleField, TextAreaField, SubmitField, IntegerField, FloatField, DecimalField
)
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment

def content_validation(form, field):
    des = field.data
    if len(des) < 20 or len(des) > 700:
        raise ValidationError("Comment must be more than 20 characters and less than 700 characters")

class CommentForm(FlaskForm):
    content = TextAreaField('Content', validators=[DataRequired(), content_validation])
    createdAt = StringField('Created At', validators=[DataRequired()])
    updatedAt = StringField ('Updated At', validators=[DataRequired()])
