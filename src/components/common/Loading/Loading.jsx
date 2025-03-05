import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Loading = ({ message = 'Loading...' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                gap: 2,
            }}
        >
            <CircularProgress 
                size={40}
                sx={{
                    color: 'primary.main',
                }}
            />
            <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                {message}
            </Typography>
        </Box>
    );
};

Loading.propTypes = {
    message: PropTypes.string,
};

export default Loading; 