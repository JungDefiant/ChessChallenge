export default class ChessPieceInfo {
    constructor(params) {
        this.name = params.name;
        this.side = params.side;
        this.rank = params.rank;
        this.file = params.file;
        this.imgSrc = params.img;
        this.element = null;
        this.startingPosition = { x: 0, y: 0 };
    }
}