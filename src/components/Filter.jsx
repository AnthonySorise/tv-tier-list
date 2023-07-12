import React, { useEffect, useContext } from "react";
import { Context } from '../App.jsx';
import { reducerActions } from '../useReducer'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



export default function Filter() {
    const { dispatch, numberOfSeasons } = useContext(Context);
    const [minSliderValue, setMinSliderValue] = React.useState(1);
    const [maxSliderValue, setMaxSliderValue] = React.useState(numberOfSeasons);

    useEffect(function(){
        dispatch({type:reducerActions.updateMinFilter, payload:minSliderValue});
    }, [minSliderValue]);
    useEffect(function(){
        dispatch({type:reducerActions.updateMaxFilter, payload:maxSliderValue});
    }, [maxSliderValue]);
    useEffect(function(){
        setMaxSliderValue(numberOfSeasons);
    }, [numberOfSeasons]);

    function valuetext(value) {
        return (!numberOfSeasons) ? "" : (minSliderValue === maxSliderValue) ? `Season ${minSliderValue}` : `Seasons ${minSliderValue} - ${maxSliderValue}`
    }

    const handleChange = (event, newValue) => {
        setMinSliderValue(newValue[0]);
        setMaxSliderValue(newValue[1]);
    };
    return (
        <Box sx={{ width:{sm:'100%', md:300}, mr:'auto', mt:{sm:0, md:'2.25em'} }}>
            <Box style={{color:"white", margin:'0!important', padding:'0!important', minHeight:'24px'}}>{valuetext()}</Box>
            <Slider
                value={[minSliderValue, maxSliderValue]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={1}
                max={numberOfSeasons ? numberOfSeasons : 1}
                marks
                disabled={!numberOfSeasons}
                sx={{color:'#d1d1d1'}}
            />
        </Box>
    );
}


