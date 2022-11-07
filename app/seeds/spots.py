from app.models import db, Spot

def seed_spots():
    spot1 = Spot(
                        name='Waikiki',
                        userId=1,
                        description='In the heart of Oahu, Waikiki is a perfect spot for beginners and longboarders',
                        staticUrl="https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&markers=color:blue%7Clabel:S%7C21.276493869375717,-157.82046011709596&key=AIzaSyB9rT8_t5kN8igvKToa5JAp6cj2jhDal6w",
                        lat = 21.276031759729968,
                        lng = -157.83070258012728,
                        state = 'HI',
                        difficulty = 'Beginner-friendly'
                        )
    spot2 = Spot(
                        name='Pacifica',
                        userId=1,
                        description='Popular surf spot in the Bay Area, water is freezing cold all year round, waves are mediocre at best. But well you gotta do what you gotta do',
                        staticUrl="https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&markers=color:blue%7Clabel:S%7C37.60829245388596,-122.48135328346376&key=AIzaSyB9rT8_t5kN8igvKToa5JAp6cj2jhDal6w",
                        lat = 37.59850050272633,
                        lng = -122.48272657447939,
                        state = 'CA',
                        difficulty = 'Beginner-friendly'
                        )
    spot3 = Spot(
                        name='Huntington Beach',
                        userId=1,
                        description='Popular surf spot in South California, good waves, it can get rough all of sudden. Traffic to get here sucks',
                        staticUrl="https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&markers=color:blue%7Clabel:S%7C33.65702566125944,-118.00759408611168&key=AIzaSyB9rT8_t5kN8igvKToa5JAp6cj2jhDal6w",
                        lat = 33.65131003993126,
                        lng = -117.99386117595543,
                        state = 'CA',
                        difficulty = 'Beginner-friendly'
                        )


    db.session.add(spot1)
    db.session.add(spot2)
    db.session.add(spot3)
    db.session.commit()

def undo_spots():
    db.session.execute('TRUNCATE spots CASCADE;')
    db.session.commit()
