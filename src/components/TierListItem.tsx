import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "175px",
            maxHeight: "125px",
            display:"inline-block",
            margin:"0.25em",
        },
        content: {
            padding:"6px"
        },
        image: {
            maxWidth: "100%;"
        }
    }),
);
export interface TierListItem_PropsInterface {
    season: number,
    episode:number,
    title:string,
    img:string,
    description:string
}
const TierListTierRow = ({season, episode, title, img, description}:TierListItem_PropsInterface) =>{
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div>
                    <span>S{season}E{episode}</span>
                    <img src={img} alt={`S${season}E${episode}`} className={classes.image}/>
                    {/* <span>{title}</span> */}
                </div>
            </CardContent>
        </Card>
    )
}

export default TierListTierRow;