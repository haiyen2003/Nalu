from .db import db
from sqlalchemy import DateTime, func

class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    routeId = db.Column(db.Integer, db.ForeignKey('routes.id'),nullable=False)
    description = db.Column(db.String(500))
    image = db.Column(db.String(500))
    equipment = db.Column(db.String(200), nullable=False)
    startTime = db.Column(db.DateTime, default=db.func.now())
    endTime = db.Column(db.DateTime, default=db.func.now())
    sportType = db.Column(db.String(50), nullable=False)
    createAt = db.Column(db.DateTime, default=db.func.now())
    updateAt = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates = 'workouts')
    route = db.relationship("Route", back_populates = 'workouts')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'description': self.description,
            'image': self.image,
            'equipment': self.equipment,
            'startTime': self.startTime,
            'endTime': self.endTime,
            'sportType': self.sportType,
            'createAt': self.createAt,
            'updateAt': self.updateAt,
            'createdBy': {
                'id': self.user.id,
                'firstName': self.user.firstName,
                'lastName': self.user.lastName,
                'username': self.user.username,
                'email': self.user.email,
                'profileImg': self.user.profileImg,
            },
            'route': {
                'id': self.route.id,
                'name': self.route.name,
                'userId': self.route.userId,
                'distance': self.route.distance,
                'description': self.route.description,
                'startPoint': self.route.startPoint,
                'endPoint': self.route.endPoint,
                'duration': self.route.duration,
                'sportType': self.route.sportType,
                'createAt': self.route.createAt,
                'updateAt': self.route.updateAt,
            }
        }
