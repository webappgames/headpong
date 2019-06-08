import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import * as posenet from '@tensorflow-models/posenet';
import { waitTimeout, waitAnimationFrame } from './utils/wait';
import { Engine } from './Game/Engine';
import { Vector2 } from './Game/Vector2';
import { Ball } from './Game/Mesh/Ball';

async function main() {
    ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

    const videoElement = document.querySelector('video')!;
    const canvasElement = document.querySelector('canvas')!;

    const net = await posenet.load();

    net;
    videoElement;

    await waitTimeout(1000);

    const engine = new Engine(canvasElement, {
        gravity: new Vector2({ x: 0, y: 100 }),
        friction: 0.9,
        iterations: 1,
    });

    engine.run();

    const people: {
        visible: boolean;
        mesh: Ball;
        /*parts: {
        id: string,
        //position: Vector2,
        ball: Ball
      }[]*/
    }[] = [];
    //let emiting = false;

    while (true) {
        const pose = await net.estimateMultiplePoses(videoElement, 0.2, false);
        //console.log('pose', pose.keypoints[0].position);

        //ball.options.label = pose.keypoints[0].part;

        people.forEach((person) => (person.visible = false));
        pose.forEach((personPose, i) => {
            if (!people[i]) {
                people[i] = {
                    visible: true,
                    mesh: new Ball(engine, {
                        label: null,
                        color: 'red',
                        size: 50,
                        position: new Vector2({ x: 10, y: 10 }),
                        movement: Vector2.Zero(),
                        freezed: true,
                    }),
                };
            }
            const person = people[i];

            const position = new Vector2(personPose.keypoints[0].position);
            person.visible = true;
            person.mesh.options.position = position;
        });

        //const movement = position.subtract(ball.options.position);
        //ball.options.position = position;

        /*
        if (movement.y < -20) {
            if (!emiting) {
                new Ball(engine, {
                    label: null,
                    color: 'green',
                    size: 50,
                    position,
                    movement: movement.scale(10),
                    freezed: false,
                });
                emiting = true;
            }
        } else {
            emiting = false;
        }
        */

        //await waitTimeout(10);
        await waitAnimationFrame();
    }
}

main();
