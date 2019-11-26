import React from 'react';

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: ""
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    }
    onTitleChanged = (e) => {debugger
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }
    activatedEditMode = (e) => {
        this.setState({
            editMode: true,
            title: e.currentTarget.value
        })
    }
    deactivatedEditMode = (e) => {
        this.setState({
            editMode: false,
            title: e.currentTarget.value
        })
    }
    render = (props) => {
        let taskOpacityCSS = this.props.task.isDone ? "todoList-task done" : "todoList-task"
        return (
            <div className={taskOpacityCSS}>
                <input type="checkbox" checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}
                />
                {this.state.editMode
                    ? <input  onChange={this.onTitleChanged} onBlur={this.deactivatedEditMode} value={this.props.task.title} autoFocus={true}/>
                    : < span onClick={this.activatedEditMode}>
                        <span>ID: {this.props.task.id} - </span>
                        <span>{this.props.task.title}, </span>
                <span>priority: {this.props.task.priority}</span>
                </span>}


            </div>
        );
    }

}

export default TodoListTask;
