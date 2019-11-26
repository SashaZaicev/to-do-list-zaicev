import React from 'react';
import "./TodoListTasks.module.css"
import TodoListTask from "./Task/TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map(task =>
            <TodoListTask key={this.props.id}
                          task={task}
                          changeStatus={this.props.changeStatus}
                          changeTitle={this.props.changeTitle}
            />,)
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }

}

export default TodoListTasks;
