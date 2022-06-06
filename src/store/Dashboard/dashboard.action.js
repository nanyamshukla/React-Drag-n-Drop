import { DASHBOARD_ACTION_TYPES } from './dashboard.types';
import { createAction } from '../utils/createAction';

export const addList = (itemData) => createAction(DASHBOARD_ACTION_TYPES.ADD_LIST_ITEM, itemData);
export const deleteList = (itemKey) => createAction(DASHBOARD_ACTION_TYPES.DELETE_LIST_ITEM, itemKey);

export const addCard = (itemData) => createAction(DASHBOARD_ACTION_TYPES.ADD_CARD_ITEM, itemData);
export const deleteCard = (itemKey) => createAction(DASHBOARD_ACTION_TYPES.DELETE_CARD_ITEM, itemKey);

export const setDndSource = (sourceData) => createAction(DASHBOARD_ACTION_TYPES.SET_DND_SORCE, sourceData);
export const setDndTarget = (targetData) => createAction(DASHBOARD_ACTION_TYPES.SET_DND_TARGET, targetData);
export const performDnd = () => createAction(DASHBOARD_ACTION_TYPES.PERFORM_DND);