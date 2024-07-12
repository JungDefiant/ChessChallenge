import jsxElem, { render } from '../third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(jsxElem.createElement);

class ChessPiece extends HTMLElement {

    static get observedAttributes() {
        return ["imgsrc", "x", "y"];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        const imgsrc = this.getAttribute("imgsrc");
        const x = this.getAttribute("x");
        const y = this.getAttribute("y");
        this.style.setProperty("--xPos", x);
        this.style.setProperty("--yPos", y);
        render(
            html`<img class="piece-img" src=${imgsrc} />`,
            this
        );
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "x") {
            this.style.setProperty("--xPos", newValue);
        } 
        else if (name === "y") {
            this.style.setProperty("--yPos", newValue);
        }
    }
}

customElements.define('chess-piece', ChessPiece);