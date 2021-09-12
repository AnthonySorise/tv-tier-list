import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TierList from './components/TierList'

function App() {
    return (

        <Container fixed>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', textAlign: 'center' }}>
                <div className="header">
                    TV Tier List
                </div>
                <TierList />

            </Typography>

        </Container>
        
        


    );
}

export default App;
