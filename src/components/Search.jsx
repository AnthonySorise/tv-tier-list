import React, { useState, useReducer, useContext } from "react";
import {Context} from '../App.jsx';
import { reducerActions } from '../useReducer'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { CollectionsBookmarkOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';

export default function Search() {
    const {state, dispatch, episodeData, numberOfSeasons, isEpisodeDataLoaded} = useContext(Context);

    const [inputValue, setInputValue] = React.useState("");
    const [lastQuery, setLastQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [lastOptions, setLastOptions] = React.useState([]);
    const loading = (open && options.length === 0 && inputValue.length != 0);
    
    React.useEffect(() => {
        setOptions([])
    }, [inputValue]);

    React.useEffect(() => {
        let active = true;

        if (!loading || !inputValue || inputValue == lastQuery) {
            return undefined;
        }

        setLastQuery(inputValue);
        (async () => {
            fetch("https://api.tvmaze.com/search/shows?q=" + inputValue)
            .then(resp => resp.json())
            .then((data)=>{
                let options = [];
                for(let i = 0; i < data.length; i++){
                    let title = data[i].show.name;
                    let premierDate = new Date(data[i].show.premiered)
                    let year = premierDate.getUTCFullYear();
                    let id = data[i].show.id;

                    options.push({title:title, year:year, id:id})
                }

                if (active) {
                    if(options.length){
                        setOptions(options);
                        setLastOptions(options);
                    }
                    else{
                        setOptions(lastOptions)
                    }
                }

            }).catch(e => {
                console.log("error: ", e);
            });
        })();

        return () => {
            active = false;
        };
    }, [loading, inputValue]);

    return (
        <Autocomplete
            id="tvShowSearch"
            sx={{ ml:'auto', mt:'2em', width:{sm:'100%', md:300} }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event, value) => {
                if(value && state.selectedShowID != value.id){
                    dispatch({type:reducerActions.updateSelectedShowID , payload:value.id})
                }  
            }}
            filterOptions={(options, state) => {return options}}
            onInputChange={(event, val)=>{setInputValue(val)}}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.title + " (" + option.year + ")"}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search TV Shows"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Box component="div"  
                {...props} 
                >
                   
                    {option.title + " (" + option.year + ")"}

                </Box>
            )}


        />
    );
}