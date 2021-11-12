import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas, socket, session){
        super(canvas, socket, session);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        let canvasData = this.canvas.toDataURL()
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = canvasData
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            session: this.session,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                radius: this.r,
                fillStyle: this.ctx.fillStyle,
                strokeStyle: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        }))
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            let curentX =  e.pageX-e.target.offsetLeft
            let curentY =  e.pageY-e.target.offsetTop
            this.width = curentX-this.startX
            this.height = curentY-this.startY
            this.r = Math.sqrt(this.width**2 + this.height**2)
            this.draw(this.startX, this.startY, this.r)
        }
    }

    draw(x,y,r) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2*Math.PI)
            this.ctx.stroke()
            this.ctx.fill()
            
        }.bind(this)
    }

    static staticDraw(ctx, x, y, radius, fillStyle, strokeStyle, lineWidth) {
        ctx.save()
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth
        ctx.arc(x, y, Math.abs(radius), 0, 2*Math.PI)
        ctx.stroke()
        ctx.fill()
        ctx.restore()
        ctx.beginPath()
    }
}