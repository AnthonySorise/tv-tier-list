import React, { useContext, forwardRef } from 'react';
import {Context} from '../App.jsx';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { prependZero } from '../utils/textFormatting';
import { isTouchDevice } from '../utils/device';
import Gradient from 'javascript-color-gradient'

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#2a2a2a',
        color: '#f8f8f8',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #2a2a2a',
    },
    [`& .${tooltipClasses.tooltip} h4`]: {
        fontWeight:'bold'
    },
    [`& .${tooltipClasses.tooltip} i`]: {
        fontWeight:'normal'
    },
    [`& .${tooltipClasses.tooltip} p`]: {
        marginBottom:'0',
        marginTop:'0',
        color:'#d1d1d1'
    },
    [`& .${tooltipClasses.tooltip} br`]: {
        display:'none'
    }
}));

const Item = forwardRef(({ episodeId, index, style, ...props }, ref) => {
    const {state, episodeData} = useContext(Context);
    let episode = episodeData[episodeId];
    let episodeDateString = episode.airdate ? new Date(episode.airdate).toDateString(): null;
    let episodeLabel = 'S' + prependZero(episode?.season) + 'E' + prependZero(episode?.number);
    let episodeImage = episode && episode.image && episode.image.medium ? episode.image.medium : '';

    const color01 = '#2de2e6';
    const color02 = '#d40078';

    let colorArray = [color01, color02];

    const seasons = Math.max(...Object.values(episodeData).map(episode => episode.season));
    if(seasons > 2){
        const colorGradient = new Gradient();
        colorGradient.setColorGradient("#2de2e6", "#d40078");
        colorGradient.setMidpoint(seasons-1);
        const moreColors = colorGradient.getColors();
        colorArray.splice(1, 0, ...moreColors);
    }

    let infoIcon = <InfoIcon sx={{cursor:!state.itemBeingDragged ? 'help' : 'grabbing', color:'#474747', left:'100%', transform:'translateX(-24px)', position:'absolute'}}></InfoIcon>;
    return (
    <Card ref={ref} style={style} {...props} sx={{width:'100%', maxWidth:'100%', my:'auto!important', mx:'0!important', display:'inline-block', margin:'0.25em', cursor:(state.itemBeingDragged) ? 'grabbing' : 'grab'}}>
        <CardContent sx={{padding:'0!important'}}>
            <div style={{display:'flex', position:'relative', justifyContent:'center', backgroundColor: colorArray[episode?.season-1]}}>
                <span style={{marginLeft:'auto', marginRight:'auto', color:'#f8f8f8', textShadow:'1px 1px 1px black', fontWeight:'bold'}}>{episodeLabel}</span>

                {!state.itemBeingDragged && !isTouchDevice()
                ?
                <HtmlTooltip title={
                    <React.Fragment>
                        {episode.name}
                        {
                            (episodeDateString)
                            ? 
                            <div><i>{episodeDateString}</i></div>
                            : null
                        } 
                        {
                            (episode.summary)
                            ? 
                            <div dangerouslySetInnerHTML={{__html: episode.summary}} /> 
                            : null
                        } 
                    </React.Fragment>
                } placement='top'>
                    {infoIcon}
                </HtmlTooltip>
                :
                isTouchDevice() ? null : infoIcon

                }
            </div>
            <div style={{ backgroundImage: `url('${episodeImage}')`, height: '100px', backgroundPosition:'center', backgroundSize:'cover'}}>
                <span>{!episodeImage ? episode.name : ''}</span>
            </div>
        </CardContent>
    </Card>
    )
});
export default Item;