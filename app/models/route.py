from email.policy import default
from .db import db
from sqlalchemy import DateTime, func


class Route(db.Model):
    __tablename__ = 'routes'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500))
    startPoint = db.Column(db.String(200), nullable=False)
    endPoint = db.Column(db.String(200), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    sportType = db.Column(db.String(50), nullable=False)
    createAt = db.Column(db.DateTime, default=db.func.now())
    updateAt = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates = 'routes')
    workouts = db.relationship("Workout", back_populates = 'route', cascade = 'all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'distance': self.distance,
            'description': self.description,
            'startPoint': self.startPoint,
            'endPoint': self.endPoint,
            'duration': self.duration,
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
            }
        }
