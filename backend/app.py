from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from datetime import datetime
import os
import json
import requests
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://mohammadsaad.vercel.app", "http://localhost:3000"]}})

# Configure app
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER')

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
mail = Mail(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per hour", "10 per minute"]
)

# Define models
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, index=True)
    message = db.Column(db.Text, nullable=False)
    ip_address = db.Column(db.String(45))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp(), index=True)
    is_read = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'is_read': self.is_read
        }

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
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'technologies': json.loads(self.technologies) if self.technologies else [],
            'image_url': self.image_url,
            'project_url': self.project_url,
            'github_url': self.github_url,
            'featured': self.featured,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

def get_all_projects(featured=None):
    """Retrieve projects from the database, sorted by order_priority."""
    try:
        query = Project.query
        if featured is not None:
            query = query.filter(Project.featured == True) 
        
        projects = query.order_by(Project.order_priority.asc()).all()
        return [project.to_dict() for project in projects]
    except Exception as e:
        app.logger.error(f"Database error: {str(e)}")
        return None

def get_project_by_slug(slug):
    """Retrieve a single project by its slug."""
    try:
        project = Project.query.filter_by(slug=slug).first()
        return project.to_dict() if project else None
    except Exception as e:
        app.logger.error(f"Database error: {str(e)}")
        return None

def get_all_messages():
    """Fetch all contact messages ordered by newest first."""
    try:
        messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
        return [message.to_dict() for message in messages]
    except Exception as e:
        app.logger.error(f"Database error: {str(e)}")
        return None

def save_contact_message(name, email, message_text, ip_address):
    """Save a contact message and return success/failure."""
    try:
        new_message = ContactMessage(name=name, email=email, message=message_text, ip_address=ip_address)
        db.session.add(new_message)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Database error: {str(e)}")
        return False

# Utility function
def verify_recaptcha(token):
    # Implement your recaptcha verification
    return True  # Replace with actual verification

# Routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Retrieve all projects (optional: filter featured projects)."""
    try:
        featured = request.args.get('featured')
        featured_bool = featured.lower() in ['true', '1'] if featured else None
        projects = get_all_projects(featured=featured_bool)
        if projects is None:
            return jsonify({'status': 'error', 'message': 'Failed to retrieve projects'}), 500
        return jsonify({'status': 'success', 'projects': projects}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/project/<string:slug>', methods=['GET'])
def get_single_project(slug):
    """Retrieve a single project by its slug."""
    project = get_project_by_slug(slug)
    if project:
        return jsonify({'status': 'success', 'project': project}), 200
    return jsonify({'status': 'error', 'message': 'Project not found'}), 404

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Retrieve all contact messages."""
    messages = get_all_messages()
    if messages is None:
        return jsonify({'status': 'error', 'message': 'Failed to retrieve messages'}), 500
    return jsonify({'status': 'success', 'messages': messages}), 200

@app.route('/api/contact', methods=['POST'])
@limiter.limit("3 per minute")
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message_text = data.get('message')
        recaptcha_token = data.get('recaptchaToken')

        if not all([name, email, message_text]):
            return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

        if not recaptcha_token:
            return jsonify({'status': 'error', 'message': 'reCAPTCHA verification required'}), 400

        if not verify_recaptcha(recaptcha_token):
            return jsonify({'status': 'error', 'message': 'reCAPTCHA verification failed'}), 400

        if not save_contact_message(name, email, message_text, request.remote_addr):
            return jsonify({'status': 'error', 'message': 'Failed to save message'}), 500

        # --- Email Sending Code ---
        recipient_email = os.getenv('EMAIL_USER')
        subject = f"New Contact Message from {name}"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_text}"
        msg = Message(subject=subject, recipients=[recipient_email], body=body)
        try:
            mail.send(msg)
        except Exception as e:
            app.logger.error(f"Email sending failed: {str(e)}")
            # Optionally, you can still return success if saving is more important
            return jsonify({'status': 'error', 'message': 'Message saved, but failed to send email.'}), 500

        return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'UP', 'message': 'Flask server is running!'}), 200

@app.before_request
def validate_json():
    """Only enforce JSON validation on endpoints that require it."""
    if request.method == 'POST' and request.content_length:
        if not request.is_json:
            return jsonify({'status': 'error', 'message': 'Request must be JSON'}), 400

# Initialize database
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database initialized.")
    app.run(debug=True)