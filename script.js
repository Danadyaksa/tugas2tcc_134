// GANTI INI JADI IP VM LO PAS DEPLOY! 
// Contoh: const API_URL = 'http://35.192.11.187:3000/api/v1/notes';
const API_URL = 'http://localhost:3000/api/v1/notes';

// Warna-warna pastel aesthetic buat sticky notes
const colors = ['#ffdac1', '#ffb7b2', '#e2f0cb', '#b5ead7', '#c7ceea'];

document.addEventListener('DOMContentLoaded', fetchNotes);

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const notes = result.data;
        
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        notes.forEach((note, index) => {
            const date = new Date(note.tanggal_dibuat).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
            
            // Pilih warna dan rotasi miring secara random biar natural
            const randomColor = colors[index % colors.length];
            const randomRotation = Math.floor(Math.random() * 6) - 3; // Rotasi antara -3deg sampai 3deg

            notesList.innerHTML += `
                <div class="sticky-note" style="background-color: ${randomColor}; transform: rotate(${randomRotation}deg);">
                    <h3>${note.judul}</h3>
                    <div class="note-date">${date}</div>
                    <p>${note.isi}</p>
                    <div class="note-actions">
                        <button class="action-btn edit-btn" onclick="editNote('${note.id}', '${note.judul.replace(/'/g, "\\'")}', '${note.isi.replace(/'/g, "\\'")}')">✎ Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteNote('${note.id}')">✗ Hapus</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

async function saveNote() {
    const id = document.getElementById('noteId').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    if (!judul || !isi) {
        alert('Tulis judul dan isinya dulu ya!');
        return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });

        // Reset Form
        document.getElementById('noteId').value = '';
        document.getElementById('judul').value = '';
        document.getElementById('isi').value = '';
        document.getElementById('saveBtn').innerText = 'Simpan Notes';
        
        fetchNotes();
    } catch (error) {
        console.error('Gagal menyimpan catatan:', error);
    }
}

function editNote(id, judul, isi) {
    document.getElementById('noteId').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('saveBtn').innerText = 'Simpan Perubahan';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteNote(id) {
    if (!confirm('Cabut catatan ini dari papan?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchNotes();
    } catch (error) {
        console.error('Gagal menghapus catatan:', error);
    }
}