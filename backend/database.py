from flask import current_app
from sqlalchemy.exc import SQLAlchemyError
from models import db, Project, ContactMessage

#  Retrieve all projects
def get_all_projects(featured=None):
    """Retrieve projects from the database, with optional featured filter."""
    try:
        query = Project.query
        if featured is not None:
            query = query.filter_by(featured=featured)
        projects = query.order_by(Project.order_priority.asc()).all()
        return [project.to_dict() for project in projects]
    except SQLAlchemyError as e:
        current_app.logger.error(f"Database error: {str(e)}")
        return None

#  Retrieve a single project by slug
def get_project_by_slug(slug):
    """Retrieve a single project by its slug."""
    try:
        project = Project.query.filter_by(slug=slug).first()
        return project.to_dict() if project else None
    except SQLAlchemyError as e:
        current_app.logger.error(f"Database error: {str(e)}")
        return None

#  Retrieve all contact messages
def get_all_messages():
    """Fetch all contact messages ordered by newest first."""
    try:
        messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
        return [message.to_dict() for message in messages]
    except SQLAlchemyError as e:
        current_app.logger.error(f"Database error: {str(e)}")
        return None

#  Save a new contact message
def save_contact_message(name, email, message_text, ip_address):
    """Save a contact message and return success/failure."""
    try:
        new_message = ContactMessage(name=name, email=email, message=message_text, ip_address=ip_address)
        db.session.add(new_message)
        db.session.commit()
        return True
    except SQLAlchemyError as e:
        db.session.rollback()
        current_app.logger.error(f"Database error: {str(e)}")
        return False
