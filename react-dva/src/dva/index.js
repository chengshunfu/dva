import React from 'react';
import ReactDOM from 'react-dom';
import { Provider,connect } from 'react-redux';
import { createBrowserHistory } from 'history'
import { createStore,combineReducers } from 'redux';
export { connect };
export default function(option = {}){
    let history = option.history || createBrowserHistory();

    let app = {
        _models:[],
        model,
        router,
        _router:null,
        start
    };
    function model(modelConfig){
        app._models.push(modelConfig);
    };

    function router(routerConfig){
        app._router = routerConfig;
    }

    function start(doucmentConfig){
        let reducers = getReducers(app)
        app._store = createStore(reducers);
        ReactDOM.render(
            <Provider store={app._store}>
                { app._router() }
            </Provider>
            ,document.querySelector(doucmentConfig));
    }
    return app;
}

function getReducers(app){
    let reducers ={};
    for(let model of app._models){
        reducers[model.namespace] = function(state = model.state,action){
            let model_reducers = model.reducers;
            let reducer = model_reducers[typeof action.type ==='string' && action.type.split('/')[1]];
            if(reducer){
                return reducer(state,action);
            }
            return state; 
        }
    }
    return combineReducers(reducers)
}

