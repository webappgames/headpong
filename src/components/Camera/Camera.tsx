import * as React from 'react';
import * as Webcam from 'react-webcam';
import './Camera.css';

export class Camera extends React.Component<{}, {}> {
    //private webcam: any;

    //private drawCanvas: HTMLCanvasElement;

    //private overlayElementImg: HTMLElement;

    /*validate() {
            //const imageSrc = this.webcam.getScreenshot();
            //this.props.dataModel.loadAnswersFromImage(imageSrc);

            const video = this.webcam.video;

            var bufferCanvas = document.createElement('canvas');
            //var bufferCtx = bufferCanvas.getContext('2d')!;
            var drawCtx = this.drawCanvas.getContext('2d')!;
            drawCtx.clearRect(
                0,
                0,
                this.drawCanvas.width,
                this.drawCanvas.height,
            );

            bufferCanvas.width = video.width;
            bufferCanvas.height = video.height;

        }*/

    render() {
        //setTimeout(() => this.validate(), 100);

        return (
            <div className={'Camera'}>
                <Webcam
                    audio={false}
                    //width={640}
                    //height={480}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    screenshotFormat="image/jpeg"
                />
                <canvas
                    ref={(element) => {
                        if (element) {
                            //this.drawCanvas = element;

                            element.width = document.body.getBoundingClientRect().width;
                            element.height = document.body.getBoundingClientRect().height;
                        }
                    }}
                />
            </div>
        );
        //{/*ref={(webcam) => (this.webcam = webcam)}*/}
    }
}
