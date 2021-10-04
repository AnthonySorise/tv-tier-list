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
    let episodeLabel = 'S' + prependZero(episode?.season) + 'E' + prependZero(episode?.number);
    let episodeImage = episode && episode.image && episode.image.medium ? episode.image.medium : '';
    
    let infoIcon = <InfoIcon sx={{cursor:!state.itemBeingDragged ? 'help' : 'grabbing', color:'gray', left:'100%', transform:'translateX(-24px)', position:'absolute'}}></InfoIcon>;
    return (
    <Card ref={ref} style={style} {...props} sx={{width:'100%', maxWidth:'100%', my:'auto!important', display:'inline-block', margin:'0.25em', cursor:(state.itemBeingDragged) ? 'grabbing' : 'grab'}}>
        <CardContent sx={{padding:'0!important'}}>
            <div style={{display:'flex', position:'relative', justifyContent:'center'}}>
                <span style={{marginLeft:'auto', marginRight:'auto'}}>{episodeLabel}</span>

                {!state.itemBeingDragged
                ?
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
                    {infoIcon}
                </HtmlTooltip>
                :
                infoIcon
                }
            </div>
            <div style={{ backgroundImage: `url('${episodeImage}')`, backgroundSize: 'contain', height: '100px', backgroundPosition:'center', backgroundSize:'cover'}}>
                <span>{!episodeImage ? episode.name : ''}</span>
            </div>
        </CardContent>
    </Card>
    )
});
export default Item;