# Nalu

Nalu is a web-application clone inspired by [Strava](https://www.strava.com/dashboard) and [Surfline](https://www.surfline.com/). With Nalu, users can use as a surfing diary and a surf social media. Users can log their surfing sessions, see the stats, check in at the new spots and discover new surf spots on the go. Users can also find people with same level/interests and make friends, share photos and experiences with each other with Nalu.

* [Nalu](https://nalu-1025.herokuapp.com/)

### Please see below links to Project Wiki:
##### [Features](https://github.com/haiyen2003/Nalu/wiki/MVP-Features)
##### [Database Schema](https://github.com/haiyen2003/Nalu/wiki/Database-Schema)
##### [User Story](https://github.com/haiyen2003/Nalu/wiki/User-Story)
##### [WireFrame](https://github.com/haiyen2003/Nalu/wiki/Wireframe)

### This project is built with:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-orange?style=for-the-badge)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

# Run Locally
  1) Clone this repository
  2) Backend instruction: open another terminal at the same time and run the
     following command in order :
     pipenv install -r requirements.txt
     In the following order:
     pipenv shell ; flask db upgrade ; flask seed all; flask run.
  3) Frontend instruction: cd into react-app directory
     and run command : npm install
  4) Make an .env file under the root directory and copy the content of
     .env.example to the .env file.
     
  5) With the second terminal, run npm start in the react-app directory.

# Features Direction
  HomePage
  ![image](https://user-images.githubusercontent.com/101358396/200322036-3b990992-97e7-4188-884c-d81f3234d487.png)

  Get all spots
  ![image](https://user-images.githubusercontent.com/101358396/200322225-132d4873-2948-448f-9c35-d6bdf09f00e9.png)

  See details for a specific spot
  ![image](https://user-images.githubusercontent.com/101358396/200322456-7998b9db-2b98-4c29-b56c-a55486970bee.png)

  Get all sessions
  ![image](https://user-images.githubusercontent.com/101358396/200322586-5b8aec6a-36df-444a-bad2-22b6e12f2a7d.png)

  Get detail of one session
  ![image](https://user-images.githubusercontent.com/101358396/200322690-1933c654-0710-4092-ac87-d41ccc471a87.png)

  Create a spot
  ![image](https://user-images.githubusercontent.com/101358396/200322870-9c311dbf-ce2b-40fc-a47d-18ca48ad534e.png)

  Log a session
 ![image](https://user-images.githubusercontent.com/101358396/200322965-0c2d8444-2642-484b-a35a-187f01370d7d.png)



# Future Focus
  1. Users can search spots/activites based on location, name and state. Or log in their GPS location to find surf spot nearby.

  2. Users can add friends and comments on each other's locations and activities.

  3. Users can live chat with their friends.

  4. Update features to return more stats about users.
