import { imageLibrary, ImageLibrary } from './../../utils/ImageLibrary';
import { AbstractMesh, IAbstractMeshOptions } from './AbstractMesh';
import { Vector2 } from '../Vector2';

export type IPersonCurrentMoveType = 'NONE' | 'UP' | 'DOWN';
export type IPersonOptionsPartsName = 'leftEye' | 'rightEye' | 'nose';
interface IPersonOptions extends IAbstractMeshOptions {
    glassesId: number;
    parts: { name: IPersonOptionsPartsName; position: Vector2 }[];
    //nosePosition?: Vector2;
    //eye1Position?: Vector2;
    //eye2Position?: Vector2;
}

export class Person extends AbstractMesh<IPersonOptions> {
    async render(ctx: CanvasRenderingContext2D) {
        /*
        for (const part of this.options.parts) {
            ctx.beginPath();
            ctx.arc(part.position.x, part.position.y, 5, 0, Math.PI * 2, true);
            ctx.fillStyle = 'green';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fill();
        }
        */

        const glassesImageWithMeta = imageLibrary.glassesWithMetaSync(this.options.glassesId);
        //console.log(glassesImageWithMeta);
        if (glassesImageWithMeta) {
            ImageLibrary.drawImage(glassesImageWithMeta, {
                ctx,
                a: this.options.parts.find((p) => p.name == 'rightEye')!.position,
                b: this.options.parts.find((p) => p.name == 'leftEye')!.position,
            });
            //ctx.drawImage(glassesImage, 10, 10);
        }

        /*
        console.log(this.options.position);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(this.score.toString(), this.options.position.x, this.options.position.y);

        */
        //super.render(ctx);
    }

    positions: Vector2[] = [];

    tick() {
        const positionCurrent = this.position;
        this.options.position = positionCurrent;
        this.positions.push(positionCurrent);
        //console.log(this.positions.length);
        if (this.positions.length > 100) {
            let positionLast = this.positions.shift()!;
            //const move = createMoveFromPositions(this.positions);

            const delta = Vector2.subtract(positionLast, positionCurrent);

            let move: IPersonCurrentMoveType;
            if (delta.y < 50) {
                move = 'UP';
            } else if (delta.y > 50) {
                move = 'DOWN';
            } else {
                move = 'NONE';
            }

            if (move === 'DOWN' && this.currentMove === 'UP') move = 'NONE';
            if (move === 'UP' && this.currentMove === 'DOWN') move = 'NONE';

            if (move !== this.currentMove) {
                this.currentMove = move;
                this.callSubscribers();
            }
        }
    }

    private get position(): Vector2 {
        return Vector2.center(
            this.options.parts.find((p) => p.name == 'nose')!.position,
            this.options.parts.find((p) => p.name == 'rightEye')!.position,
            this.options.parts.find((p) => p.name == 'leftEye')!.position,
        );
    }

    currentMove: IPersonCurrentMoveType = 'NONE';

    subscribers: (() => void)[];

    subscribe(subscriberCallback: () => void) {
        this.subscribers = this.subscribers || [];
        this.subscribers.push(subscriberCallback);
    }

    private callSubscribers() {
        for (const subscriber of this.subscribers || []) {
            subscriber();
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

/*
function createMoveFromPositions(positions: Vector2[]): IPersonCurrentMoveType {
    let move: IPersonCurrentMoveType | null = null;

    let position1 = positions.shift()!;

    for (const position2 of positions) {
        const delta = Vector2.subtract(position1, position2);

        let moveCurrent: IPersonCurrentMoveType;

        if (delta.y > 0) {
            moveCurrent = 'UP';
        } else if (delta.y < 0) {
            moveCurrent = 'DOWN';
        } else {
            moveCurrent = 'NONE';
        }

        if (move && moveCurrent !== 'NONE' && move !== moveCurrent) {
            move = 'NONE';
        } else {
            move = moveCurrent;
        }
    }

    return move!;
}
let position1 = positions.shift()!;
*/
