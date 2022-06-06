import PropTypes from 'prop-types'
import './Dashboard.scss';

import Header from '../Header/Header';
import ListContainer from '../ListContainer/ListContainer';

const Dashboard = (props) => {
    const { title } = props;

    return(
        <div className='dashboardContainer'>
            <Header title={title} classProp='sectionHeader' />
            <ListContainer />
        </div>
    );
}

Dashboard.propTypes = {
    title: PropTypes.string
}

Dashboard.defaultProps = {
    title: 'Dashboard'
}

export default Dashboard;