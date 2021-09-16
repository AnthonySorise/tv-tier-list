import { useContext, useEffect } from 'react';
import { Context } from '../App';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "115px",
            display:"flex",
            alignItems: "center",
            margin:"0",
        },
        rowLabel: {
            fontSize: "2em",
        },
        rowItem: {
            textAlign: "left",
        },
    }),
);
export interface TierListRow_PropsInterface {
    tierLabel: string,
    tierColor:string
}
const TierListTierRow = ({tierLabel, tierColor}:TierListRow_PropsInterface) =>{
    const classes = useStyles();
    return (
        <Box component="div" m={1} style={{backgroundColor: tierColor}} className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={1} className={classes.rowLabel}>
                    {tierLabel}
                </Grid>
                <Grid item xs={11} className={classes.rowItem}>

                </Grid>

            </Grid>
        </Box>
    )
}

export default TierListTierRow;