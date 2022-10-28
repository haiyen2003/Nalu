from .db import db
from sqlalchemy import DateTime, func

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    sessionId = db.Column(db.Integer, db.ForeignKey('sessions.id'), nullable = False)
    url = db.Column(db.String(1000), nullable=False)

    session = db.relationship('Session', back_populates = 'images')
    def to_dict(self):
        return{
            'id': self.id,
            'sessionId': self.sessionId,
            'url': self.url
        }
