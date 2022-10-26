from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields import (
    SelectField, SelectMultipleField, TextAreaField, SubmitField, IntegerField, FloatField, DecimalField
)
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Route

sportType_options = ['Surfing', 'Swimming']

class RouteForm(FlaskForm):
    name = StringField("Route Name", validators = [DataRequired()])
    distance = DecimalField('Distance', validators=[DataRequired()])
    description = TextAreaField('Route Description', validators=[DataRequired()])
    startPoint = StringField('Start Point', validators=[DataRequired()])
    endPoint = StringField ('End Point', validators=[DataRequired()])
    duration = StringField('Duration', validators= [DataRequired()])
    sportType = SelectField('SportType', choices = sportType_options, validators=[DataRequired()])
