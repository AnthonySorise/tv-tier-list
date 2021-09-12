import { useState} from 'react';
import tiers from '../models/tiers'
import Box from '@material-ui/core/Box';
import TierListTierRow from './TierListTierRow';
import TierListItemsHolding from './TierListItemsHolding'


const TierList = () =>{
    return (
        <Box component="div" m={1}>
            {
                tiers.map(function(tierLabel){
                    return(
                    <TierListTierRow tierLabel={tierLabel} />
                    )
                })
            }
            <TierListItemsHolding />
        </Box>
    )
}

export default TierList;
