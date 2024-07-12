import jsxElem, { render} from '../third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(jsxElem.createElement);

const BOARD_SIZE = 8;
export default BOARD_SIZE;


class ChessBoard extends HTMLElement {

  constructor() {
    super();
    this.spaces = new Array(BOARD_SIZE * BOARD_SIZE);
    this.elements = new Array(BOARD_SIZE * BOARD_SIZE);
  }

  createSpaces() {
    let isWhite = true;
    for (let i = 0, len = this.spaces.length; i < len; i++) {
      const rank = (i % BOARD_SIZE) + 1;
      const file = Math.floor((i / BOARD_SIZE) + 1);
      if(rank != 1) {
        isWhite = !isWhite;
      }
      const newSpace = { rank, file, color: isWhite ? 'w' : 'b' };
      this.spaces.push(newSpace);
    }
  }

  connectedCallback() {
    this.createSpaces();

    render(
      html`<div id="board-container" class="board">
        ${this.spaces.map(el => (html`<chess-space class="space space-${el.color}" rank=${el.rank} file=${el.file} />`))}
      </div>`,
      this
    );

    // Example event handler
    chessEvents.on('move', ({detail}) => {
      console.log(`Move event received: ${detail.from} -> ${detail.to}`);
    });
  }
}

customElements.define('chess-board', ChessBoard);