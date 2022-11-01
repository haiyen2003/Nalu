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

    session2 = Session (
                        name='Dust Patrol at Waikiki',
                        userId=1,
                        spotId = 1,
                        description='Waikiki this afternoon is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://d3duq8huj13nhl.cloudfront.net/uploads/surfing-queens-hawaii.jpg',
                        startTime = '6:05 PM',
                        endTime = '7:25 PM'
                    )

    session3 = Session (
                        name='Dawn Patrol at Pacifica',
                        userId=1,
                        spotId = 1,
                        description='Pacifica this morning is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://d3duq8huj13nhl.cloudfront.net/uploads/diamond-head-surfing.jpg',
                        startTime = '6:05 AM',
                        endTime = '9:25 AM'
                    )

    db.session.add(session1)
    db.session.add(session2)
    db.session.add(session3)
    db.session.commit()

def undo_sessions():
    db.session.execute('TRUNCATE sessions CASCADE;')
    db.session.commit()
