from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
import json

app = Flask(__name__)
CORS(app)

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Change this according to your email provider
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

# If any of these are missing, log a warning rather than using hardcoded values
if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
    app.logger.warning('Email credentials not configured. Contact form will not send emails.')

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
mail = Mail(app)
db = SQLAlchemy(app)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, index=True)
    message = db.Column(db.Text, nullable=False)
    ip_address = db.Column(db.String(45))  # Store IP for spam prevention
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    is_read = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<ContactMessage {self.id}: {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    order_priority = db.Column(db.Integer, default=0, index=True)  # For custom ordering

    def __repr__(self):
        return f'<Project {self.id}: {self.title}>'
    
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
    
    @staticmethod
    def generate_slug(title):
        """Generate a URL-friendly slug from the title"""
        import re
        from unidecode import unidecode
        
        # Convert to lowercase, replace spaces with hyphens
        slug = re.sub(r'\s+', '-', unidecode(title).lower())
        # Remove any non-alphanumeric characters except hyphens
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        # Remove consecutive hyphens
        slug = re.sub(r'-+', '-', slug)
        # Remove leading and trailing hyphens
        slug = slug.strip('-')
        
        return slug

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message_text = data.get('message')
        
        # Validate input
        if not all([name, email, message_text]):
            return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400
            
        # Create database entry
        new_message = ContactMessage(
            name=name,
            email=email,
            message=message_text
        )
        db.session.add(new_message)
        db.session.commit()
        
        # Send email
        msg = Message(
            subject=f'New Contact Message from {name}',
            recipients=[app.config['MAIL_USERNAME']],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_text}"
        )
        mail.send(msg)
        
        return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
        return jsonify({
            'status': 'success',
            'messages': [message.to_dict() for message in messages]
        }), 200
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        featured = request.args.get('featured', type=bool)
        
        if featured is not None:
            projects = Project.query.filter_by(featured=featured).all()
        else:
            projects = Project.query.all()
            
        return jsonify({
            'status': 'success',
            'projects': [project.to_dict() for project in projects]
        }), 200
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'UP', 'message': 'Flask server is running!'}), 200

@app.errorhandler(404)
def not_found(e):
    return jsonify({'status': 'error', 'message': 'Resource not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'status': 'error', 'message': 'Internal server error'}), 500

# Add a before_request handler to validate JSON
@app.before_request
def validate_json():
    if request.method == 'POST' and request.is_json:
        try:
            _ = request.get_json()
        except Exception:
            return jsonify({'status': 'error', 'message': 'Invalid JSON in request'}), 400
        
if __name__ == '__main__':
    app.run(debug=True)