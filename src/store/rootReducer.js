import { combineReducers } from 'redux';
import { dashboardReducer } from './Dashboard/dashboard.reducer';

export const rootReducer = combineReducers({
    dashboard: dashboardReducer
});