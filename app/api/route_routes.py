from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.route_form import RouteForm
from app.models import Route, db, User

route_routes = Blueprint('routes', __name__)


# get all Routes:
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
            
        )
