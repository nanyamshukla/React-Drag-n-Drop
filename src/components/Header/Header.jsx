import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Header.scss';

const Header = (props) => {
    const { title, classProp, children} = props;

    return(
        <header className={classNames('pageHeader', classProp)} >
            { title }
            { children }
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    classProp: PropTypes.string
}

Header.defaultProps = {
    title: '',
    classProp: ''
}

export default React.memo(Header);


