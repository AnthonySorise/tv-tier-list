import React, { useContext, forwardRef } from 'react';
import {Context} from '../App.jsx';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { prependZero } from '../utils/textFormatting.js';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#2a2a2a',
        color: 'white',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #2a2a2a',
    },
    [`& .${tooltipClasses.tooltip} h4`]: {
        fontWeight:'bold'
    },
    [`& .${tooltipClasses.tooltip} p`]: {
        marginBottom:'0',
        marginTop:'0',
        color:'lightgray'
    },
    [`& .${tooltipClasses.tooltip} br`]: {
        display:'none'
    }
}));

const Item = forwardRef(({ episodeId, index, style, ...props }, ref) => {
    const {state, dispatch, episodeData, isEpisodeDataLoaded} = useContext(Context);
    let episode = episodeData[episodeId];
    console.log(episode)
    let episodeLabel = 'S' + prependZero(episode?.season) + 'E' + prependZero(episode?.number);
    let episodeImage = episode && episode.image && episode.image.medium ? episode.image.medium : '';
    let isBeingDragged = (state.itemBeingDragged == episodeId);
    return (
    <Card ref={ref} style={style} {...props} sx={{width:'100%', maxWidth:'100%', display:'inline-block', margin:'0.25em', cursor:(state.itemBeingDragged) ? 'grabbing' : 'grab', opacity:isBeingDragged ? '0.5' : '1'}}>
        <CardContent sx={{padding:'0!important'}}>
            <div style={{display:'flex', position:'relative', justifyContent:'center'}}>
                <span style={{marginLeft:'auto', marginRight:'auto'}}>{episodeLabel}</span>
                <HtmlTooltip title={
                    <React.Fragment>
                        {episode.name}
                        <br />
                        {
                            <h4>{episode.summary}</h4>
                            ? 
                            <div dangerouslySetInnerHTML={{__html: episode.summary}} /> 
                            : null
                        } 
                    </React.Fragment>
                } placement='top'>
                    <InfoIcon sx={{cursor:'help', color:'gray', left:'100%', transform:'translateX(-24px)', position:'absolute'}}></InfoIcon>
                </HtmlTooltip>
            </div>
            <div style={{ backgroundImage: `url('${episodeImage}')`, backgroundSize: 'contain', height: '100px', backgroundPosition:'center', backgroundSize:'cover'}}>
                <span>{!episodeImage ? episode.name : ''}</span>
            </div>
        </CardContent>
    </Card>)
});
export default Item;