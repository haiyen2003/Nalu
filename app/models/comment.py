from .db import db
from sqlalchemy import DateTime, func

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sessionId = db.Column(db.Integer, db.ForeignKey('sessions.id'),nullable=False)
    content = db.Column(db.String(1000))
    createAt = db.Column(db.DateTime, default=db.func.now())
    updateAt = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates = 'comments')
    session = db.relationship("Session", back_populates = 'comments')

    def to_dict(self):
        return{
            'id': self.id,
            'userId': self.userId,
            'content': self.content,
            'sessionId': self.sessionId,
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
