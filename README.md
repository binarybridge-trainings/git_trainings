# 📝 Keep Notes - Google Keep Clone

A simple, modern note-taking web application built with Flask. Create, edit, delete, and organize your notes with an intuitive interface.

## Features

✨ **Core Features:**
- ✏️ Create, read, update, and delete notes
- 🎨 Customize note colors
- 📌 Pin/unpin important notes
- 💾 Auto-save functionality
- 📱 Responsive design (works on mobile, tablet, desktop)
- 🔄 Real-time updates

## Project Structure

```
git_trainings/
├── main.py                 # Flask application & API endpoints
├── requirements.txt        # Python dependencies
├── README.md              # This file
├── templates/
│   └── index.html         # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css      # Styling
│   └── js/
│       └── app.js         # Frontend JavaScript
└── notes.db               # SQLite database (auto-created)
```

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd git_trainings
```

### Step 2: Create a Virtual Environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run the Application

```bash
python main.py
```

The application will start at: **http://localhost:5000**

## Usage

### Creating a Note
1. Enter a title in the "Add a title..." field
2. Enter content in the "Add a note..." field
3. Optionally select a color using the color picker
4. Click "Create Note" or press `Ctrl+Enter`

### Managing Notes
- **Edit**: Click on a note card to view/edit (inline editing can be added)
- **Delete**: Click the 🗑️ button to delete a note
- **Pin**: Click the 📌 button to pin a note to the top
- **Color**: Notes display with customizable background colors

## API Endpoints

The application provides the following REST API endpoints:

### Get All Notes
```
GET /api/notes
```
Returns all notes sorted by pin status and update date.

### Create a Note
```
POST /api/notes
Content-Type: application/json

{
    "title": "Note Title",
    "content": "Note content here",
    "color": "#fff9c4"
}
```

### Get a Single Note
```
GET /api/notes/<note_id>
```

### Update a Note
```
PUT /api/notes/<note_id>
Content-Type: application/json

{
    "title": "Updated Title",
    "content": "Updated content",
    "color": "#ffccbc",
    "is_pinned": true
}
```

### Delete a Note
```
DELETE /api/notes/<note_id>
```

### Toggle Pin Status
```
PUT /api/notes/<note_id>/pin
```

## Technology Stack

- **Backend**: Flask (Python web framework)
- **Database**: SQLite with SQLAlchemy ORM
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with gradients and animations

## Database Schema

### Notes Table
```
- id (Integer, Primary Key)
- title (String, Required)
- content (Text, Optional)
- color (String, Default: '#fff9c4')
- created_at (DateTime, Auto-set)
- updated_at (DateTime, Auto-updating)
- is_pinned (Boolean, Default: False)
```

## Features Explained

### Color Customization
Each note can have a custom background color. The color picker allows you to select from any color in the spectrum.

### Pin Feature
Pinned notes appear at the top of your notes list for easy access. Click the pin button to toggle this status.

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile devices

### Auto-generated Database
The SQLite database is automatically created on first run. No manual setup needed!

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, you can modify the port in `main.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Change 5000 to 5001
```

### Database Issues
To reset the database:
1. Stop the application
2. Delete `notes.db` file
3. Run the application again

### Module Not Found Errors
Make sure you're in the virtual environment and have installed all dependencies:
```bash
pip install -r requirements.txt
```

## Future Enhancements

- 🔐 User authentication & accounts
- 🏷️ Tags/categories for organizing notes
- 🔍 Search functionality
- 📤 Export notes (PDF/JSON)
- 🌙 Dark mode
- 📝 Rich text editor
- 🔄 Note sharing
- 📊 Note statistics

## License

This project is open source and available under the MIT License.

## Support

For issues or suggestions, please open an issue in the repository.

---

**Happy note-taking! 📝**
