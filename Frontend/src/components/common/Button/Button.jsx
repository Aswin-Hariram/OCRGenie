import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

const Button = ({ 
    children, 
    variant = 'contained', 
    color = 'primary', 
    onClick, 
    disabled = false,
    startIcon,
    endIcon,
    fullWidth = false,
    ...props 
}) => {
    return (
        <MuiButton
            variant={variant}
            color={color}
            onClick={onClick}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
    color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    fullWidth: PropTypes.bool,
};

export default Button;