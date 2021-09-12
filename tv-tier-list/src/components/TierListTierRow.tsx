import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        height: "100px",
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
    tierColor:string;
}
const TierListTierRow = ({tierLabel, tierColor}:TierListRow_PropsInterface) =>{
    const classes = useStyles();
    return (

        <Box component="div" m={1} style={{backgroundColor: tierColor}} className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.rowLabel}>
                    {tierLabel}
                </Grid>
                <Grid item xs={9} className={classes.rowItem}>
                    List Items
                </Grid>

            </Grid>
        </Box>
    )
}

export default TierListTierRow;