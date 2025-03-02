from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, index=True)
    message = db.Column(db.Text, nullable=False)
    ip_address = db.Column(db.String(45))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp(), index=True)
    is_read = db.Column(db.Boolean, default=False)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, unique=True)
    slug = db.Column(db.String(250), nullable=False, unique=True, index=True)
    description = db.Column(db.Text, nullable=False)
    technologies = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(500))
    project_url = db.Column(db.String(500))
    github_url = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False, index=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    order_priority = db.Column(db.Integer, default=0, index=True)
#SQLite Transposing, we can check using SQLite database app