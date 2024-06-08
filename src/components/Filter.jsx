import React, { useState, useEffect, useContext } from "react";
import { Context } from '../App.jsx';
import { reducerActions } from '../useReducer'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function Filter() {
    const { dispatch, episodeData, loadedURL } = useContext(Context);
    const [minSliderValue, setMinSliderValue] = React.useState(1);
    const [maxSliderValue, setMaxSliderValue] = React.useState(1);
    const [numberOfSeasons, setNumberOfSeasons] = React.useState(1);
    const [isTooManyEpisodesLoaded, setIsTooManyEpisodesLoaded] = React.useState(false);

    const episodeLoadWarningThreshold = 50;

    useEffect(function(){
        dispatch({type:reducerActions.updateMinFilter, payload:minSliderValue});
    }, [minSliderValue]);
    useEffect(function(){
        dispatch({type:reducerActions.updateMaxFilter, payload:maxSliderValue});
    }, [maxSliderValue]);

    const getFilteredEpisodes = (min, max) =>{
        return Object.keys(episodeData).filter(key => {
            const episode = episodeData[key];
            return episode.season >= min && episode.season <= max;
        });
    }

    useEffect(() => {   //on new TV show loaded
        if (episodeData) {
            const seasons = Math.max(...Object.values(episodeData).map(episode => episode.season));
            setNumberOfSeasons(seasons);

            setMinSliderValue(1);
            setMaxSliderValue(seasons);

            //find default max slider (prevent loading so many episodes at start so that it impacts performance)
            const filteredEpisodes = getFilteredEpisodes(1, seasons);
            if (filteredEpisodes.length > episodeLoadWarningThreshold) {

                let allowedMaxSliderValue = seasons;
                for (let season = seasons; season >= minSliderValue; season--) {
                    const seasonEpisodes = Object.keys(episodeData).filter(key => {
                        const episode = episodeData[key];
                        return episode.season >= minSliderValue && episode.season <= season;
                    });
                    if (seasonEpisodes.length <= episodeLoadWarningThreshold) {
                        allowedMaxSliderValue = season;
                        break;
                    }
                }

                setMaxSliderValue(allowedMaxSliderValue);
            } else {
                setMaxSliderValue(numberOfSeasons);
            }
        }
    }, [loadedURL]);

    useEffect(() => {   //on slider val change
        if (episodeData) {
            // Filter episodes based on the selected season range
            const filteredEpisodes = getFilteredEpisodes(minSliderValue, maxSliderValue);
            setIsTooManyEpisodesLoaded(filteredEpisodes.length > episodeLoadWarningThreshold);
        }
    }, [minSliderValue, maxSliderValue]);
    
    function valuetext(value) {
        return (!numberOfSeasons) ? "" : (minSliderValue === maxSliderValue) ? `Season ${minSliderValue}` : `Seasons ${minSliderValue} - ${maxSliderValue}`
    }

    const handleChange = (event, newValue) => {
        setMinSliderValue(newValue[0]);
        setMaxSliderValue(newValue[1]);
    };
    return (
        <>
            <Box display='flex' alignItems='center'>
                <Box
                    sx={{
                        width: { sm: '100%', md: 300 },
                        mr: 'auto',
                        mt: { sm: 0, md: '2.25em' },
                    }}
                >
                    <Box
                        style={{
                            color: 'white',
                            margin: '0!important',
                            padding: '0!important',
                            minHeight: '24px',
                        }}
                    >
                        {valuetext()}
                    </Box>

                    <Slider
                        value={[minSliderValue, maxSliderValue]}
                        onChange={handleChange}
                        valueLabelDisplay='auto'
                        getAriaValueText={valuetext}
                        min={1}
                        max={numberOfSeasons ? numberOfSeasons : 1}
                        marks
                        disabled={(numberOfSeasons<2)}
                        sx={{ color: '#d1d1d1' }}
                    />

                </Box>

                {isTooManyEpisodesLoaded && (
                    <Box
                        style={{
                            color: '#ff5865',
                            margin: '0!important',
                            padding: '0!important',
                            minHeight: '24px',
                            marginLeft: '1em',
                            marginRight:'auto'
                        }}
                    >

                        <Typography variant="body3" component="span">
                            <span style={{ fontWeight: 'bold' }}>Warning:</span> Too many episodes may affect performance
                        </Typography>

                    </Box>
                )}
            </Box>
        </>
    );
}


