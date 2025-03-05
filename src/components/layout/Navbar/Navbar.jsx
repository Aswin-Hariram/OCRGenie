import { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    IconButton, 
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { GiMagicLamp } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Tutorials', path: '#tutorials' },
        { text: 'Contact', path: '/contact' },
    ];

    const drawer = (
        <Box sx={{ 
            width: 250, 
            background: theme.palette.background.paper,
            height: '100%',
            padding: 2
        }}>
            <List>
                {menuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.text}
                        component={Link}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                    >
                        <ListItemText 
                            primary={item.text}
                            sx={{ 
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <GiMagicLamp className="text-yellow-400 text-4xl mr-2" />
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #7C3AED 30%, #A78BFA 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        OCRGenie
                    </Typography>
                </Box>

                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMobileOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={mobileOpen}
                            onClose={() => setMobileOpen(false)}
                        >
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                component={Link}
                                to={item.path}
                                color="inherit"
                                sx={{
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                    }
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 