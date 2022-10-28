from app.models import db, Session

def seed_sessions():
    session1 = Session (
                        name='Dawn Patrol at Waikiki',
                        userId=1,
                        spotId = 1,
                        description='Waikiki this morning is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://d3duq8huj13nhl.cloudfront.net/uploads/5-easiest-waves-in-waikiki-to-learn-how-to-surf/hawaii-surf-guide.jpg',
                        startTime = '6:05 AM',
                        endTime = '9:25 AM'

                    )


    db.session.add(session1)
    db.session.commit()

def undo_sessions():
    db.session.execute('TRUNCATE sessions CASCADE;')
    db.session.commit()
