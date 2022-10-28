from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields import (
    DateTimeField,SelectField, SelectMultipleField, TextAreaField, SubmitField, IntegerField, FloatField, DecimalField
)
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Session

def image_validation(form, field):
    img = field.data

    if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':
        raise ValidationError("Input must be a valid Image Url")

def name_validation(form, field):
    name = field.data
    if len(name) < 5 or len(name) > 200:
        raise ValidationError("Name must be more than 5 characters and less than 200 characters")

def description_validation(form, field):
    des = field.data
    if len(des) < 20 or len(des) > 600:
        raise ValidationError("Description must be more than 20 characters and less than 600 characters")


class SessionForm(FlaskForm):
    name = StringField("Session Name", validators = [DataRequired(), name_validation])
    description = TextAreaField('Route Description', validators=[DataRequired(), description_validation])
    image = StringField('Image URL', validators=[image_validation ])
    startTime = StringField('Start Time', validators=[DataRequired()])
    endTime = StringField ('End Time', validators=[DataRequired()])
    duration = StringField('Duration', validators= [DataRequired()])
    equipment =  StringField('Equipment', validators= [DataRequired()])
