"""empty message

Revision ID: 58424aad9b22
Revises: 
Create Date: 2022-11-07 04:39:54.006682

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58424aad9b22'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=25), nullable=False),
    sa.Column('lastName', sa.String(length=25), nullable=False),
    sa.Column('profileImg', sa.String(length=500), nullable=True),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('spots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('lat', sa.Float(precision=12), nullable=False),
    sa.Column('lng', sa.Float(precision=12), nullable=False),
    sa.Column('state', sa.String(length=5), nullable=False),
    sa.Column('difficulty', sa.String(length=20), nullable=False),
    sa.Column('staticUrl', sa.String(length=3000), nullable=False),
    sa.Column('createAt', sa.DateTime(), nullable=True),
    sa.Column('updateAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('spotId', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('image', sa.String(length=500), nullable=True),
    sa.Column('equipment', sa.String(length=200), nullable=True),
    sa.Column('startTime', sa.String(length=50), nullable=True),
    sa.Column('endTime', sa.String(length=50), nullable=True),
    sa.Column('createAt', sa.DateTime(), nullable=True),
    sa.Column('updateAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['spotId'], ['spots.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sessions')
    op.drop_table('spots')
    op.drop_table('users')
    # ### end Alembic commands ###
