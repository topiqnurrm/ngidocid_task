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
            </style>
            <div>
                <input type="text" id="title" placeholder="Judul Catatan">
                <textarea id="content" placeholder="Isi Catatan"></textarea>
                <button id="addNote">Tambah Catatan</button>
            </div>
        `;

        this.shadowRoot.querySelector("#addNote").addEventListener("click", async () => {
            const title = this.shadowRoot.querySelector("#title").value.trim();
            const content = this.shadowRoot.querySelector("#content").value.trim();

            if (title && content) {
                await fetch("https://notes-api.dicoding.dev/v2/notes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, body: content })
                });

                document.querySelector("note-list").fetchNotes();
                this.shadowRoot.querySelector("#title").value = "";
                this.shadowRoot.querySelector("#content").value = "";
            }
        });
    }
}
customElements.define("note-form", NoteForm);
