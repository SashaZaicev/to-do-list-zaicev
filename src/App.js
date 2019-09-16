import React, {Component} from 'react';
import './App.css';
import TodoListHeader from "./components/Header/TodoListHeader";
import TodoListTasks from "./components/Tasks/TodoListTasks";
import TodoListFooter from "./components/Footer/TodoListFooter";

class App extends Component {
    state = {
        tasks: [
            {id: 1, title: "CSS", isDone: true, priority: "low"},
            {id: 2, title: "JS", isDone: false, priority: "low"},
            {id: 3, title: "ReactJS", isDone: false, priority: "medium"},
            {id: 4, title: "Patterns", isDone: true, priority: "high"},
        ],
        filterValue: "Active",
    };

    addTask = (newText) => {
        let newTask = {
            title: newText,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    }

    render() {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;
