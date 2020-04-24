import {combineReducers} from 'redux';
import { errorReducer } from './errorReducer';
import projectReducer from './projectReducer';
import backlogReducer from './backlogReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    getBacklogReducer : backlogReducer,
    getErrorReducer: errorReducer,
    getProjectReducer: projectReducer,
    user: userReducer
})
export default rootReducer;