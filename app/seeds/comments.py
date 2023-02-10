from app.models import db, Comment
from datetime import datetime, date
now = date.today()


def seed_comments():
    comment1 = Comment(
        userId=2,
        sessionId=1,
        content='Looking good! Shred it! This is userId 2 ',
        createAt=now,
        updateAt=now
    )

    comment2 = Comment(
        userId=1,
        sessionId=2,
        content='Looking good! Shred it! This is userId 1 ',
        createAt=now,
        updateAt=now
    )

    comment3 = Comment(
        userId=3,
        sessionId=1,
        content='Looking good! Shred it! This is userId 3 ',
        createAt=now,
        updateAt=now
    )

    comment4 = Comment(
        userId=1,
        sessionId=3,
        content='Looking good! Shred it! This is userId 1 ',
        createAt=now,
        updateAt=now
    )

    comment5 = Comment(
        userId=1,
        sessionId=5,
        content='Looking good! Shred it! This is userId 1 ',
        createAt=now,
        updateAt=now
    )
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
