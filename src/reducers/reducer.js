import React from 'react';

const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
const UPDATE_TODOLIST_TITLE = "TodoList/Reducer/UPDATE_TODOLIST_TITLE";
const ADD_TASK = "TodoList/Reducer/ADD-TASK";
const SET_TASKS = "TodoList/Reducer/SET_TASKS";
const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";

const initialState = {
    "todolists": [],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            }
        case UPDATE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id != action.todolistId) return tl;
                    else return {...tl, title: action.title}
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id != action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            }
    }
    console.log('reducer: ', action);
    return state;
}

export const addTodolistAC = (newTodoList) => {
    return {type: ADD_TODOLIST, newTodoList};
}
export const deleteTodolistAC = (todoListId) => {
    return {type: DELETE_TODOLIST, todoListId};
}
export const setTodolistsAC = (todolists) => {
    return {type: SET_TODOLISTS, todolists};
}
export const updateTodolistTitleAC = (todolistId, title) => {
    return {type: UPDATE_TODOLIST_TITLE, todolistId, title};
}
export const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId};
}
export const updateTaskAC = (taskId, obj, todolistId) => {
    return {type: UPDATE_TASK, taskId, obj, todolistId};
}
export const deleteTaskAC = (taskId, todolistId) => {
    return {type: DELETE_TASK, taskId, todolistId};
}
export const setTasksAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
}
export default reducer;