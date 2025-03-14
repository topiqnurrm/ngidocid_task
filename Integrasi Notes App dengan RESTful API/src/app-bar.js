class AppBar extends HTMLElement {
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
                :host {
                    display: block;
                    background-color: #007bff;
                    color: white;
                    padding: 15px;
                    margin-bottom: 10px;
                    text-align: center;
                    font-size: 1.5em;
                    font-weight: bold;
                }
            </style>
            <div>Notes App</div>
        `;
    }
}
customElements.define("app-bar", AppBar);