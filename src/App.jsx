import React, { useState, useEffect, useReducer, createContext } from "react";
import { reducer } from './useReducer'
import { reducerActions } from './useReducer'
import useAPI from './useAPI';
import tiers from './models/tiers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Search from './components/Search'
import Filter from './components/Filter'
import TierList from './components/TierList'
import { isTouchDevice } from "./utils/device";
import Grid from '@mui/material/Grid';
import './App.css';


export const Context = createContext([]);
function App() {
    const initialState = {
        selectedShowID: -1,
        tierOrder: {},
        itemBeingDragged: null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { episodeData, numberOfSeasons, isEpisodeDataLoaded } =  useAPI('https://api.tvmaze.com/shows/' + state.selectedShowID + '/episodes');

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

    // useEffect(function () {
    //     //mobile UX
    //     if(isTouchDevice()){
    //         if(state.itemBeingDragged){
    //             window.scroll({
    //                 top: 0, 
    //                 left: 0, 
    //                 behavior: 'smooth' 
    //             });
    //             document.body.style.overflow = 'hidden';
    //         }
    //         else{
    //             document.body.style.overflow = 'auto';
    //         }
    //     }
    // }, [state.itemBeingDragged])

    const theme = createTheme({
        palette: {
            mode: 'dark',
        }
    });

    return (
        <Context.Provider value={{ dispatch, state, episodeData, numberOfSeasons, isEpisodeDataLoaded }}>
            <ThemeProvider theme={theme}>

            <div style={{cursor:(state.itemBeingDragged)?'grabbing':''}}>
                <Container maxWidth="xl">
                    <Typography component="div" style={{ backgroundColor: '#121212', textAlign: 'center', minHeight: '100vh' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Search />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Filter />
                            </Grid>
                        </Grid>
                        
                        <TierList />

                    </Typography>
                </Container>
            </div>
            </ThemeProvider>
        </Context.Provider>
    );
}

export default App;
