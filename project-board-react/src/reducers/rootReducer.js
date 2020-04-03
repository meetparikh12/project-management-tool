import {combineReducers} from 'redux';
import addProjectTask from './addProjectTask';
import { errorReducer } from './errorReducer';
const rootReducer = combineReducers({
    addProjectTaskReducer : addProjectTask,
    getErrorReducer: errorReducer
})
export default rootReducer;