import {combineReducers} from 'redux';
import { errorReducer } from './errorReducer';
import projectTaskReducer from './projectTaskReducer';

const rootReducer = combineReducers({
    getProjectTaskReducer : projectTaskReducer,
    getErrorReducer: errorReducer
})
export default rootReducer;