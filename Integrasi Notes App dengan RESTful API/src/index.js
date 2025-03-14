import './note-form.js';
import './note-list.js';
import './note-item.js';
import './app-bar.js';
import { renderNotes, addNote } from './notes.js';

document.addEventListener("DOMContentLoaded", async () => {
    const noteList = document.querySelector("note-list");
    const form = document.getElementById("add-note-form");

    try {
        await renderNotes(); // Gunakan fungsi renderNotes untuk menampilkan catatan
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }

    // Event listener untuk form tambah catatan
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Pastikan event valid

            const title = document.getElementById("note-title").value.trim();
            const body = document.getElementById("note-body").value.trim();

            if (!title || !body) {
                alert("Judul dan isi catatan tidak boleh kosong!");
                return;
            }

            await addNote(event); // Pastikan memanggil fungsi dengan event
            renderNotes(); // Render ulang daftar catatan setelah penambahan
        });
    }
});
