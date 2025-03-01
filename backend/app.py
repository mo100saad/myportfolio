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
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER', 'your-email@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASSWORD', 'your-app-password')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER', 'your-email@gmail.com')

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
mail = Mail(app)
db = SQLAlchemy(app)

# Define database models
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ContactMessage {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    technologies = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(500))
    project_url = db.Column(db.String(500))
    github_url = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Project {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'technologies': json.loads(self.technologies),
            'image_url': self.image_url,
            'project_url': self.project_url,
            'github_url': self.github_url,
            'featured': self.featured,
            'created_at': self.created_at.strftime('%Y-%m-%d')
        }

# Create the database tables and seed some example projects
with app.app_context():
    db.create_all()
    
    # Check if we need to seed projects
    if Project.query.count() == 0:
        # Add sample projects
        sample_projects = [
            Project(
                title="E-Commerce Website",
                description="A full-stack e-commerce platform with product catalog, shopping cart, and checkout functionality.",
                technologies=json.dumps(["React", "Node.js", "MongoDB", "Express", "Stripe"]),
                image_url="/images/projects/ecommerce.jpg",
                project_url="https://example-ecommerce.com",
                github_url="https://github.com/yourusername/ecommerce",
                featured=True
            ),
            Project(
                title="Task Management App",
                description="A productivity app that helps users manage their tasks with features like drag-and-drop, filters, and statistics.",
                technologies=json.dumps(["Vue.js", "Firebase", "Tailwind CSS"]),
                image_url="/images/projects/task-app.jpg",
                project_url="https://task-manager-example.com",
                github_url="https://github.com/yourusername/task-manager",
                featured=True
            ),
            Project(
                title="Weather Dashboard",
                description="A weather application that provides current conditions and forecasts for locations worldwide.",
                technologies=json.dumps(["JavaScript", "OpenWeather API", "HTML/CSS"]),
                image_url="/images/projects/weather.jpg",
                project_url="https://weather-example.com",
                github_url="https://github.com/yourusername/weather-app",
                featured=False
            )
        ]
        
        for project in sample_projects:
            db.session.add(project)
        
        db.session.commit()

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

if __name__ == '__main__':
    app.run(debug=True)