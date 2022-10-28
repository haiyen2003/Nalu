from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields import (
    SelectField, SelectMultipleField, TextAreaField, SubmitField, IntegerField, FloatField, DecimalField
)
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Spot

def name_validation(form, field):
    name = field.data
    if len(name) < 5 or len(name) > 200:
        raise ValidationError("Name must be more than 5 characters and less than 200 characters")

def description_validation(form, field):
    des = field.data
    if len(des) < 20 or len(des) > 600:
        raise ValidationError("Description must be more than 20 characters and less than 600 characters")
level_options = ['Beginner-friendly', 'Moderate', 'Expert']
state_options = ['CA', 'HI', 'AK', 'WA', 'OR', 'TX', 'LA', 'AL', 'FL', 'GA', 'SC', 'NC', 'VA', 'MD', 'DE', 'NJ', 'MS', 'NY', 'CT', 'RI', 'MA', 'NH', 'ME']
class SpotForm(FlaskForm):
    name = StringField("Route Name", validators = [DataRequired(), name_validation])
    description = TextAreaField('Route Description', validators=[DataRequired(), description_validation])
    lat = DecimalField('start latitude',validators=[DataRequired()])
    lng = DecimalField('start longtitude',validators=[DataRequired()])
    state = SelectField('State', choices = state_options, validators=[DataRequired()])
    difficulty = SelectField('Difficulty', choices = level_options, validators=[DataRequired()])
    staticUrl = StringField("Static URL", validators = [DataRequired()])
