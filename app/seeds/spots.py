from app.models import db, Spot

def seed_spots():
    spot1 = Spot(
                        name='Waikiki',
                        userId=1,
                        description='In the heart of Oahu, Waikiki is a perfect spot for beginners and longboarders',
                        staticUrl="https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&path=weight:8%7Ccolor:red%7C&markers=color:blue%7Clabel:S%7C37.60829245388596,-122.48348949530606&key=AIzaSyB9rT8_t5kN8igvKToa5JAp6cj2jhDal6w",
                        lat = 38.911274095754415,
                        lng = -77.04122014552644,
                        state = 'HI',
                        difficulty = 'Beginner-friendly'
                        )


    db.session.add(spot1)
    db.session.commit()

def undo_spots():
    db.session.execute('TRUNCATE spots CASCADE;')
    db.session.commit()
