import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddListForm.scss';

import { addList } from '../../store/Dashboard/dashboard.action';
import { selectNewListId } from '../../store/Dashboard/dashboard.selectors';

import CustomInput from '../CustomComponents/CustomInput/CustomInput';
import CustomButton from '../CustomComponents/CustomButton/CustomButton';

const AddListForm = () => {
    // // Defining local state variables using useState hook
    const [listTitle, setListTitle] = useState('');
    const dispatch = useDispatch();

    // Getting desired data from selectors
    const newListItemId = useSelector(selectNewListId);                 // Selecting id to be assigned to the new list created

    // Function handling form submission to add new list in the dashboard
    const handleSubmit = e => {
        e.preventDefault();

        // Only adding new list if a list title is provided
        if(listTitle!=='') {
            const listItem = {
                listId: newListItemId,
                title: listTitle,
                cards: []
            }
            setListTitle('');
            dispatch(addList(listItem));
        }
    }

    return(
        <div className='addListFormContainer'>
            <form
                onSubmit={ handleSubmit }
                className='addListForm'
            >
                <CustomInput 
                    type='text' 
                    classProp='addListFormInput' 
                    placeholder='Enter list title...' 
                    onChange={ (e) => setListTitle(e.target.value) }
                    inputValue={ listTitle }
                />
                <CustomButton 
                    type='submit'
                    text='Add list'
                />
            </form>
        </div>
    )
}

export default AddListForm;