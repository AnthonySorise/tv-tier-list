import { useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export interface TierListRow_PropsInterface {
    tierLabel: string;
}
const TierListTierRow = ({tierLabel}:TierListRow_PropsInterface) =>{
    return (

        <Box component="div" m={1}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {tierLabel}
                </Grid>
                <Grid item xs={9}>
                    List Items
                </Grid>

            </Grid>
        </Box>
    )
}

export default TierListTierRow;