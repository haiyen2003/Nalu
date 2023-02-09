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

# Get all comments based on userId:
@comment_routes.route('/')
@login_required
def get_user_comments():
    user_comments = Comment.query.filter(Comment.userId == current_user.id).all()
    if user_comments and len(user_comments) > 0:
        return {'user_comments':[comment.to_dict() for comment in user_comments] }
    else:
        return {'user_comments': []}

# Delete a comment:
@comment_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Successfully Deleted'}
    else:
        return {'message': 'Comment can not be found'}

# Create a comment:
@comment_routes.route('/sessions/<int:id>', methods = ['POST'])
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        newComment = Comment(
            userId = current_user.id,
            sessionId = id,
            content = data['content'],
            createAt = now,
            updateAt = now
        )
        db.session.add(newComment)
        db.session.commit()
        return newComment.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# update a comment:
@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def update_comment(commentId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updatedComment = Comment.query.get(commentId)
        if updatedComment:
            updatedComment.content = form.data['content']
            db.session.commit()
            return updatedComment.to_dict()
        else:
            return{'message': 'Comment not found'}, 404
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
