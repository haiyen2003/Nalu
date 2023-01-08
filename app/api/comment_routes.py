from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import CommentForm
from app.models import Session, db, User, Spot
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)
now = datetime.now()
