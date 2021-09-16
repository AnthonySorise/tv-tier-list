import {useContext, useEffect} from 'react';
import {Context} from '../App'
import tiersModel from '../models/tiers'
import Box from '@material-ui/core/Box';
import TierListTierRow from './TierListTierRow';
import TierListItemsHolding from './TierListItemsHolding'


const TierList = () =>{
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    
    return (
        <Box component="div" m={1}>
            {
                tiersModel.map(function(tierModel, i){
                    return(
                    <TierListTierRow tierLabel={tierModel.label} tierColor={tierModel.color} key={i}/>
                    )
                })
            }
            <TierListItemsHolding />
        </Box>
    )
}

export default TierList;
