from flask.cli import AppGroup

from app.seeds.sessions import seed_sessions, undo_sessions
from app.seeds.spots import seed_spots, undo_spots
from app.seeds.comments import seed_comments, undo_comments
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_spots()
    seed_sessions()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_spots()
    undo_sessions()
    undo_comments()
    # Add other undo functions here
