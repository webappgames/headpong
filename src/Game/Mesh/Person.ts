import { AbstractMesh, IAbstractMeshOptions } from './AbstractMesh';
import { Vector2 } from '../Vector2';

export type IPersonOptionsPartsName = 'leftEye' | 'rightEye' | 'nose';
interface IPersonOptions extends IAbstractMeshOptions {
    parts: { name: IPersonOptionsPartsName; position: Vector2 }[];
    //nosePosition?: Vector2;
    //eye1Position?: Vector2;
    //eye2Position?: Vector2;
}

export class Person extends AbstractMesh<IPersonOptions> {
    render(ctx: CanvasRenderingContext2D) {
        for (const part of this.options.parts) {
            ctx.beginPath();
            ctx.arc(part.position.x, part.position.y, 5, 0, Math.PI * 2, true);
            ctx.fillStyle = 'green';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fill();
        }
        super.render(ctx);
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
