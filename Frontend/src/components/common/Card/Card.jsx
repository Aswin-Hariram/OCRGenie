import { Card as MuiCard, CardContent, CardHeader, CardActions } from '@mui/material';
import PropTypes from 'prop-types';

const Card = ({ 
    children, 
    title, 
    subtitle, 
    actions,
    elevation = 0,
    ...props 
}) => {
    return (
        <MuiCard 
            elevation={elevation}
            {...props}
            sx={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                },
                ...props.sx
            }}
        >
            {title && (
                <CardHeader 
                    title={title}
                    subtitle={subtitle}
                    sx={{
                        '& .MuiCardHeader-title': {
                            fontSize: '1.25rem',
                            fontWeight: 600,
                        },
                        '& .MuiCardHeader-subtitle': {
                            color: 'text.secondary',
                        }
                    }}
                />
            )}
            <CardContent>{children}</CardContent>
            {actions && <CardActions>{actions}</CardActions>}
        </MuiCard>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.node,
    elevation: PropTypes.number,
};

export default Card; 