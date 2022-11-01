from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import SessionForm
from app.models import Session, db, User, Spot
from app.api.auth_routes import validation_errors_to_error_messages

session_routes = Blueprint('sessions', __name__)
now = datetime.now()

# get all sessions:
@session_routes.route('/')
def sessions():
    sessions = Session.query.all()
    if sessions and len(sessions) > 0:
        print(sessions, 'SESSION ======')
        return {"Session": [session.to_dict() for session in sessions]}
    else:
        return {'Sessions': []}

# get all sessions by current user:
@session_routes.route('/my-sessions')
@login_required
def my_sessions():
    currentUserId = current_user.id
    sessions = Session.query.filter(Session.userId == currentUserId).all()
    return {'mySessions': [session.to_dict() for session in sessions]}

# get specific workout by id:
@session_routes.route('/<int:id>')
def session(id):
    session = Session.query.get(id)
    if session is None:
        return {'message': 'Session not found'}

    else:
        return session.to_dict()

# create a session:
# @session_routes.route('/new', methods=["POST"])
# @login_required
# def create_session():
#     form = SessionForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         newSession = Session(
#             userId = current_user.id,
#             name = form.data['name'],
#             equipment = form.data['equipment'],
#             description = form.data['description'],
#             image = form.data['image'],
#             startTime = form.data['startTime'],
#             endTime = form.data['endTime'],
#             spotId = form.data['spotId'],
#             createAt = now,
#             updateAt = now
#         )

#         db.session.add(newSession)
#         db.session.commit()
#         return newSession.to_dict()

#     return {"errors" : validation_errors_to_error_messages(form.errors)}, 400

# Update a session:
# @session_routes.route('/<int:id>', methods = ['PUT'])
# @login_required
# def update_workout():
#     form = SessionForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     thisSession = Session.query.get(id)
#     if thisSession is None:
#         return {'errors': 'Session not found'}, 404

#     if thisSession.userId != current_user.id:
#         return{'errors': 'Unauthorized'}, 403

#     if form.validate_on_submit():
#         thisSession.name = form.data['name'],
#         thisSession.equipment = form.data['equipment'],
#         thisSession.description = form.data['description'],
#         thisSession.startTime = form.data['startTime'],
#         thisSession.endTime = form.data['endTime'],
#         thisSession.createAt = now,
#         thisSession.updateAt = now
#         db.session.commit()
#         return thisSession.to_dict()

#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete a session
@session_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_session(id):

    thisSession = Session.query.get(id)
    if thisSession is None:
        return {'errors': 'Session not found'}, 404

    if thisSession.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403


    db.session.delete(thisSession)
    db.session.commit()
    return ("Successfully deleted!")
