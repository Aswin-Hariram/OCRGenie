import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const Input = ({ 
    label, 
    error, 
    helperText, 
    fullWidth = true,
    ...props 
}) => {
    return (
        <TextField
            label={label}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                        borderColor: 'primary.main',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: 'primary.main',
                    },
                },
                ...props.sx
            }}
        />
    );
};

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    fullWidth: PropTypes.bool,
};

export default Input; 