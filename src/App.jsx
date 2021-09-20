import React, { useState, useEffect, useReducer, createContext } from "react";
import { reducer } from './useReducer'
import { reducerActions } from './useReducer'
import useAPI from './useAPI';
import tiers from './models/tiers';
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Search from './components/Search'
import TierList from './components/TierList'
import './App.css';


export const Context = createContext([]);
function App() {
    const initialState = {
        selectedShowID: -1,
        tierOrder: {},
        itemBeingDragged: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { episodeData, isEpisodeDataLoaded } =  useAPI('https://api.tvmaze.com/shows/' + state.selectedShowID + '/episodes');

    useEffect(function () {
        if (isEpisodeDataLoaded && episodeData) {
            let initialTierOrder = {};
            for (let i = 0; i < tiers.length; i++) {
                initialTierOrder[tiers[i].label] = [];
            }

            let initialHoldingOrder = Object.keys(episodeData);
            initialTierOrder["holding"] = initialHoldingOrder;



            dispatch({ type: reducerActions.updateTierOrder, payload: initialTierOrder });
        }
    }, [isEpisodeDataLoaded, episodeData])

    return (
        <Context.Provider value={{ dispatch, state, episodeData, isEpisodeDataLoaded }}>
            <Container maxWidth="xl">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', textAlign: 'center', minHeight: '100vh', cursor:(state.itemBeingDragged)?'grabbing':"" }}>

                    <div className="header">
                        TV Tier List
                    </div>

                    <Search />
                    <TierList />

                </Typography>
            </Container>
        </Context.Provider>
    );
}

export default App;
