const API_URL = 'http://localhost:3000/api/v1/notes';

document.addEventListener('DOMContentLoaded', fetchNotes);

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const notes = result.data;
        
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        notes.forEach(note => {
            const date = new Date(note.tanggal_dibuat).toLocaleString('id-ID');
            notesList.innerHTML += `
                <div class="note-card">
                    <h3>${note.judul}</h3>
                    <span class="note-meta">Dibuat: ${date}</span>
                    <p>${note.isi}</p>
                    <div class="note-actions">
                        <button class="action-btn btn-edit" onclick="editNote('${note.id}', '${note.judul.replace(/'/g, "\\'")}', '${note.isi.replace(/'/g, "\\'")}')">Edit</button>
                        <button class="action-btn btn-del" onclick="deleteNote('${note.id}')">Hapus</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('API Error:', error);
    }
}

async function saveNote() {
    const id = document.getElementById('noteId').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    if (!judul || !isi) return alert('Mohon isi judul dan catatan terlebih dahulu!');

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });

        document.getElementById('noteId').value = '';
        document.getElementById('judul').value = '';
        document.getElementById('isi').value = '';
        document.getElementById('saveBtn').innerText = 'Simpan';
        
        fetchNotes();
    } catch (error) {
        console.error('Save Error:', error);
    }
}

function editNote(id, judul, isi) {
    document.getElementById('noteId').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('saveBtn').innerText = 'Update Catatan';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteNote(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus catatan ini?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchNotes();
    } catch (error) {
        console.error('Delete Error:', error);
    }
}