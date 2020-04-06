import React, {Component} from 'react';
import './App.css';
import TodoListTasks from "./components/Tasks/TodoListTasks";
import TodoListFooter from "./components/Footer/TodoListFooter";
import TodoListTitle from "./components/Header/TodoListTitle";
import AddNewItemForm from "./components/Header/AddNewItemForm";
import {api} from "./api/api";
import {connect} from "react-redux";
import {
    addTaskAC,
    deleteTaskAC,
    deleteTodolistAC,
    setTasksAC,
    updateTaskAC,
    updateTodolistTitleAC
} from "./reducers/reducer";
import s from "./components/Tasks/Task/TodoListTask.module.css";

class TodoList extends Component {
    // nextTaskId = 0;
    state = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state" + this.props.id, stateAsString)
    }

    __restoreState = () => {
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
    restoreState = () => {
        api.getTasks(this.props.id)
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id);
            });
    }

    addTask = (newText) => {
        api.createTask(newText, this.props.id)
            .then(res => {
                let newTask = res.data.data.item;
                this.props.addTask(newTask, this.props.id);
            })
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    }
    changeTask = (taskId, obj) => {

        this.props.tasks.forEach(t => {
            if (t.id === taskId) {
                api.updateTask({...t, ...obj})
                    .then(res => {
                        this.props.updateTask(taskId, obj, this.props.id);
                    });
            }
        })
    }
    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }
    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                // раз попали в then, значит
                this.props.deleteTodolist(this.props.id);
            });
    }
    updateTitle = (title) => {
        api.updateTodolistTitle(title, this.props.id)
            .then(res => {
                this.props.updateTodolistTitle(title, this.props.id);
            });
    }

    deleteTask = (taskId) => {
        api.deleteTask(taskId)
            .then(res => {
                // раз попали в then, значит
                this.props.deleteTask(taskId, this.props.id);
            });
    }

    render() {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle title={this.props.title}
                                   onDelete={this.deleteTodolist}
                                   updateTitle={this.updateTitle}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                {/*<TodoListHeader title={this.props.title} addTask={this.addTask}/>*/}
                <div className='centerEl'>TASKS:</div>
                <TodoListTasks key={this.props.id}
                               changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                               deleteTask={this.deleteTask}
                               tasks={tasks.filter(t => {
                                   switch (this.state.filterValue) {
                                       case "All":
                                           return true;
                                       case "Active":
                                           return t.status === 0;
                                       default :
                                           return t.status === 2;
                                   }
                               })}/>


                <TodoListFooter onFilterChanged={this.changeFilter}
                                filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

let mdtp = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            const action =
                addTaskAC(newTask, todolistId)
            dispatch(action)
        },
        updateTask(taskId, obj, todolistId) {
            const action =
                updateTaskAC(taskId, obj, todolistId)
            dispatch(action)
        },
        deleteTask(taskId, todolistId) {
            const action =
                deleteTaskAC(taskId, todolistId)
            dispatch(action)
        },
        setTasks(tasks, todolistId) {
            const action =
                setTasksAC(tasks, todolistId)
            dispatch(action)
        },
        deleteTodolist(todolistId) {
            const action =
                deleteTodolistAC(todolistId)
            dispatch(action)
        },
        updateTodolistTitle: (title, todolistId) => {
            const action = updateTodolistTitleAC(todolistId, title);
            dispatch(action)
        }
    }
}
const ConnectedTodolist = connect(null, mdtp)(TodoList)
export default ConnectedTodolist;
