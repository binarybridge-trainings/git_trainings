from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

# Initialize Flask app
app = Flask(__name__)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "notes.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

# Initialize database
db = SQLAlchemy(app)

# Database Model
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=True)
    color = db.Column(db.String(7), default='#fff9c4')  # Default yellow
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_pinned = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'color': self.color,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'is_pinned': self.is_pinned
        }


# Create database tables
with app.app_context():
    db.create_all()


# Routes
@app.route('/')
def index():
    """Render main page"""
    return render_template('index.html')


# API Endpoints
@app.route('/api/notes', methods=['GET'])
def get_notes():
    """Get all notes, with pinned notes first"""
    notes = Note.query.order_by(Note.is_pinned.desc(), Note.updated_at.desc()).all()
    return jsonify([note.to_dict() for note in notes])


@app.route('/api/notes', methods=['POST'])
def create_note():
    """Create a new note"""
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    note = Note(
        title=data.get('title', ''),
        content=data.get('content', ''),
        color=data.get('color', '#fff9c4')
    )
    
    db.session.add(note)
    db.session.commit()
    
    return jsonify(note.to_dict()), 201


@app.route('/api/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    """Get a single note"""
    note = Note.query.get_or_404(note_id)
    return jsonify(note.to_dict())


@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    """Update a note"""
    note = Note.query.get_or_404(note_id)
    data = request.get_json()
    
    if 'title' in data:
        note.title = data['title']
    if 'content' in data:
        note.content = data['content']
    if 'color' in data:
        note.color = data['color']
    if 'is_pinned' in data:
        note.is_pinned = data['is_pinned']
    
    note.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(note.to_dict())


@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    """Delete a note"""
    note = Note.query.get_or_404(note_id)
    db.session.delete(note)
    db.session.commit()
    
    return jsonify({'message': 'Note deleted successfully'}), 200


@app.route('/api/notes/<int:note_id>/pin', methods=['PUT'])
def toggle_pin(note_id):
    """Toggle pin status of a note"""
    note = Note.query.get_or_404(note_id)
    note.is_pinned = not note.is_pinned
    note.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(note.to_dict())


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
