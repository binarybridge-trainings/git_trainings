// DOM Elements for practise
const notesContainer = document.getElementById('notesContainer');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const noteColorInput = document.getElementById('noteColor');
const createNoteBtn = document.getElementById('createNoteBtn');
const noteTemplate = document.getElementById('noteTemplate');

// Initialize app as Ashok kumar
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    createNoteBtn.addEventListener('click', handleCreateNote);
    noteTitleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleCreateNote();
        }
    });
});

/**
//  Load all notes from the API
 */
async function loadNotes() {
    try {
        const response = await fetch('/api/notes');
        if (!response.ok) throw new Error('Failed to load notes');
        
        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        console.error('Error loading notes:', error);
        showError('Failed to load notes');
    }
}

/**
 * Render notes on the page
 */
function renderNotes(notes) {
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        notesContainer.innerHTML = '<p class="no-notes">No notes yet. Create one to get started!</p>';
        return;
    }
    
    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
    });
}

/**
 * Create a note element from a note object
 */
function createNoteElement(note) {
    const clone = noteTemplate.content.cloneNode(true);
    const noteCard = clone.querySelector('.note-card');
    
    noteCard.dataset.id = note.id;
    noteCard.dataset.pinned = note.is_pinned;
    
    clone.querySelector('.note-title').textContent = note.title;
    clone.querySelector('.note-content').textContent = note.content;
    clone.querySelector('.note-color-indicator').style.backgroundColor = note.color;
    noteCard.style.borderLeftColor = note.color;
    
    const date = new Date(note.updated_at);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    clone.querySelector('.note-date').textContent = formattedDate;
    
    // Pin button
    const pinBtn = clone.querySelector('.btn-pin');
    pinBtn.textContent = note.is_pinned ? '📌' : '📍';
    pinBtn.addEventListener('click', () => togglePin(note.id));
    
    // Delete button
    const deleteBtn = clone.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => deleteNote(note.id));
    
    return clone;
}

/**
 * Handle creating a new note
 */
async function handleCreateNote() {
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    const color = noteColorInput.value;
    
    if (!title) {
        showError('Please enter a note title');
        return;
    }
    
    try {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content,
                color: color
            })
        });
        
        if (!response.ok) throw new Error('Failed to create note');
        
        const note = await response.json();
        
        // Clear input fields
        noteTitleInput.value = '';
        noteContentInput.value = '';
        noteColorInput.value = '#fff9c4';
        
        // Reload notes
        loadNotes();
        showSuccess('Note created successfully!');
    } catch (error) {
        console.error('Error creating note:', error);
        showError('Failed to create note');
    }
}

/**
 * Update a note
 */
async function updateNote(noteId, updates) {
    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });
        
        if (!response.ok) throw new Error('Failed to update note');
        
        loadNotes();
    } catch (error) {
        console.error('Error updating note:', error);
        showError('Failed to update note');
    }
}

/**
 * Delete a note
 */
async function deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete note');
        
        loadNotes();
        showSuccess('Note deleted successfully!');
    } catch (error) {
        console.error('Error deleting note:', error);
        showError('Failed to delete note');
    }
}

/**
 * Toggle pin status of a note
 */
async function togglePin(noteId) {
    try {
        const response = await fetch(`/api/notes/${noteId}/pin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Failed to toggle pin');
        
        loadNotes();
    } catch (error) {
        console.error('Error toggling pin:', error);
        showError('Failed to toggle pin');
    }
}

/**
 * Show error message
 */
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = '❌ ' + message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

/**
 * Show success message
 */
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = '✅ ' + message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Add alert styles dynamically
const style = document.createElement('style');
style.textContent = `
    .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    }
    
    .alert-error {
        background: #ff6b6b;
    }
    
    .alert-success {
        background: #51cf66;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
