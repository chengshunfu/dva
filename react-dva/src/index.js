import React from 'react';
import dva,{ connect } from './dva';
import { createBrowserHistory } from 'history';
let app = dva({
    history:createBrowserHistory()
});

app.model({
    namespace:'counter',
    state:{number:0},
    reducers:{
        add(state){
            return {number:state.number+1};
        },
        miuns(state){
            return {number:state.number-1};
        }
    }
});

function Counter(props){
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={()=> props.dispatch({type:'counter/add'})}>同步+1</button>
            <button onClick={()=> props.dispatch({type:'counter/miuns'})}>同步-1</button>
        </div>
    )
}

let ConnectedCounter = connect(state=>state.counter)(Counter)

app.router(()=>(
    <ConnectedCounter />
));

app.start('#root');
