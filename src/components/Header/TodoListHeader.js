import React from 'react';
import './TodoListHeader.module.css';


class TodoListHeader extends React.Component {
    state = {
        error: false,
    };

    constructor(props) {
        super(props);
        this.newTasksTitleRef = React.createRef();
    }

    editTitleField = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }
    onAddTaskClick = () => {
        // debugger
        let newText = this.newTasksTitleRef.current.value;
        this.newTasksTitleRef.current.value = "";
        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addTask(newText)
        }

    };

    render = () => {
        let classErrorBorder = this.state.error === true ? "error" : " ";
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title"> What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input className={classErrorBorder}
                           type="text"
                           placeholder="New task name"
                           ref={this.newTasksTitleRef}
                           onChange={this.editTitleField}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }

}

export default TodoListHeader;
