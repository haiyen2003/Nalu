from .db import db
from sqlalchemy import DateTime, func

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    spotId = db.Column(db.Integer, db.ForeignKey('spots.id'),nullable=False)
    description = db.Column(db.String(500))
    image = db.Column(db.String(500))
    equipment = db.Column(db.String(200), nullable=True)
    startTime = db.Column(db.DateTime, default=db.func.now())
    endTime = db.Column(db.DateTime, default=db.func.now())
    createAt = db.Column(db.DateTime, default=db.func.now())
    updateAt = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates = 'sessions')
    spot = db.relationship("Spot", back_populates = 'sessions')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'description': self.description,
            'spotId': self.spotId,
            'image': self.image,
            'equipment': self.equipment,
            'startTime': self.startTime,
            'endTime': self.endTime,
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
            'spot': {
                'id': self.spot.id,
                'name': self.spot.name,
                'userId': self.spot.userId,
                'description': self.spot.description,
                'lat': self.spot.lat,
                'lng': self.spot.lng,
                'createAt': self.spot.createAt,
                'updateAt': self.spot.updateAt,
            }
        }
