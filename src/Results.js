import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

export default function Results(props) {
    const classes = useStyles();
    const data = props.data || [];

    return (<Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
            {
                data.map(item => (
                    <Grid item key={item} xs={12} sm={3} md={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={item.fields.image && item.fields.image.fields && item.fields.image.fields.file.url}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.fields.serviceName}
                                </Typography>
                                <Typography>
                                    {item.fields.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/service/${item.sys.id}`}>
                                    <Button size="small" color="primary">
                                        כנס/י
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    </Container>);
}