import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { TranslationProvider } from './store/TranslationContext';
import { theme } from './config/theme';
import AppRoutes from './routes';
import Navbar from './components/layout/Navbar/Navbar';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <TranslationProvider>
                <Router>
                    <Navbar />
                    <AppRoutes />
                </Router>
            </TranslationProvider>
        </ThemeProvider>
    );
}

export default App;