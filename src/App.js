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
        filterValue: "All",
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
    };
    onFilterChanged = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }
    onTaskStatusChanged = (task, isDone)=>{
        let newTasks = this.state.tasks.map( t => {
            if (t != task) {
                return t;
            }
            else{
                return {...t, isDone: isDone}
            }
        })
        this.setState({
            tasks: newTasks
        })
}
    render() {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks onTaskStatusChanged={this.onTaskStatusChanged}
                        tasks={this.state.tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case "All":
                                return true;
                            case "Active":
                                return t.isDone === false;
                            default :
                                return t.isDone === true;
                        }
                    })}/>


                    <TodoListFooter onFilterChanged={this.onFilterChanged}
                                    filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;
