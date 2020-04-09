import {combineReducers} from 'redux';
import { errorReducer } from './errorReducer';
import projectTaskReducer from './projectTaskReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
    getProjectTaskReducer : projectTaskReducer,
    getErrorReducer: errorReducer,
    getProjectReducer: projectReducer
})
export default rootReducer;