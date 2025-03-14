export async function renderNotes() {
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
    if (!response.ok) throw new Error(`Failed to fetch notes: ${response.statusText}`);

    const data = await response.json();
    if (!data || !Array.isArray(data.data)) throw new Error("Invalid response format");

    console.log("Fetched data:", data);

    // Hanya menggunakan komponen <note-list> tanpa menambahkan catatan langsung ke DOM
    const noteListElement = document.querySelector("note-list");
    if (noteListElement) {
      noteListElement.fetchNotes();
    }
  } catch (error) {
    alert('Error loading notes: ' + error.message);
  }
}

export async function addNote(event) {
  event.preventDefault();

  const titleInput = document.getElementById('note-title');
  const bodyInput = document.getElementById('note-body');

  if (!titleInput || !bodyInput) {
    alert("Title or body input element not found.");
    return;
  }

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Title and body cannot be empty.");
    return;
  }

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add note');
    }

    titleInput.value = '';
    bodyInput.value = '';

    renderNotes(); // Memastikan UI diperbarui
  } catch (error) {
    alert('Error adding note: ' + error.message);
  }
}
