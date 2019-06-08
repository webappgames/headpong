export class Vector2 {
    public x: number;
    public y: number;

    constructor(data: { x: number; y: number }) {
        Object.assign(this, data);

        /*if (isNaN(x) || isNaN(y)) {
            throw new Error(`Can not create Vector2 with NaN value.`);
        }
        this.x = x;
        this.y = y;*/
    }

    static Zero() {
        return new Vector2({ x: 0, y: 0 });
    }

    static distance(vector2_1: Vector2, vector2_2: Vector2) {
        return Math.sqrt(Math.pow(vector2_1.x - vector2_2.x, 2) + Math.pow(vector2_1.y - vector2_2.y, 2));
    }

    clone() {
        return new Vector2(this);
    }

    addInPlace(vector2: Vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
        return this;
    }

    add(vector2: Vector2) {
        return new Vector2({ x: this.x + vector2.x, y: this.y + vector2.y });
    }

    subtractInPlace(vector2: Vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
        return this;
    }

    subtract(vector2: Vector2) {
        return new Vector2({ x: this.x - vector2.x, y: this.y - vector2.y });
    }

    scaleInPlace(ratio: number) {
        this.x *= ratio;
        this.y *= ratio;
        return this;
    }

    scale(ratio: number) {
        if (isNaN(ratio)) {
            throw new Error(`Can not scale Vector2 with NaN value.`);
        }
        return new Vector2({ x: this.x * ratio, y: this.y * ratio });
    }

    get length() {
        //todo optimize cache
        return Vector2.distance(this, Vector2.Zero());
    }

    get normalized() {
        return this.toLength(1);
    }

    toLengthInPlace(length: number) {
        if (this.length !== 0) {
            this.scaleInPlace(length / this.length);
        }
        return this;
    }

    toLength(length: number) {
        return this.clone().toLengthInPlace(length);
    }
}
