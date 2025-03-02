from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
import json
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://myportfoliomosaad.vercel.app", "http://localhost:3000"]}})

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per hour", "10 per minute"]
)
# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Change this according to your email provider
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER')

# Check if email credentials exist
if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
    app.logger.warning('Email credentials not configured. Contact form will not send emails.')

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
mail = Mail(app)
db = SQLAlchemy(app)

# Contact Message Model
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, index=True)
    message = db.Column(db.Text, nullable=False)
    ip_address = db.Column(db.String(45))  # Store IP for spam prevention
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    is_read = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'is_read': self.is_read
        }

# Project Model
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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    order_priority = db.Column(db.Integer, default=0, index=True)  # For custom ordering

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'technologies': json.loads(self.technologies),
            'image_url': self.image_url,
            'project_url': self.project_url,
            'github_url': self.github_url,
            'featured': self.featured,
            'created_at': self.created_at.strftime('%Y-%m-%d')
        }

# Contact Form API
@app.route('/api/contact', methods=['POST'])
@limiter.limit("3 per minute")  # Max 3 contact form submissions per minute
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message_text = data.get('message')

        if not all([name, email, message_text]):
            return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

        # Save to database
        new_message = ContactMessage(name=name, email=email, message=message_text)
        db.session.add(new_message)
        db.session.commit()

        # Send email
        recipient_email = os.getenv('EMAIL_USER', 'mohammadhsaad05@gmail.com')
        msg = Message(
            subject=f'New Contact Message from {name}',
            recipients=[recipient_email],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_text}"
        )

        try:
            mail.send(msg)
        except Exception as e:
            app.logger.error(f"Email sending failed: {str(e)}")
            return jsonify({'status': 'error', 'message': 'Message saved, but email failed to send.'}), 500

        return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Fetch all messages
@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
        return jsonify({'status': 'success', 'messages': [message.to_dict() for message in messages]}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Fetch projects
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        featured = request.args.get('featured')
        if featured is not None:
            featured = featured.lower() in ['true', '1']
            projects = Project.query.filter_by(featured=featured).all()
        else:
            projects = Project.query.all()

        return jsonify({'status': 'success', 'projects': [project.to_dict() for project in projects]}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/seed', methods=['POST'])
def seed_database():
    """Populate database with sample projects for testing."""
    try:
        # Prevent duplicate seeding
        if Project.query.first():
            return jsonify({"status": "error", "message": "Database already seeded!"}), 400

        sample_projects = [
            Project(title="Portfolio Website", slug="portfolio-website", description="My personal portfolio website.",
                    technologies=json.dumps(["React", "Flask", "SQLite"]), image_url="https://example.com/img1.jpg",
                    project_url="https://example.com", github_url="https://github.com/mo100saad/portfolio", featured=True),
            Project(title="E-commerce Site", slug="ecommerce-site", description="A full-stack e-commerce platform.",
                    technologies=json.dumps(["React", "Node.js", "MongoDB"]), image_url="https://example.com/img2.jpg",
                    project_url="https://example.com", github_url="https://github.com/mo100saad/ecommerce", featured=False)
        ]

        db.session.bulk_save_objects(sample_projects)
        db.session.commit()

        return jsonify({"status": "success", "message": "Database seeded!"}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'UP', 'message': 'Flask server is running!'}), 200

# Error handlers
@app.errorhandler(404)
def not_found(e):
    return jsonify({'status': 'error', 'message': 'Resource not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'status': 'error', 'message': 'Internal server error'}), 500

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
