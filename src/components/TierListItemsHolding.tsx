import {useContext, useEffect} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Context} from '../App'
import TierListItem from './TierListItem'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "calc(100vh - 680px)",
            overflow: "auto"
        }
    }),
);
const TierListItemsHolding = () =>{
    
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);

    const classes = useStyles();
    return (
            <Box component="div" m={1} className={classes.root}>
                {
                    isEpisodeDataLoaded && state.tierOrder[5] && state.tierOrder[5].length ? 
                        state.tierOrder[5].map(function(episodeDateIndex:number, i:number){
                            let episode = episodeData[episodeDateIndex];
                            return(
                            <TierListItem
                                season={episode.season} 
                                episode={episode.number} 
                                title={episode.name} 
                                img={episode.image.medium} 
                                description = {episode.summary}
                                key={i}/>
                            )
                        })
                    :<CircularProgress />
                }
            </Box>
    )
}

export default TierListItemsHolding;
