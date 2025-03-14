class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.notes = [];
        this.shadowRoot.innerHTML = `
            <style>
                .lds-facebook,
                .lds-facebook div {
                    box-sizing: border-box;
                }
                .lds-facebook {
                    display: none;
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: auto;
                }
                .lds-facebook div {
                    display: inline-block;
                    position: absolute;
                    left: 8px;
                    width: 16px;
                    background: currentColor;
                    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
                }
                .lds-facebook div:nth-child(1) {
                    left: 8px;
                    animation-delay: -0.24s;
                }
                .lds-facebook div:nth-child(2) {
                    left: 32px;
                    animation-delay: -0.12s;
                }
                .lds-facebook div:nth-child(3) {
                    left: 56px;
                    animation-delay: 0s;
                }
                @keyframes lds-facebook {
                    0% {
                        top: 8px;
                        height: 64px;
                    }
                    50%, 100% {
                        top: 24px;
                        height: 32px;
                    }
                }
                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .note-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                    padding: 20px;
                }
            </style>
            <div class="loading-container">
                <div class="lds-facebook" id="loading">
                    <div></div><div></div><div></div>
                </div>
            </div>
            <div class="note-list" id="notes-container"></div>
        `;
    }

    async fetchNotes() {
        try {
            this.showLoading(); // Tampilkan loading
            const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
            const data = await response.json();
    
            console.log("Fetched data:", data); // Debugging
    
            if (!data || !Array.isArray(data.data)) {
                throw new Error("Invalid data format");
            }
    
            this.notes = data.data;
            this.render();
        } catch (error) {
            console.error("Error fetching notes:", error);
            this.notes = []; // Pastikan tidak undefined
            this.render();
        } finally {
            this.hideLoading(); // Sembunyikan loading setelah selesai
        }
    }
    
    showLoading() {
        this.shadowRoot.getElementById("loading").style.display = "inline-block";
    }

    hideLoading() {
        this.shadowRoot.getElementById("loading").style.display = "none";
    }

    connectedCallback() {
        this.fetchNotes();
    }

    render() {
        const container = this.shadowRoot.getElementById("notes-container");
        container.innerHTML = this.notes.map(note => `
            <note-item id="${note.id}" title="${note.title}" body="${note.body}" created="${note.createdAt}"></note-item>
        `).join("");
    }
}
customElements.define("note-list", NoteList);