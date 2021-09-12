import {useContext, useEffect} from 'react';
import {Context} from '../App'
import TierListItem from './TierListItem'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const TierListItemsHolding = () =>{
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    useEffect(function(){
        console.log("loadedFromListItemHolding")
    }, [isEpisodeDataLoaded])

    return (
        <Box component="div" m={1}>
            {
                isEpisodeDataLoaded ? 
                    episodeData.map(function(episode:any, i:number){
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
