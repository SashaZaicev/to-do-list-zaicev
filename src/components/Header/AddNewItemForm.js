import React from 'react';
import './TodoListHeader.module.css';


class AddNewItemForm extends React.Component {
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
    onAddItemClick = () => {

        let newText = this.state.title;
        this.state.title = "";
        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newText)
        }

    };
    onButtonPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick()
        }
    }


    render = () => {
        let classErrorBorder = this.state.error === true ? "error" : " ";
        return (
            <>
                <div className="todoList-newTaskForm">
                    <input className={classErrorBorder}
                           onKeyPress={this.onButtonPress}
                           type="text"
                           placeholder="New item name"
                           onChange={this.editTitleField}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
            </>
        );
    }

}

export default AddNewItemForm;
