import React from 'react';
import  './TodoListTask.module.css'

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e) => {debugger
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    }
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    }
    activatedEditMode = (e) => {
        this.setState({
            editMode: true
        })
    }
    deactivatedEditMode = (e) => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({editMode: false});
    }
    onDeleteTask=()=> {
        this.props.deleteTask(this.props.task.id)
    }
    render = (props) => {debugger
        let taskOpacityCSS = this.props.task.completed ? "todoList-task done" : "todoList-task"
        let priority = "";
        switch (this.props.task.priority) {
            case 0: priority = "Low"; break;
            case 1: priority = "Middle"; break;
            case 2: priority = "High"; break;
            case 3: priority = "Urgently"; break;
            case 4: priority = "Later"; break;
        }

        return (
            <div className={taskOpacityCSS}>
                <input type="checkbox" checked={this.props.task.status == 2}
                       onChange={this.onIsDoneChanged}
                />
                {this.state.editMode
                    ? <input  onChange={this.onTitleChanged}
                              onBlur={this.deactivatedEditMode}
                              value={this.state.title}
                              autoFocus={true}/>
                    : < span onClick={this.activatedEditMode}>
                        {/*<span>ID: {this.props.task.id} - </span>*/}
                        <span>Task: {this.props.task.title}, </span>
                <span>priority: {priority}</span>
                        <span> <button onClick={this.onDeleteTask}>X</button></span>
                </span>}


            </div>
        );
    }


}

export default TodoListTask;
