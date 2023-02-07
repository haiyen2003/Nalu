from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import CommentForm
from app.models import Session, db, User, Spot, Comment
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)
now = datetime.now()

# Get all comments based on sessionId:
@comment_routes.route('sessions/<int:id>')
def all_comments(sessionId):
    comments = Comment.query.filter(Comment.sessionId == sessionId).all()
    if comments and len(comments) > 0:
        return {'comments': [comment.to_dict() for comment in comments ]}
    else:
        return {'comments': []}
