import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamList from './Streams/StreamList';
import StreamCreate from './Streams/StreamCreate';
import StreamEdit from './Streams/StreamEdit';
import StreamDelete from './Streams/StreamDelete';
import StreamShow from './Streams/StreamShow';
import Header from './Header';
import history from '../history';
import '../style/App.css'

const App = () => {
    return (
        <div className='ui container'>
            <Router history={history}>
                <div>
                    <Header/>
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/stream/new" exact component={StreamCreate}/>
                    <Route path="/stream/edit/:id" exact component={StreamEdit}/>
                    <Route path="/stream/delete/:id" exact component={StreamDelete}/>
                    <Route path="/stream/show/:id" exact component={StreamShow}/>
                </div>
            </Router>
        </div>
    );
};

export default App;