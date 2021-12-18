import {createContext, useReducer} from "react";

export const TasksContext = createContext([])

const initialState = {
    tasks: [],
    makers: [],
    isNewTaskPopup: false,
    searchQuery: '',
    sortParams: {
        key: 'state',
        order: 1
    }
};

const reducer = (state, {type, payload}) => {
    try {
        switch (type) {
            case "updateTaskList":
                return {...state, tasks: payload}

            case "addTask":
                return {...state, tasks: [...state.tasks, payload]}

            case "updateTask":
                const index = state.tasks.findIndex(payload.id)
                const updatedTaskList = state.tasks.splice(index, 1)
                updatedTaskList.push(payload)
                return {...state, tasks: updatedTaskList}

            case "updateMakers":
                return {...state, makers: payload}

            case "addToSearchParams":
                return {...state, searchQuery: payload}

            case "changeNewTaskPopup":
                return {...state, isNewTaskPopup: !state.isNewTaskPopup}
            default:
                return new Error(`Invalid action: ${{type, payload}}`)
        }
    } catch (error) {
        console.error(error)
    }
}

const TasksProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <TasksContext.Provider value={[state, dispatch]}>{children}</TasksContext.Provider>
    )
}

export default TasksProvider