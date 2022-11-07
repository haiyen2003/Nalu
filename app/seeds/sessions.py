from app.models import db, Session

def seed_sessions():
    session1 = Session (
                        name='Dawn Patrol at Waikiki',
                        userId=1,
                        spotId = 1,
                        description='Waikiki this morning is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://d3duq8huj13nhl.cloudfront.net/uploads/5-easiest-waves-in-waikiki-to-learn-how-to-surf/hawaii-surf-guide.jpg',
                        startTime = '2022-11-04T05:19',
                        equipment = "10'0 Longboard",
                        endTime = '2022-11-04T07:23'
                    )

    session2 = Session (
                        name='Dust Patrol at Waikiki',
                        userId=1,
                        spotId = 1,
                        description='Waikiki this afternoon is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://d3duq8huj13nhl.cloudfront.net/uploads/surfing-queens-hawaii.jpg',
                        startTime = '2022-11-08T05:19',
                        equipment = "9'0 Longboard",
                        endTime = '2022-11-08T08:19'
                    )

    session3 = Session (
                        name='Dawn Patrol at Pacifica',
                        userId=1,
                        spotId = 1,
                        description='Pacifica this morning is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://d3duq8huj13nhl.cloudfront.net/uploads/diamond-head-surfing.jpg',
                        startTime = '2022-11-07T05:19',
                        equipment = "8'6 Longboard",
                        endTime = '2022-11-07T09:19'
                    )
    session4 = Session (
                        name='Fun dawn patrol with 901 neighbors',
                        userId=2,
                        spotId = 2,
                        description='Pacifica this morning is glassy with light off-shore wind, water temperature around 70 degree, low tide at 9AM',
                        image = 'https://cdn-fjcab.nitrocdn.com/cARlXxOhAzjkaNwUDkkhryXdWqSLuBqy/assets/static/optimized/rev-f913642/wp-content/uploads/2021/03/surfershealth.jpg',
                        startTime = '2022-11-07T05:19',
                        equipment = "9'0 Longboard",
                        endTime = '2022-11-07T09:19'
                    )

    db.session.add(session1)
    db.session.add(session2)
    db.session.add(session3)
    db.session.add(session4)
    db.session.commit()

def undo_sessions():
    db.session.execute('TRUNCATE sessions CASCADE;')
    db.session.commit()
