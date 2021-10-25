import React, { useContext } from "react";
import {Context} from '../App.jsx';
import Droppable from "./Droppable";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const TierListHoldingRow = () => {
    const {state} = useContext(Context);
    return (
        <Box mt={1}>
            {state.tierOrder["holding"]
            ?
                <Droppable id={"holding"}/>
            :   state.selectedShowID !== -1 ? <CircularProgress sx={{marginTop:"2em"}}/> : null }
        </Box>
    );
};
export default TierListHoldingRow;
