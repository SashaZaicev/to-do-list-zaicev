import React from 'react';
import "./TodoListTasks.module.css"
import TodoListTask from "./Task/TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map(task => <TodoListTask priority={task.priority}
                                                                       title={task.title}
                                                                       isDone={task.isDone}
        />,)
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }

}

export default TodoListTasks;
