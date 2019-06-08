import { Ball } from './Ball';
import { Vector2 } from './Vector2';

interface IEngineOptions {
    gravity: Vector2;
    friction: number;
    iterations: number;
}

export class Engine {
    private objects: Ball[] = []; //todo abstract Object

    constructor(private canvas: HTMLCanvasElement, public options: IEngineOptions) {}

    run() {
        let timeLast: null | number = null;

        const updateLoop = (time: number) => {
            for (const object of this.objects) {
                if (timeLast) {
                    object.update((time - timeLast) / 1000);
                }
            }
            //for(let i=0;i<this.iterations;i++){
            /*let order = 0;
            for (const object of this.objects.sort((a, b) => {
                const d1 = this.gravity.normalized;
                const d2 = a.position.subtract(b.position).normalized;

                if (d1.add(d2).length > Math.sqrt(2)) {
                    return -1;
                } else {
                    return 1;
                }
            })) {
                order++;
                //object.label = order++;
                const a = (order / this.objects.length) * 255;
                object.color = `rgb(${a},${a},${a})`;
                object.applyCollisions();
            }
            //}*/
            timeLast = time;
            requestAnimationFrame(updateLoop);
        };
        updateLoop(performance.now());

        const ctx = this.canvas.getContext('2d')!;
        //todo check context existence
        const renderLoop = () => {
            //console.log('renderLoop')
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (const object of this.objects) {
                object.render(ctx);
            }

            requestAnimationFrame(renderLoop);
        };
        renderLoop();
    }

    addObject(object: Ball) {
        this.objects.push(object);
    }

    get size() {
        return new Vector2({ x: this.canvas.width, y: this.canvas.height });
    }
}
