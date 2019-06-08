import { AbstractMesh, IAbstractMeshOptions } from './AbstractMesh';

interface IBallOptions extends IAbstractMeshOptions {
    color: string;
    size: number;
}

export class Ball extends AbstractMesh<IBallOptions> {
    render(ctx: CanvasRenderingContext2D) {
        //console.log('render');
        ctx.beginPath();
        ctx.arc(this.options.position.x, this.options.position.y, this.options.size, 0, Math.PI * 2, true);

        /*for(let i=0;i<500;i++){
            (i===0?ctx.moveTo:ctx.lineTo).call(ctx,i+time/100,Math.sin(i/10)*100+250);
        }*/

        ctx.fillStyle = this.options.color;
        //ctx.lineWidth = 5;

        //ctx.stroke();
        ctx.fill();

        if (this.options.label) {
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(this.options.label, this.options.position.x, this.options.position.y);
        }
    }

    /*
    applyCollisions() {
        for (const object of this.engine.objects) {
            if (this.collideWith(object)) {
                this.position = object.position.add(
                    this.position.subtract(object.position).toLengthInPlace(this.size + object.size),
                );
            }
        }

        if (this.position.x < this.size) this.position.x = this.size;
        if (this.position.y < this.size) this.position.y = this.size;
        if (this.position.x > this.engine.size.x - this.size) this.position.x = this.engine.size.x - this.size;
        if (this.position.y > this.engine.size.y - this.size) this.position.y = this.engine.size.y - this.size;
    }

    collideWith(ball) {
        return Vector2.distance(this.position, ball.position) < this.size + ball.size;
    }
    */
}
