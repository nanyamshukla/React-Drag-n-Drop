import { useSelector } from 'react-redux';
import './ListContainer.scss';

import { selectLists } from '../../store/Dashboard/dashboard.selectors';

import List from '../List/List';
import AddListForm from '../AddListForm/AddListForm';

const ListContainer = () => {
    const lists = useSelector(selectLists);                     // Getting lists data from redux state
    lists.sort((a,b) => a.listId - b.listId);                   // Sorting list data to show as per insertion sequence

    return(
        <div className='listContainer' >
            {
                lists.map(list => 
                    <List 
                        title={ list.title }
                        listId={ list.listId }
                        key={ list.listId }
                    />    
                )
            }
            <AddListForm />
        </div>
    );
}

export default ListContainer;