import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));


createRoot(document.querySelector('#root')!).render(
<Provider store={store}>
    <App/>
</Provider>, 
);