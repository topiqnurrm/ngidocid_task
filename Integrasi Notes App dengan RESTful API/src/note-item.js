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
            </style>
            <div class="note">
                <h3>${this.getAttribute("title")}</h3>
                <p>${this.getAttribute("body")}</p>
                <small>${new Date(this.getAttribute("created")).toLocaleString()}</small>
                <button class="delete">Hapus</button>
            </div>
        `;

        // Pastikan ID yang diambil valid sebelum melakukan DELETE
        const noteId = this.getAttribute("id");
        if (!noteId) {
            console.error("ID Catatan tidak ditemukan!");
            return;
        }

        this.shadowRoot.querySelector(".delete").addEventListener("click", async () => {
            try {
                console.log(`Menghapus catatan dengan ID: ${noteId}`);

                const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Gagal menghapus catatan");
                }

                console.log(`Catatan dengan ID ${noteId} berhasil dihapus`);
                this.remove(); // Hapus elemen dari DOM setelah berhasil dihapus
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    }
}
customElements.define("note-item", NoteItem);
