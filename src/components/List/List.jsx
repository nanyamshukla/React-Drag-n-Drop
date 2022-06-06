import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import './List.scss';

import { deleteList, setDndTarget, performDnd } from '../../store/Dashboard/dashboard.action';
import { selectCardItems, selectDndTargetListId } from '../../store/Dashboard/dashboard.selectors';
import Header from '../Header/Header';
import CustomIcon from '../CustomComponents/CustomIcon/CustomIcon';
import Card from '../Card/Card';
import AddCardForm from '../AddCardForm/AddCardForm';

const List = (props) => {
    const { title, listId, showCloseButton, showAddCardForm } = props;
    
    // Defining local state variables using useState hook
    const [ dragEnterCounter, setDragEnterCounter ] = useState(0);

    // Getting desired data from selectors
    const cards = useSelector(state => selectCardItems(state, listId));         // selecting data of cards present in this list
    const dndTargetListId = useSelector(selectDndTargetListId);                 // getting the list id of drag and drop target list 
    const dispatch = useDispatch();


    // FUNCTIONS/METHODS

    // Function to remove this list from dashboard
    const removeListItem = useCallback(() => {
        dispatch(deleteList(listId));
    }, [listId, dispatch]);

    // Function to store this list as target list id for drag and drop if the dragged card enters the list area
    const handleOnDragEnter = useCallback(e => {
        e.preventDefault();
        if(dndTargetListId !== listId) {
            dispatch(setDndTarget({
                listId: listId,
                placeAboveCardWithId: null
            }));
        }
        setDragEnterCounter(dragEnterCounter+1);
    }, [dndTargetListId, listId, dispatch, dragEnterCounter]);

    // Function to set target list id for DnD as null if the dragged card leaves the list area
    const handleOnDragLeave = useCallback(e => {
        e.preventDefault();
        if(dragEnterCounter-1 === 0) {
            dispatch(setDndTarget({
                listId: null,
                placeAboveCardWithId: null
            }));
        }
        setDragEnterCounter(dragEnterCounter-1);
    }, [dragEnterCounter, dispatch]);

    // Function to add the dragged card in this list and remove from its origin/source list, if it is dropped inside this list's area 
    const handleOnDrop = useCallback(() => {
        dispatch(performDnd());
    },[dispatch]);

    return(
        <div 
            className='listItemContainer' 
            onDragEnter={ handleOnDragEnter } 
            onDragOver={ e => e.preventDefault() }
            onDragLeave={ handleOnDragLeave }
            onDropCapture={ handleOnDrop } 
        >
            <Header title={ title } classProp='listItemHeader' >
                { showCloseButton && <CustomIcon icon='xmark' classProp='listItemCloseIcon' onClick={ removeListItem } /> }
            </Header>
            {
                cards.map(cardItem => {
                    return (
                        <Card 
                            title={ cardItem.title }
                            text={ cardItem.text }
                            key={ cardItem.cardId }
                            parentListId={ listId }
                            cardId={ cardItem.cardId }
                        />
                    )
                })
            }
            {showAddCardForm && <AddCardForm listId={listId} />}
        </div>
    );
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    listId: PropTypes.number,
    showCloseButton: PropTypes.bool,
    showAddCardForm: PropTypes.bool
}

List.defaultProps = {
    title: '',
    listId: 0,
    showCloseButton: true,
    showAddCardForm: true
}

export default React.memo(List);