import { createSelector } from "reselect";

export const selectNewListId = state => state.dashboard.listId;
export const selectLists = state => state.dashboard.lists;

export const selectNewCardId = state => state.dashboard.cardId;
export const selectCardItems = createSelector(
    [
        selectLists,
        (state, listId) => listId
    ],
    (lists, targetListId) => {
        const targetList = lists.find(list => list.listId===targetListId);
        return targetList?.cards || [];
    }
);

export const selectDnd = state => state.dashboard.dnd;

export const selectDndSourceData = createSelector(
    selectDnd,
    (dnd) => dnd.source
);

export const selectDndTargetData = createSelector(
    selectDnd,
    (dnd) => dnd.target
);

export const selectDndTargetListId = createSelector(
    [
        selectDndTargetData
    ],
    target => target.listId
);
