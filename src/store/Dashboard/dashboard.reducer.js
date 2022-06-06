import { DASHBOARD_ACTION_TYPES } from './dashboard.types';
import { 
    addListItemInState, 
    deleteListItemFromState, 
    addCardItemInList, 
    deleteCardItemFromState,
    setDndSource,
    setDndTarget,
    performDnd
} from '../utils/helpers';

const INITIAL_STATE = {
    listId: 1,
    cardId: 1,
    lists: [],

    dnd: {
        source: {
            listId: null,
            cardId:null
        },
        target: {
            listId: null,
            placeAboveCardWithId: null
        }
    }
}

export const dashboardReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        case DASHBOARD_ACTION_TYPES.ADD_LIST_ITEM : {
            const newState = addListItemInState(state, payload);
            return {...newState};
        }

        case DASHBOARD_ACTION_TYPES.DELETE_LIST_ITEM : {
            const newState = deleteListItemFromState(state, payload);
            return newState;
        }

        case DASHBOARD_ACTION_TYPES.ADD_CARD_ITEM : {
            const newState = addCardItemInList(state, payload.listId, payload.cardData);
            return newState;
        }

        case DASHBOARD_ACTION_TYPES.DELETE_CARD_ITEM : {
            const newState = deleteCardItemFromState(state, payload.listId, payload.cardId);
            return newState;
        }

        case DASHBOARD_ACTION_TYPES.SET_DND_SORCE : {
            const newState = setDndSource(state, payload);
            return newState;
        }

        case DASHBOARD_ACTION_TYPES.SET_DND_TARGET : {
            const newState = setDndTarget(state, payload);
            return newState;
        }

        case DASHBOARD_ACTION_TYPES.PERFORM_DND : {
            const newState = performDnd(state);
            return newState;
        }

        default: 
            return state;
    }
};