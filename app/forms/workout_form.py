from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields import (
    SelectField, SelectMultipleField, TextAreaField, SubmitField, IntegerField, FloatField, DecimalField
)
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Workout

def image_validation(form, field):
    img = field.data

    if not img[-3:] == 'jpg' and (not img[-3:] == 'png') and img[-4:] != 'jpeg' and img[-4:] != 'webp' and img[-3:] != 'gif' and img[-3:] != 'svg':
        raise ValidationError("Input must be a valid Image Url")

equipment_option = ['surfboard', 'paddleboard']

class WorkoutForm(FlaskForm):
    name = StringField("Route Name", validators = [DataRequired()])
    distance = DecimalField('Distance', validators=[DataRequired()])
    description = TextAreaField('Route Description', validators=[DataRequired()])
    image = StringField('Image URL', validators=[DataRequired(), image_validation ])
    startPoint = StringField('Start Point', validators=[DataRequired()])
    endPoint = StringField ('End Point', validators=[DataRequired()])
    duration = StringField('Duration', validators= [DataRequired()])
    equipment = SelectField('Equipment', choices=equipment_option )
