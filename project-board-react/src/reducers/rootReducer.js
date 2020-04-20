import {combineReducers} from 'redux';
import { errorReducer } from './errorReducer';
import projectReducer from './projectReducer';
import backlogReducer from './backlogReducer';

const rootReducer = combineReducers({
    getBacklogReducer : backlogReducer,
    getErrorReducer: errorReducer,
    getProjectReducer: projectReducer
})
export default rootReducer;