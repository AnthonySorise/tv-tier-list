import React, { useEffect, useContext } from "react";
import { Context } from '../App.jsx';
import { reducerActions } from '../useReducer'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



export default function Filter() {
    const { dispatch, numberOfSeasons } = useContext(Context);
    const [sliderValues, setSliderValues] = React.useState([1, numberOfSeasons]);

    useEffect(function(){
        let minVal = Math.min.apply(Math, sliderValues);
        let maxVal = Math.max.apply(Math, sliderValues);
        dispatch({type:reducerActions.updateMinFilter, payload:minVal});
        dispatch({type:reducerActions.updateMaxFilter, payload:maxVal});
    }, [sliderValues]);

    useEffect(function(){
        setSliderValues([1, numberOfSeasons]);
    }, [numberOfSeasons]);

    function valuetext(value) {
        let minVal = Math.min.apply(Math, sliderValues);
        let maxVal = Math.max.apply(Math, sliderValues);
        return (!numberOfSeasons) ? "" : (minVal === maxVal) ? `Season ${minVal}` : `Seasons ${minVal} - ${maxVal}`
    }

    const handleChange = (event, newValue) => {
        setSliderValues(newValue);
    };
    return (
        <Box sx={{ width:{sm:'100%', md:300}, mr:'auto', mt:{sm:0, md:'2.25em'} }}>
            <Box style={{color:"white", margin:'0!important', padding:'0!important', minHeight:'24px'}}>{valuetext()}</Box>
            <Slider
                value={sliderValues}
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


