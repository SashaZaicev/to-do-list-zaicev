import React from 'react';
import './TodoListHeader.module.css';


class TodoListTitle extends React.Component {
    state = {
        error: false,
        title: '',
    };

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <>
                <h3 className="todoList-header__title">{this.props.title}</h3>
            </>
        );
    }

}

export default TodoListTitle;
