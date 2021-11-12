import Tool from '@/tools/Tool';

export default class Brush extends Tool {
    constructor(canvas, socket, session){
        super(canvas, socket, session);
        this.listen();
    }

    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmouseover = this.mouseOverHandler.bind(this);
    }

    mouseUpHandler(e){
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            session: this.session,
            figure: {
                type: 'finish'
            }
        }))
    }

    mouseDownHandler(e){
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
    
    mouseMoveHandler(e){    
        if(this.mouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                session: this.session,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    strokeStyle: this.ctx.strokeStyle,
                    lineWidth: this.ctx.lineWidth
                }
            }))
        }
    }

    mouseOverHandler(e){
        this.mouseDown = false;
    }

    static draw(ctx, x, y, strokeStyle, lineWidth){
        ctx.save()
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore()
    }
}



