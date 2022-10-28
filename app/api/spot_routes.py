from datetime import datetime
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import SpotForm, SessionForm
from app.models import Spot, db, User, Session
from app.api.auth_routes import validation_errors_to_error_messages
import os

spot_routes = Blueprint('spots', __name__)
now = datetime.now()

# get all spots:
@spot_routes.route('/key')
def load_map_key():
    key = os.environ.get('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
    return {'GoogleMapApiKey': key}

@spot_routes.route('/')
def spots():
    spots = Spot.query.join(User).all()
    return {"spots": [spot.to_dict() for spot in spots]}

# get all spots by current user:
@spot_routes.route('/my-spots')
@login_required
def my_spots():
    currentUserId = current_user.id
    spots = Spot.query.join(User).filter(Spot.userId == currentUserId).all()
    return {'mySpots': [spot.to_dict() for spot in spots]}

# get specific route by id:
@spot_routes.route('/<int:id>')
def spot(id):
    spot = Spot.query.get(id)
    if spot is None:
        return {'message': 'Spot not found'}

    else:
        return spot.to_dict()

# create a spot:
@spot_routes.route('/new', methods=["POST"])
@login_required
def create_spot():
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newSpot = Spot(
            userId = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            lat = form.data['lat'],
            lng = form.data['lng'],
            state = form.data['state'],
            difficulty = form.data['difficulty'],
            staticUrl = form.data['staticUrl'],
            createAt = now,
            updateAt = now
        )

        db.session.add(newSpot)
        db.session.commit()
        return newSpot.to_dict()

    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400

# Update a spot:
@spot_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_spot():
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    thisSpot = Spot.query.get(id)
    if thisSpot is None:
        return {'errors': 'Spot not found'}, 404

    if thisSpot.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403

    if form.validate_on_submit():
        thisSpot.userId = current_user.id,
        thisSpot.name = form.data['name'],
        thisSpot.description = form.data['description'],
        thisSpot.lat = form.data['lat'],
        thisSpot.lng = form.data['lng'],
        thisSpot.state = form.data['state'],
        thisSpot.difficulty = form.data['difficulty'],
        thisSpot.staticUrl = form.data['staticUrl'],
        thisSpot.createAt = now,
        thisSpot.updateAt = now
        db.session.commit()
        return thisSpot.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete a spot
@spot_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_spot(id):

    thisSpot = Spot.query.get(id)
    if thisSpot is None:
        return {'errors': 'Spot not found'}, 404

    if thisSpot.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403


    db.session.delete(thisSpot)
    db.session.commit()
    return ("Successfully deleted!")

#Create a session within a spot:
@spot_routes.route('/<int:spotId>/sessions/new', methods = ["POST"])
@login_required
def create_session(spotId):
    form = SessionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    thisSpot = Spot.query.get(spotId)
    if form.validate_on_submit():
        newSession = Session(
            userId = current_user.id,
            name = form.data['name'],
            equipment = form.data['equipment'],
            description = form.data['description'],
            image = form.data['image'],
            startTime = form.data['startTime'],
            endTime = form.data['endTime'],
            spotId = thisSpot.id,
            createAt = now,
            updateAt = now
        )

        db.session.add(newSession)
        db.session.commit()
        return newSession.to_dict()

    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400

#Update a session within a spot:

@spot_routes.route('/<int:spotId>/sessions/<int:sessionId>', methods = ['PUT'])
@login_required
def update_session(spotId, sessionId):
    form = SessionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    thisSession = Session.query.get(sessionId)
    thisSpot = Spot.query.get(spotId)

    if thisSpot is None:
        return {'errors': 'Spot not found'}, 404

    if thisSession is None:
        return {'errors': 'Session not found'}, 404

    if thisSession.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403

    if form.validate_on_submit():
        thisSession.userId = current_user.id,
        thisSession.spotId = thisSpot.id,
        thisSession.name = form.data['name'],
        thisSession.equipment = form.data['equipment'],
        thisSession.description = form.data['description'],
        thisSession.startTime = form.data['startTime'],
        thisSession.endTime = form.data['endTime'],
        thisSession.image = form.data['image'],
        thisSession.createAt = now,
        thisSession.updateAt = now
        db.session.commit()
        return thisSession.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Get all the session at one specific spots:
@spot_routes.route('/<int:spotId>/sessions')
def all_session(spotId):
    sessions = Session.query.filter(Session.spotId == spotId).all()
    return {'sessions': [session.to_dict() for session in sessions]}
