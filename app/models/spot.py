from email.policy import default
from .db import db
from sqlalchemy import DateTime, func


class Spot(db.Model):
    __tablename__ = 'spots'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(500))
    lat=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    lng=db.Column(db.Float(precision=12, asdecimal=False),nullable=False)
    state = db.Column(db.String(5), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    staticUrl=db.Column(db.String(3000),nullable=False)
    createAt = db.Column(db.DateTime, default=db.func.now())
    updateAt = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates = 'spots')
    sessions = db.relationship("Session", back_populates = 'spot', cascade = 'all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'description': self.description,
            'lat': self.lat,
            'lng': self.lng,
            'createAt': self.createAt,
            'updateAt': self.updateAt,
            'state': self.state,
            'difficulty': self.difficulty,
            'staticUrl': self.staticUrl,
            'sessions': [session.to_dict() for session in self.sessions],
            'createdBy': {
                'id': self.user.id,
                'firstName': self.user.firstName,
                'lastName': self.user.lastName,
                'username': self.user.username,
                'email': self.user.email,
                'profileImg': self.user.profileImg,
            }
        }
