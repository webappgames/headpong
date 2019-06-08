import { Vector2 } from '../Vector2';
import { Engine } from '../Engine';

//TODO: external vs internal options like freezed and active
//TODO: sort options
export interface IAbstractMeshOptions {
    label?: string;
    active: boolean;
    position: Vector2;
    movement: Vector2;
    freezed: boolean;
}

export class AbstractMesh<TOptions extends IAbstractMeshOptions> {
    constructor(private engine: Engine, public options: TOptions) {
        engine.addObject(this);
    }

    tick() {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.options.position.x, this.options.position.y, 5, 0, Math.PI * 2, true);

        ctx.fillStyle = 'green';
        ctx.lineWidth = 1;

        ctx.stroke();
        ctx.fill();

        if (this.options.label) {
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(this.options.label, this.options.position.x, this.options.position.y);
        }
    }

    update(delta: number) {
        if (this.options.freezed) return;
        this.options.position.addInPlace(this.options.movement.scale(delta));
        this.options.movement.addInPlace(this.engine.options.gravity.scale(delta));
        this.options.movement.scaleInPlace(Math.pow(this.engine.options.friction, delta));
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
