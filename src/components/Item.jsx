import React, { useContext, forwardRef } from 'react';
import {Context} from '../App';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Item = forwardRef(({ episodeId, index, style, ...props }, ref) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    let episode = episodeData[episodeId];
    let isBeingDragged = (state.itemBeingDragged == episodeId);
    return (
    <Card ref={ref} style={style} {...props} sx={{width:"100%", maxWidth:"100%", display:"inline-block", margin:"0.25em", cursor:"grab", opacity:isBeingDragged ? "0.5" : "1"}}>
        <CardContent sx={{padding:"0!important"}}>
            <span>S{episode.season}E{episode.number}</span>
            <div style={{ backgroundImage: `url("${episode.image.medium}")`, backgroundSize: 'contain', height: "100px", backgroundPosition:"center", backgroundSize:"cover"}}></div>
            {/* <span>{title}</span> */}
        </CardContent>
    </Card>)
});
export default Item;