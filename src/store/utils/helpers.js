export const addListItemInState = (state, listData) => {
    return { 
        ...state,
        listId: state.listId+1,
        lists: [...state.lists, listData]
    }
};

export const deleteListItemFromState = (state, targetListId) => {
    const newLists = state.lists.filter(list => list.listId!==targetListId);
    return {
        ...state,
        lists: newLists
    }
};

export const addCardItemInList = (state, listId, cardData) => {
    const targetList = state.lists.find(list => list.listId===listId);
    const restLists = state.lists.filter(list => list.listId!==listId);
    return {
        ...state,
        cardId: state.cardId+1,
        lists: [...restLists, { ...targetList, cards:[...targetList.cards, cardData] }]
    }
};

export const deleteCardItemFromState = (state, targetListId, targetCardId) => {
    const targetList = state.lists.find(list => list.listId===targetListId);
    const restLists = state.lists.filter(list => list.listId!==targetListId);
    const targetListCards = targetList.cards;
    const newTargetListCards = targetListCards.filter(card => card.cardId!==targetCardId);
    return {
        ...state,
        lists: [...restLists, {...targetList, cards: [...newTargetListCards]}]
    }
};

export const setDndSource = (state, sourceData) => ({
    ...state,
    dnd: {
        ...state.dnd,
        source: {
            listId: sourceData.listId,
            cardId: sourceData.cardId
        }
    }
});

export const setDndTarget = (state, targetData) => ({
    ...state,
    dnd: {
        ...state.dnd,
        target: {
            listId: targetData.listId,
            placeAboveCardWithId: targetData.placeAboveCardWithId
        }
    }
});

export const performDnd = state => {
    const dndSource = state.dnd.source;
    const dndTarget = state.dnd.target;

    let sourceList = state.lists.find(list => list.listId === dndSource.listId);
    let targetList = state.lists.find(list => list.listId === dndTarget.listId);
    const remainingLists = state.lists.filter(list => (list.listId!==dndSource.listId && list.listId!==dndTarget.listId));

    // Getting source card data and removing that card data from source list
    let sourceCard;
    sourceList.cards = sourceList.cards.filter(card => {
        if(card.cardId === dndSource.cardId) {
            sourceCard = card;
            return false;
        }
        return true;
    })

    // Adding the sourceCard in target list in desired place
    let pos=targetList.cards.length;
    for(let i=0; i<targetList.cards.length; i++) {
        if(targetList.cards[i].cardId === dndTarget.placeAboveCardWithId) {
            pos=i;
            break;
        }
    }
    targetList.cards.splice(pos, 0, sourceCard);
    targetList.cards = targetList.cards.slice();

    sourceList = [sourceList];
    targetList = [targetList];
    
    if(targetList[0].listId===sourceList[0].listId) {
        sourceList=[];
    }

    return {
        ...state,
        lists: [...remainingLists, ...sourceList, ...targetList]
    }
}