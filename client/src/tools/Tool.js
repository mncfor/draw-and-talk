export default class Tool {
    constructor(canvas, socket, session){
        this.canvas = canvas;
        this.socket = socket;
        this.session = session;
        this.ctx = canvas.getContext('2d');
        this.destroy();
    }

    set fillColor(color){
        this.ctx.fillStyle = color;
    }

    set strokeColor(color){
        this.ctx.strokeStyle = color;
    }

    set lineWidth(width){
        this.ctx.lineWidth = width;
    }

    destroy(){
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.canvas.onmouseover = null;
    }
}


