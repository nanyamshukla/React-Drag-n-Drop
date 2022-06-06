import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './AddCardForm.scss';

import { selectNewCardId } from '../../store/Dashboard/dashboard.selectors';
import { addCard } from '../../store/Dashboard/dashboard.action';

import CustomInput from '../CustomComponents/CustomInput/CustomInput';
import CustomButton from '../CustomComponents/CustomButton/CustomButton';

const AddCardForm = (props) => {
    const { listId } = props;
    // // Defining local state variables using useState hook
    const [cardTitle, setCardTitle] = useState('');
    const [cardText, setCardText] = useState('');
    
    // Getting desired data from selectors
    const cardId = useSelector(selectNewCardId);                // Selecting id to be assigned to the new card created
    const dispatch = useDispatch();


    // FUNCTIONS/METHODS

    // Function to handle form submission to add card in the given list
    const handleSubmit = e => {
        e.preventDefault();
        if(cardTitle!=='' && cardText!=='') {
            const cardItem = {
                listId: listId,
                cardData: {
                    cardId: cardId,
                    title: cardTitle,
                    text: cardText
                }
            }
            setCardTitle('');
            setCardText('');
            dispatch(addCard(cardItem));
        }
    }

    return(
        <div className='addCardFormContainer'>
            <form
                onSubmit={handleSubmit}
                className='addCardForm'
            >
                <CustomInput 
                    type='text' 
                    classProp='addCardTitleFormInput' 
                    placeholder='Enter title...' 
                    onChange={ (e) => setCardTitle(e.target.value) }
                    inputValue={ cardTitle }
                />
                <CustomInput 
                    type='text' 
                    classProp='addCardTextFormInput' 
                    placeholder='Enter the text for this card...' 
                    onChange={ (e) => setCardText(e.target.value) }
                    inputValue={ cardText }
                />
                <CustomButton 
                    type='submit'
                    text='Add card'
                />
            </form>
        </div>
    );
}

export default AddCardForm;