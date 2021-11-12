import Brush from '@/tools/Brush';

export default class Eraser extends Brush {
    constructor(canvas, socket, session){
        super(canvas, socket, session);
        this.listen();
    }

    mouseMoveHandler(e){    
        if(this.mouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                session: this.session,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                }
            }))
        }
    }

    static draw(ctx, x, y, lineWidth){
        ctx.save()
        ctx.strokeStyle = 'white';
        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore()
    }
}



