

class ChessSpace extends HTMLElement {

    static get observedAttributes() {
        return ["rank", "file"];
    }

    constructor() {
        super();
    }
}

customElements.define('chess-space', ChessSpace);
