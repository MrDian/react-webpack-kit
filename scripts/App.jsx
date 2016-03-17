import React from 'react';
import {render} from 'react-dom'
class App extends React.Component {
    render() {
        return (
            <div  className="bg">
                <h1>Hello, evanmao!</h1>
            </div>
        );
    }
}
render(
    <App />,
    document.getElementById('root')
);
