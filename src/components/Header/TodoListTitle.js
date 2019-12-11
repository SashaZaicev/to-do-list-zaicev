import React from 'react';
import s from './TodoListHeader.module.css';
import im from '../../img/deleteButton.png'


class TodoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title
    }

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateTitle(this.state.title);
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    }

    render = () => {
        return (
                <div className={'displayFlex'}>
                    {
                        this.state.editMode
                            ? <input value={this.state.title} autoFocus={true} onBlur={this.deactivateEditMode}
                                     onChange={this.onTitleChanged}/>
                            : <h3 className={s.title} onClick={this.activateEditMode}>{this.props.title}

                            </h3>
                    }
                    <img src={im} className={s.xButton} onClick={this.props.onDelete}/>
                    {/*// <span className={s.xButton}>*/}
                    {/*//      <button onClick={this.props.onDelete}>X</button></span>}*/}
                </div>
        );
    }
}

export default TodoListTitle;
