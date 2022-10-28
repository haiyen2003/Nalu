from app.models import db, Spot

def seed_spots():
    spot1 = Spot(
                        name='Waikiki',
                        userId=1,
                        description='In the heart of Oahu, Waikiki is a perfect spot for beginners and longboarders',
                        staticUrl='http://maps.googleapis.com/maps/api/staticmap?size=600x300&zoom=15&markers=color:green|38.91113,-77.04122000000001&path=38.91113,-77.04122000000001|38.911120000000004,-77.03849000000001|38.91113,-77.03689|38.911120000000004,-77.03454|38.91004,-77.03455000000001|38.90793,-77.03456000000001|38.90766,-77.03531000000001|38.907740000000004,-77.03536000000001|38.90778,-77.03538|38.907790000000006,-77.03543&sensor=false&markers=color:red|38.907790000000006,-77.03543&key=AIzaSyB9rT8_t5kN8igvKToa5JAp6cj2jhDal6w',
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
