import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

import { Provider } from 'react-redux';
import { store } from './app/store';

const Root = () => {

    return (
        <Provider store={store}>
            <BrowserRouter path="/*">
                <App />
            </BrowserRouter>
        </Provider>

    )
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('quarter'));
