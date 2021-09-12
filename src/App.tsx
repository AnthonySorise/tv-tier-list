import {useEffect, useReducer, createContext} from 'react';
import reducer from './useReducer'
import useAPI from './useAPI';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TierList from './components/TierList'

export const Context = createContext<any>(null);
function App() {
    const initialState = {
        selectedShowID: 551,//-1,
        tierOrder:[] as number[][]
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { episodeData, isEpisodeDataLoaded } = useAPI('https://api.tvmaze.com/shows/' + state.selectedShowID + '/episodes');

    useEffect(function(){
        if(isEpisodeDataLoaded && episodeData){
            let initialHoldingOrder = [];
            for(var i = 0; i < episodeData?.length; i++){
                initialHoldingOrder.push(i);
            }
            dispatch({type:"updateTierOrder", payload: [[], [], [] ,[], [], initialHoldingOrder]});
        }
    }, [isEpisodeDataLoaded])   

    return (
        <Context.Provider value={{dispatch, state, episodeData, isEpisodeDataLoaded}}>
            <Container fixed maxWidth={"xl"}>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', textAlign: 'center' }}>
                    <div className="header">
                        TV Tier List
                    </div>
                    <TierList />
                </Typography>
            </Container>
        </Context.Provider>
    );
}

export default App;
