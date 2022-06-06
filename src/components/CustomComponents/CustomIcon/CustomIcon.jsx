import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CustomIcon.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas);

// A custom icon component which can be used to show font-awesome icons just by passing the icon string and required styling as props
// For example, the icon fa-xmark can be added by passing `x-mark` as the prop value 

const CustomIcon = (props) => {
    const { icon, classProp, onClick } = props;

    return(
        <FontAwesomeIcon 
            icon={ `fa-solid fa-${icon}` } 
            className={ classNames('customIcon', classProp) } 
            onClick={ onClick }
        />
    );
}

CustomIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    classProp: PropTypes.string,
    onClick: PropTypes.func
}

CustomIcon.defaultProps = {
    icon: 'xmark',
    classProp: ''
}

export default React.memo(CustomIcon);