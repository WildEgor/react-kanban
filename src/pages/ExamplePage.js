import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import ExampleView from '../views/ExampleView';

const ExamplePage = () => {
    return (
        <AppWrapper>
            <ExampleView/>
        </AppWrapper>
    )
}

ReactDOM.render(<ExamplePage />, document.getElementById('root'));