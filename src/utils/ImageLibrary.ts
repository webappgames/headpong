import { Vector2 } from './../Game/Vector2';

export class ImageLibrary {
    private images: { [key: string]: HTMLImageElement }[] = [];

    fromSrc(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const imageElement = document.createElement('img');
            imageElement.addEventListener('load', () => {
                this.images[src] = imageElement;
                resolve(imageElement);
            });
            imageElement.src = src;
        });
    }

    fromSrcSync(src: string): HTMLImageElement | null {
        return this.images[src] || null;
    }

    static imageToContext(imageElement: HTMLImageElement): CanvasRenderingContext2D {
        const canvasElement = document.createElement('canvas');
        canvasElement.width = imageElement.width;
        canvasElement.height = imageElement.height;
        const ctx = canvasElement.getContext('2d')!;
        ctx.drawImage(imageElement, 0, 0);
        return ctx;
    }

    static drawImage(
        src: {
            a: Vector2;
            b: Vector2;
            resource: HTMLImageElement;
        },
        dest: {
            a: Vector2;
            b: Vector2;
            ctx: CanvasRenderingContext2D;
        },
    ) {
        const rotation = Vector2.rotation(dest.a, dest.b) - Vector2.rotation(src.a, src.b);
        const lenght = Vector2.distance(dest.a, dest.b) / Vector2.distance(src.a, src.b);

        //const srcContext = ImageLibrary.imageToContext(src.resource);

        //console.log(Math.round((rotation / Math.PI) * 180));

        const srcBasePoint = src.a.scale(lenght).rotate(rotation);

        dest.ctx.save();
        dest.ctx.translate(dest.a.x - srcBasePoint.x, dest.a.y - srcBasePoint.y);
        dest.ctx.rotate(rotation);

        dest.ctx.drawImage(
            //srcContext.canvas,
            src.resource,
            0, //dest.a.x,
            0, //dest.a.y,
            src.resource.width * lenght,
            src.resource.height * lenght,
        );

        dest.ctx.restore();
    }
}

export const imageLibrary = new ImageLibrary();
