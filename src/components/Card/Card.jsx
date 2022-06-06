import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Card.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCard, setDndSource, setDndTarget } from '../../store/Dashboard/dashboard.action';
import { selectDndTargetData } from '../../store/Dashboard/dashboard.selectors';
import Header from '../Header/Header';
import CustomIcon from '../CustomComponents/CustomIcon/CustomIcon';

const Card = (props) => {
    const { title, text, cardId, parentListId, showCloseButton } = props;

    // Defining local state variables using useState hook
    const [ isCardDragging, setIsCardDragging ] = useState(false);
    const [ isCardDraggedOver, setIsCardDraggedOver ] = useState(false);
    
    // Getting desired data from selectors
    const dndTarget = useSelector(selectDndTargetData);             // selecting drag and drop target data(target list id and target card id above which the dropped card should be placed)
    
    const dispatch = useDispatch();

    // Function to remove card from its parent list
    const removeCardItem = useCallback(() => {
        dispatch(deleteCard({
            listId: parentListId, 
            cardId
        }));
    }, [parentListId, cardId, dispatch]);

    // Function to set this card as the DnD source card if it has begun to be dragged by the user
    const handleOnDragStart = useCallback(() => {
        dispatch(setDndSource({
            listId: parentListId,
            cardId
        }));

        // Removing the dragged card from ui 
        setTimeout(() => {
            setIsCardDragging(true);
        }, 0);
    }, [parentListId, cardId, dispatch]);

    // Function to reset the styles if the drag event has ended without successful drop
    const handleOnDragEnd = useCallback(() => {
        setIsCardDragging(false);
        setIsCardDraggedOver(false);
        dispatch(setDndSource({
            listId: null,
            cardId: null
        }));
    }, [dispatch]);

    // Function to set this card as the card above which the dragged card has to be placed in dnd target object if it is being dragged over
    const handleOnDragOver = e => {
        e.preventDefault();
        setIsCardDraggedOver(true);
        if(dndTarget.listId!==parentListId || dndTarget.placeAboveCardWithId!==cardId) {
            dispatch(setDndTarget({
                listId: parentListId,
                placeAboveCardWithId: cardId
            }));
        }
    }   

    // Function to remove this card from the DnD target object if the dragged card has left this card's area
    const handleOnDragLeave = useCallback(e => {
        setIsCardDraggedOver(false);
        e.preventDefault();
    }, [setIsCardDraggedOver]);

    // Function to reset style classes if a card has been dropped successfully in the list
    const handleOnDropCapture = useCallback(e => {
        e.preventDefault();
        setIsCardDragging(false);
        setIsCardDraggedOver(false);
    }, [setIsCardDraggedOver, setIsCardDragging]);

    return(
        <div
            onDragLeave={ handleOnDragLeave }
            onDragEnd={ handleOnDragEnd }
            onDragOver={ handleOnDragOver }
            onDrop={ handleOnDropCapture }
            className={ classNames('cardItemContainer', {'cardDragging': isCardDragging}, {'cardDraggedOver': isCardDraggedOver}) }
        >
            <div 
                draggable 
                onDragStart={ handleOnDragStart }
                className={ classNames('cardItem') }  
            >
                <Header title={ title } classProp='cardItemHeader' >
                    { showCloseButton && <CustomIcon icon='xmark' classProp='cardItemCloseIcon' onClick={ removeCardItem } /> }
                </Header>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cardId: PropTypes.number,
    parentListId: PropTypes.number,
    showCloseButton: PropTypes.bool
}

Card.defaultProps = {
    title: '',
    text: '',
    cardId: 0,
    parentListId: 0,
    showCloseButton: true
}

export default React.memo(Card);