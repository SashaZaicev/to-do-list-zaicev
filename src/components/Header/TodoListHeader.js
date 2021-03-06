import React from 'react';
import './TodoListHeader.module.css';


class TodoListHeader extends React.Component {
    state = {
        error: false,
        title: '',
    };

    constructor(props) {
        super(props);
    }

    editTitleField = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }
    onAddTaskClick = () => {

        let newText = this.state.title;
        this.state.title = "";
        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addTask(newText)
        }

    };
    onButtonPress = (e) => {
        if (e.key === "Enter") {
            this.onAddTaskClick()
        }
    }

    render = () => {
        let classErrorBorder = this.state.error === true ? "error" : " ";
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title"> What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input className={classErrorBorder}
                           onKeyPress={this.onButtonPress}
                           type="text"
                           placeholder="New task name"
                           onChange={this.editTitleField}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }

}

export default TodoListHeader;
