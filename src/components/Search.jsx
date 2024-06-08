import React, { useContext, useEffect, useState } from "react";
import { Context } from '../App.jsx';
import { reducerActions } from '../useReducer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Search() {
    const { state, dispatch } = useContext(Context);
    const [inputValue, setInputValue] = useState("");
    const [lastQuery, setLastQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [lastOptions, setLastOptions] = useState([]);
    const loading = open && options.length === 0 && inputValue.length !== 0;

    useEffect(() => {
        setOptions([]);
    }, [inputValue]);

    useEffect(() => {
        let active = true;

        if (!loading || !inputValue || inputValue === lastQuery) {
            return undefined;
        }

        setLastQuery(inputValue);
        (async () => {
            fetch('https://api.tvmaze.com/search/shows?q=' + inputValue)
                .then((resp) => resp.json())
                .then((data) => {
                    let options = [];
                    for (let i = 0; i < data.length; i++) {
                        let title = data[i].show.name;
                        let premierDate = new Date(data[i].show.premiered);
                        let year = premierDate.getUTCFullYear();
                        let id = data[i].show.id;

                        options.push({ title: title, year: year, id: id });
                    }

                    if (active) {
                        if (options.length) {
                            setOptions(options);
                            setLastOptions(options);
                        } else {
                            setOptions(lastOptions);
                        }
                    }
                })
                .catch((e) => {
                    console.log('error: ', e);
                });
        })();

        return () => {
            active = false;
        };
    }, [loading, inputValue]);

    return (
        <Autocomplete
            id="tvShowSearch"
            sx={{ ml: 'auto', mt: '2em', width: { sm: '100%', md: 300 } }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            value={options.find(option => option.id === state.selectedShowID) || null}
            onChange={(event, value) => {
                if (value && state.selectedShowID !== value.id) {
                    dispatch({ type: reducerActions.updateSelectedShowID, payload: value.id });
                    setInputValue(value.title + " (" + value.year + ")"); // Keep the search term in the input
                }
            }}
            inputValue={inputValue}
            onInputChange={(event, val) => {
                if (event && event.type === 'change') {
                    setInputValue(val);
                }
            }}
            filterOptions={(options, state) => { return options }}
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
            renderOption={(props, option) => {
                const { key, ...other } = props; // Separate key from other props
                return (
                    <Box component="div" key={option.id} {...other}>
                        {option.title + " (" + option.year + ")"}
                    </Box>
                );
            }}
        />
    );
}