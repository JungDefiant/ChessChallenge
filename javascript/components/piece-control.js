import jsxElem, { render } from '../third-party/jaredsartin-jsx-no-react.js';
import ChessPieceInfo from './piece-info.js';
import data from '../data/pieces.json' assert { type: "json" };
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(jsxElem.createElement);

const PX_TO_VH = 0.055586436909394105 * 2;

class ChessPieceController extends HTMLElement {

    constructor() {
        super();

        const viewport = document.getElementById("viewport");
        this.start = { x: (viewport.scrollWidth * PX_TO_VH) - 50, y: 15 };
    }

    createPieces() {
        this.pieceInfo = new Array();
        for (let i = 0, len = data.length; i < len; i++) {
            const newPiece = new ChessPieceInfo(data[i]);
            newPiece.startingPosition = { x: 0, y: 0 }
            this.pieceInfo.push(newPiece);
        }

        for (let i = 0, len = this.pieceInfo.length; i < len; i++) {
            const xPos = this.start.x + ((i % 4) * 8);
            let yPos = this.start.y + (Math.floor(i / 4) * 5);

            if(i > 15) {
                yPos += 35;
            }

            const info = this.pieceInfo[i];
            info.startingPosition = { x: `${xPos}vh`, y: `${yPos}vh` };
        }
    }

    setPiecesOnBoard() {
        const boardContainer = document.getElementById("board-container");
        const boardContainerRect = boardContainer.getBoundingClientRect();
        const offset = { x: 1.5, y: 1.5 };
        const gridStart = { 
            x: boardContainerRect.x * PX_TO_VH + offset.x, 
            y: boardContainerRect.y * PX_TO_VH + offset.y,
        }
        const spaceSize = 11;

        for (let i = 0, len = this.pieceInfo.length; i < len; i++) {
            const el = this.pieceInfo[i].element;
            const info = this.pieceInfo[i];

            el.style.setProperty("transition", "transform 0.9s cubic-bezier(0.1, 1.0, 0.8, 1.0)");
            el.setAttribute("x", `${gridStart.x + ((info.rank - 1) * spaceSize)}vh`);
            el.setAttribute("y", `${gridStart.y + ((info.file - 1) * spaceSize)}vh`);
        }
    }

    connectedCallback() {
        this.createPieces();
        render(
            html`<div>
                <div id="pieces-w">
                    ${this.pieceInfo.map(info => {
                        info.element = html`<chess-piece imgsrc=${info.imgSrc} x=${info.startingPosition.x} y=${info.startingPosition.y} />`;
                        return info.element;
                    })}
                </div>
            </div>`,
            this
        );

        chessEvents.on('start', ({detail}) => {
            const piece_control = document.getElementById("piece-control");
            piece_control.setPiecesOnBoard();
        });

        chessEvents.on('reset', ({detail}) => {
            const piece_control = document.getElementById("piece-control");
            for (let i = 0, len = piece_control.pieceInfo.length; i < len; i++) {
                const el = piece_control.pieceInfo[i].element;
                const info = piece_control.pieceInfo[i];
    
                el.style.setProperty("transition", "transform 0s linear");
                el.setAttribute("x", `${info.startingPosition.x}`);
                el.setAttribute("y", `${info.startingPosition.y}`);
            }
        });
    }
}

customElements.define('chess-piece-control', ChessPieceController);