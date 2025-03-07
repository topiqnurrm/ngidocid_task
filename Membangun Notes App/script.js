
document.addEventListener("DOMContentLoaded", () => {
    const noteList = document.querySelector("note-list");

    if (noteList && typeof notesData !== "undefined") {
        noteList.forEach(note => {
            const bodyContent = note.body ? note.body : "Tidak ada isi";
            renderNote(note.title, bodyContent, note.createdAt, note.id, note.archived);
        });        
    }
});


class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                input, textarea {
                    display: block;
                    width: 100%;
                    margin-bottom: 10px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    padding: 10px 20px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #218838;
                }
            </style>
            <div>
                <input type="text" id="title" placeholder="Judul Catatan">
                <textarea id="content" placeholder="Isi Catatan"></textarea>
                <button id="addNote">Tambah Catatan</button>
            </div>
        `;

        this.shadowRoot.querySelector("#addNote").addEventListener("click", () => {
            const title = this.shadowRoot.querySelector("#title").value.trim();
            const content = this.shadowRoot.querySelector("#content").value.trim();

            if (title && content) {
                document.querySelector("note-list").addNote(title, content);
                this.shadowRoot.querySelector("#title").value = "";
                this.shadowRoot.querySelector("#content").value = "";
            } else {
                alert("Judul dan isi tidak boleh kosong!");
            }
        });
    }
}

customElements.define("note-form", NoteForm);

class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // this.notes = JSON.parse(localStorage.getItem("notes")) || [];
        this.notes = notesData || JSON.parse(localStorage.getItem("notes")) || [];

    }

    connectedCallback() {
        this.render();
    }

    addNote(title, content) {
        const note = {
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toISOString(),
            archived: false
        };

        this.notes.push(note);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }

    archiveNote(id) {
        this.notes = this.notes.map(note => note.id == id ? { ...note, archived: true } : note);
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .note-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                    padding: 20px;
                }
            </style>
            <div class="note-list">
                ${this.notes
                    .filter(note => !note.archived)
                    .map(note => `
                        <note-item title="${note.title}" body="${note.body}" created="${note.createdAt}" id="${note.id}"></note-item>
                    `)
                    .join("")}
            </div>
        `;
    }
}

customElements.define("note-list", NoteList);

class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["title", "body", "created", "id"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .note {
                    border: 1px solid #ddd;
                    padding: 15px;
                    border-radius: 8px;
                    background: white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                h3 { color: #007bff; }
                small { display: block; color: #777; margin-bottom: 10px; }
                button {
                    margin-right: 5px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .delete { background-color: #dc3545; color: white; }
                .delete:hover { background-color: #c82333; }
                .archive { background-color: #ffc107; color: black; }
                .archive:hover { background-color: #e0a800; }
            </style>
            <div class="note">
                <h3>${this.getAttribute("title")}</h3>
                <p>${this.getAttribute("body")}</p>
                <small>${new Date(this.getAttribute("created")).toLocaleString()}</small>
                <button class="archive">Arsipkan</button>
                <button class="delete">Hapus</button>
            </div>
        `;

        this.shadowRoot.querySelector(".delete").addEventListener("click", () => {
            document.querySelector("note-list").deleteNote(this.getAttribute("id"));
        });

        this.shadowRoot.querySelector(".archive").addEventListener("click", () => {
            document.querySelector("note-list").archiveNote(this.getAttribute("id"));
        });
    }
}

customElements.define("note-item", NoteItem);
