import React, {Component} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./components/Header/AddNewItemForm";
import {api} from "./api/api";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC} from "./reducers/reducer";

class App extends Component {
    // nextTaskId = 0;
    state = {
        todolists: [],
    };
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString)
    }

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res.data)
                // console.log(res.data);
            });
    }
    __restoreState = () => {
        let state = {
            todolists: []
        }
        let stateAsString = localStorage.getItem("our-state" + this.props.id);
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
            this.setState(state)
        }
    }
    addTodoList = (title) => {
        api.createTodolist(title)
            .then(res => {
                let todolist = res.data.data.item;
                this.props.addTodolist(todolist);
            })
    }


    render = () => {

        const todolists = this.props
            .todolists
            .map(tl => <TodoList key={`${tl.id + tl.title} `} id={tl.id} title={tl.title} tasks={tl.tasks}/>)
        return (
            <>
                <div>
                    <AddNewItemForm  addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

let mstp = (state) => {
    return {
        todolists: state.todolists
    }
};
let mdtp = (dispatch) => {

    return {
        addTodolist: (newTodoList) => {
            const action =
                addTodolistAC(newTodoList)
            dispatch(action)
        },

        setTodolists(todolists) {
            const action =
                setTodolistsAC(todolists)
            dispatch(action)
        }

    }
}
const ConnectedApp = connect(mstp, mdtp)(App)
export default ConnectedApp;
