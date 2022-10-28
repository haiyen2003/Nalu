from datetime import datetime
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import RouteForm
from app.models import Route, db, User
from app.api.auth_routes import validation_errors_to_error_messages
import os

route_routes = Blueprint('routes', __name__)
now = datetime.now()

# get all Routes:
@route_routes.route('/key')
def load_map_key():
    print('HIT API ROUTE ====')
    key = os.environ.get('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
    return {'GoogleMapApiKey': key}

@route_routes.route('/')
def routes():
    routes = Route.query.join(User).order_by(Route.distance.desc()).all()
    return {"routes": [route.to_dict() for route in routes]}

# get all routes by current user:
@route_routes.route('/my-routes')
@login_required
def my_routes():
    currentUserId = current_user.id
    routes = Route.query.join(User).filter(Route.userId == currentUserId).all()
    return {'myRoutes': [route.to_dict() for route in routes]}

# get specific route by id:
@route_routes.route('/<int:id>')
def route(id):
    route = Route.query.get(id)
    if route is None:
        return {'message': 'Route not found'}

    else:
        return route.to_dict()

# create a route:
@route_routes.route('/new', methods=["POST"])
@login_required
def create_route():
    form = RouteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newRoute = Route(
            name = form.data['name'],
            distance = form.data['distance'],
            description = form.data['description'],
            startPoint = form.data['startPoint'],
            endPoint = form.data['endPoint'],
            duration = form.data['duration'],
            mode = form.data['mode'],
            createAt = now,
            updateAt = now
        )

        db.session.add(newRoute)
        db.session.commit()
        return newRoute.to_dict()

    return {"errors" : validation_errors_to_error_messages(form.errors)}, 400

# Update a route:
@route_routes.route('/<int:id>', methods = ['PUT'])
@login_required
def update_route():
    form = RouteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    thisRoute = Route.query.get(id)
    if thisRoute is None:
        return {'errors': 'Route not found'}, 404

    if thisRoute.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403

    if form.validate_on_submit():
        thisRoute.name = form.data['name'],
        thisRoute.distance = form.data['distance'],
        thisRoute.description = form.data['description'],
        thisRoute.startPoint = form.data['startPoint'],
        thisRoute.endPoint = form.data['endPoint'],
        thisRoute.duration = form.data['duration'],
        thisRoute.mode = form.data['mode'],
        thisRoute.createAt = now,
        thisRoute.updateAt = now
        db.session.commit()
        return thisRoute.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete a route
@route_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def delete_route(id):

    thisRoute = Route.query.get(id)
    if thisRoute is None:
        return {'errors': 'Route not found'}, 404

    if thisRoute.userId != current_user.id:
        return{'errors': 'Unauthorized'}, 403


    db.session.delete(thisRoute)
    db.session.commit()
    return ("Successfully deleted!")
