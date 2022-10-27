from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import WorkoutForm
from app.models import Workout, db, User, Route
from app.api.auth_routes import validation_errors_to_error_messages

workout_routes = Blueprint('workouts', __name__)
now = datetime.now()

# get all Workouts:
@workout_routes.route('/')
def workouts():
    workouts = Workout.query.all()
    return {"workout": [workout.to_dict() for workout in workouts]}

# get all workouts by current user:
@workout_routes.route('/my-workouts')
@login_required
def my_workouts():
    currentUserId = current_user.id
    workouts = Workout.query.filter(Workout.userId == currentUserId).all()
    return {'myWorkouts': [workout.to_dict() for workout in workouts]}

# get specific workout by id:
@workout_routes.route('/<int:id>')
def workout(id):
    workout = Workout.query.get(id)
    if workout is None:
        return {'message': 'Workout not found'}

    else:
        return workout.to_dict()

# create a workout:
@workout_routes.route('/new', methods=["POST"])
@login_required
def create_workout():
    form = WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newWorkout = Workout(
            name = form.data['name'],
            equipment = form.data['equipment'],
            description = form.data['description'],
            image = form.data['image']
            startTime = form.data['startTime'],
            endTime = form.data['endTime'],
            sportType = form.data['sportType'],
            createAt = now,
            updateAt = now
        )

        db.session.add(newWorkout)
        db.session.commit()
        return newWorkout.to_dict()

    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400

# Update a workout:
@workout_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_workout():
    form = WorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    thisWorkout = Workout.query.get(id)
    if thisWorkout is None:
        return {'errors': 'Workout not found'}, 404

    if thisWorkout.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403

    if form.validate_on_submit():
        thisWorkout.name = form.data['name'],
        thisWorkout.distance = form.data['distance'],
        thisWorkout.description = form.data['description'],
        thisWorkout.startPoint = form.data['startPoint'],
        thisWorkout.endPoint = form.data['endPoint'],
        thisWorkout.duration = form.data['duration'],
        thisWorkout.sportType = form.data['sportType'],
        thisWorkout.createAt = now,
        thisWorkout.updateAt = now
        db.session.commit()
        return thisWorkout.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete a route
@workout_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_workout(id):

    thisWorkout = Workout.query.get(id)
    if thisWorkout is None:
        return {'errors': 'Workout not found'}, 404

    if thisWorkout.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403


    db.session.delete(thisWorkout)
    db.session.commit()
    return ("Successfully deleted!")
