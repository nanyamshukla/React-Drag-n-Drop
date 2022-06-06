import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CustomButton.scss';

const CustomButton = (props) => {
    const { type, text, classProp } = props;
    return (
        <button 
            type={type}
            className={classNames('customButton', classProp)}
        >
            {text}
        </button>
    );
}

CustomButton.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    classProp: PropTypes.string
}

CustomButton.defaultProps = {
    type: 'button',
    text: 'Click',
    classProp: ''
}


export default CustomButton;