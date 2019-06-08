import * as React from 'react';
import { Camera } from '../Camera/Camera';
import './App.css';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Camera />
            </div>
        );
    }
}

export default App;
