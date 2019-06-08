import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import * as posenet from '@tensorflow-models/posenet';


async function main(){

  const net = await posenet.load();
  net;
  //const pose = await net.estimateSinglePose(image, imageScaleFactor, flipHorizontal, outputStride);




  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
  

}


main();