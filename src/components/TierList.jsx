import {useContext, useEffect} from 'react';
import {Context} from '../App'
import tiersModel from '../models/tiers'
import Box from '@mui/material/Box';
import TierListTierRow from './TierListTierRow';
import TierListHoldingRow from './TierListHoldingRow';

const TierList = (props) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    return (
        <Box component="div" m={1}>
            {
                tiersModel ? 
                tiersModel.map(function(tierModel, i){
                    return(
                    <TierListTierRow index={i} tierLabel={tierModel.label} tierColor={tierModel.color} key={i}/>
                    )
                })
                :null
            }
            <TierListHoldingRow index={tiersModel.length} key={tiersModel.length}/>
        </Box>
    );
};
export default TierList;