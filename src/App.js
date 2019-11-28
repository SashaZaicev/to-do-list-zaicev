import React, {Component} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./components/Header/AddNewItemForm";
import axios from "axios";

class App extends Component {
    nextTaskId = 0;
    state = {
        todolists: [
            // {title: "What to learn?"},
            // {title: "Week tasks"},
            // {title: "Day of the dead"},
            // {id: 2, title: "JS", isDone: false, priority: "low"},
            // {id: 3, title: "ReactJS", isDone: false, priority: "medium"},
            // {id: 4, title: "Patterns", isDone: true, priority: "high"},
        ],
    };
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString)
    }
    componentDidMount() {
        this.restoreState()
    }
    restoreState = () => {
        let state = this.state;

        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists", {withCredentials: true})
            .then(res => {
                debugger
                console.log(res.data);
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
    addTodoList = (title) => {debugger
        let newTodoList = {
            id: this.nextTaskId,
            title: title,
        };
        this.nextTaskId++;
        let newTodolists = [...this.state.todolists, newTodoList];
        this.setState({
            todolists: newTodolists
        }, () => {
            this.saveState();
        });
    }
    render = () => {

        const todolists = this.state.todolists.map(tl => <TodoList id={tl.id} title={tl.title}/>)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

export default App;
