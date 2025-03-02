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
from database import get_all_projects, get_project_by_slug, get_all_messages, save_contact_message  # Import functions

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://mohammadsaad.vercel.app", "http://localhost:3000"]}})

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per hour", "10 per minute"]
)

# Mail configuration
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
mail = Mail(app)
db = SQLAlchemy(app)

# **Optimized Project API**
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

# **Optimized Contact API**
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
    """Save a new contact message after validating reCAPTCHA."""
    try:
        data = request.get_json()
        name, email, message_text, recaptcha_token = data.get('name'), data.get('email'), data.get('message'), data.get('recaptchaToken')

        if not all([name, email, message_text]):
            return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400
        
        if not recaptcha_token:
            return jsonify({'status': 'error', 'message': 'reCAPTCHA verification required'}), 400
        
        # Verify reCAPTCHA
        if not verify_recaptcha(recaptcha_token):
            return jsonify({'status': 'error', 'message': 'reCAPTCHA verification failed'}), 400

        if not save_contact_message(name, email, message_text, request.remote_addr):
            return jsonify({'status': 'error', 'message': 'Failed to save message'}), 500

        return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# **Health Check API**
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'UP', 'message': 'Flask server is running!'}), 200

# **Database Initialization**
@app.before_request
def validate_json():
    """Only enforce JSON validation on endpoints that require it."""
    if request.method == 'POST' and request.content_length:
        if not request.is_json:
            return jsonify({'status': 'error', 'message': 'Request must be JSON'}), 400

# 🚀 **Run the Flask App**
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database initialized.")
    app.run(debug=True)
