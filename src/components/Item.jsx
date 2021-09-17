import React, { forwardRef } from 'react';
import {Context} from '../App';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const Item = forwardRef(({ url, index, faded, style, ...props }, ref) => {
    return (
    <Card ref={ref} style={style} {...props} sx={{width:"100%", maxWidth:"100%", display:"inline-block", margin:"0.25em"}}>
        <CardContent sx={{padding:"0!important",}}>
            <span>S{props.season}E{props.episode}</span>
            <div style={{ backgroundImage: `url("${url}")`, backgroundSize: 'contain', height: "100px", backgroundPosition:"center", backgroundSize:"cover"}}></div>
            {/* <span>{title}</span> */}
        </CardContent>
    </Card>)
});
export default Item;