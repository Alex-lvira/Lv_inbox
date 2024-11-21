import './css/App.css';
import { Welcome } from './components/Welcome';
import { Layout } from './components/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import './css/index.css';

function App() {
    return (
        <>
            <div className="gradient-background" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Layout>
                    <Welcome />
                </Layout>
            </LocalizationProvider>
        </>
    );
}

export default App;
