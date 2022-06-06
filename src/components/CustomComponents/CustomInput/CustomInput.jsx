import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CustomInput.scss';

const CustomInput = (props) => {
    const { type, classProp, placeholder, onChange, inputValue } = props;

    return(
        <input 
            type={ type } 
            className={ classNames('customInput', classProp) } 
            placeholder={ placeholder } 
            onChange={ onChange }
            value={ inputValue }
        />
    )
}

CustomInput.propTypes = {
    type: PropTypes.string,
    classProp: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string
}

CustomInput.defaultProps = {
    type: 'text',
    classProp: '',
    placeholder: 'Enter text...',
    onChange: () => null,
    inputValue: ''
}

export default React.memo(CustomInput);