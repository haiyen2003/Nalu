from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) < 6:
        raise ValidationError('Username must be more than 6 characters.')

def password_length(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError("Password must be more than 8 characters")

def image_validation(form, field):
    image = field.data
    if ('https' not in image and 'http' not in image) or ('.jpg' not in image) and ('.jpeg' not in image) and ('.gif' not in image) and ('.svg' not in image) and ('.png' not in image):
        raise ValidationError('Please enter a valid image URL.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), Email("Please enter valid email address"), user_exists])
    password = StringField('password', validators=[DataRequired(), password_length])
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    profileImg = StringField('profileImg', validators=[image_validation])
