import Brush from '@/tools/Brush';
import Rect from '@/tools/Rect';
import Eraser from '@/tools/Eraser';
import Line from '@/tools/Line';
import Circle from '@/tools/Circle';

export default {
    namespaced: true,
    state: {
        tool: null
    },
    getters: {

    },
    mutations: {
        SET_TOOL: (state, tool) => state.tool = tool,
        SET_FILL_COLOR: (state, color) => {
            if(state.tool){
                state.tool.fillColor = color
            }
        },
        SET_STROKE_COLOR: (state, color) => {
            if(state.tool){
                state.tool.strokeColor = color
            }
        },
        SET_LINE_WIDTH: (state, width) => {
            if(state.tool){
                state.tool.lineWidth = width
            }
        },
    },
    actions: {
        brush({rootState, commit}){
            const canvas = rootState.canvas.canvas;
            const socket = rootState.socket;
            const session = rootState.session;
            const brush = new Brush(canvas, socket, session);
            commit('SET_TOOL', brush);
        },
        rect({rootState, commit}){
            const canvas = rootState.canvas.canvas;
            const socket = rootState.socket;
            const session = rootState.session;
            const rect = new Rect(canvas, socket, session);
            commit('SET_TOOL', rect);
        },
        eraser({rootState, commit}){
            const canvas = rootState.canvas.canvas;
            const socket = rootState.socket;
            const session = rootState.session;
            const eraser = new Eraser(canvas, socket, session);
            commit('SET_TOOL', eraser);
        },
        line({rootState, commit}){
            const canvas = rootState.canvas.canvas;
            const socket = rootState.socket;
            const session = rootState.session;
            const line = new Line(canvas, socket, session);
            commit('SET_TOOL', line);
        },
        circle({rootState, commit}){
            const canvas = rootState.canvas.canvas;
            const socket = rootState.socket;
            const session = rootState.session;
            const circle = new Circle(canvas, socket, session);
            commit('SET_TOOL', circle);
        },
        socketDraw({rootState}, msg){
            const figure = msg.figure;
            const ctx = rootState.canvas.canvas.getContext('2d');
            switch (figure.type){
                case 'brush':
                    Brush.draw(
                        ctx, 
                        figure.x, 
                        figure.y, 
                        figure.strokeStyle,
                        figure.lineWidth
                    );
                    break
                case 'rect':
                    Rect.staticDraw(
                        ctx, 
                        figure.x, 
                        figure.y, 
                        figure.width, 
                        figure.height, 
                        figure.fillStyle, 
                        figure.strokeStyle, 
                        figure.lineWidth
                    );
                    break
                case 'eraser':
                    Eraser.draw(
                        ctx, 
                        figure.x, 
                        figure.y,
                        figure.lineWidth
                    );
                    break
                case 'line':
                    Line.staticDraw(
                        ctx, 
                        figure.fromX, 
                        figure.fromY, 
                        figure.toX, 
                        figure.toY, 
                        figure.strokeStyle,
                        figure.lineWidth
                    );
                    break
                case 'circle':
                    Circle.staticDraw(
                        ctx, 
                        figure.x, 
                        figure.y, 
                        figure.radius, 
                        figure.fillStyle,
                        figure.strokeStyle,
                        figure.lineWidth
                    );
                    break
                case 'finish':
                    ctx.beginPath();
                    break
            }
        }
    }
}
