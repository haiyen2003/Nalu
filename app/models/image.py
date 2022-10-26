from .db import db
from sqlalchemy import DateTime, func

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    workoutId = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable = False)
    routeId = db.Column(db.Integer, db.ForeignKey('routes.id'), nullable=False)
    url = db.Column(db.String(1000), nullable=False)

    def to_dict(self):
        return{
            'id': self.id,
            'workoutId': self.workoutId,
            'routeId': self.routeId,
            'url': self.url
        }
