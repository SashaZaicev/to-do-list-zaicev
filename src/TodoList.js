import React, {Component} from 'react';
import './App.css';
import TodoListHeader from "./components/Header/TodoListHeader";
import TodoListTasks from "./components/Tasks/TodoListTasks";
import TodoListFooter from "./components/Footer/TodoListFooter";
import TodoListTitle from "./components/Header/TodoListTitle";
import AddNewItemForm from "./components/Header/AddNewItemForm";

class TodoList extends Component {
    nextTaskId = 0;
    state = {
        tasks: [],
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        }
        let stateAsString = localStorage.getItem("our-state" + this.props.id);
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
            this.setState(state)
        }
    }
    addItem = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState();
        });

    };
    onFilterChanged = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }
    changeTask = (taskId, obj) => {
        debugger
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj}
            }
        })
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState()
        })
    }
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }

    render() {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title}/>
                        <AddNewItemForm addItem={this.addItem}/>
                    </div>
                    {/*<TodoListHeader title={this.props.title} addTask={this.addTask}/>*/}
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
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

export default TodoList;
