import tiers from '../models/tiers'
import tierColors from '../models/tierColors'
import Box from '@material-ui/core/Box';
import TierListTierRow from './TierListTierRow';
import TierListItemsHolding from './TierListItemsHolding'

const TierList = () =>{
    return (
        <Box component="div" m={1}>
            {
                tiers.map(function(tierLabel, i){
                    return(
                    <TierListTierRow tierLabel={tierLabel} tierColor={tierColors[i]}/>
                    )
                })
            }
            <TierListItemsHolding />
        </Box>
    )
}

export default TierList;
