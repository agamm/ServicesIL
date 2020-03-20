import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Grow } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Container } from '@material-ui/core';
var GeoPattern = require('geopattern');
var pattern = GeoPattern.generate('GitHub' + ('' + Math.random()));

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 700,
    },
    main: {
        maxWidth: '100%',
        padding: '1em',
        paddingRight: '500px',
        backgroundImage: pattern.toDataUrl(),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

var contentful = require('contentful');


var client = contentful.createClient({
  space: '50rrjxv2h4p8',
  accessToken: '0S-idIoakT5qS6PII5JyClZnJ29-RIiLBP27vslWs80'
})

export default function Service(props) {
  const [item, setItem] = useState({});

  useEffect(() => {
    client.getEntry(props.match.params.id).then(function (response) {
      console.log(response)
      setItem(response)
    }).catch(console.error)
  }, [props.match.params.id]);

    const classes = useStyles();
    const service = {
        id: props.match.params.id
    }
    if (!service) {
        return <div>השירות לא נמצא</div>
    }

    console.log(item);




    return (
        <Container className={classes.main}>
          {item.fields && <Grow in={true}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                              {item.fields.fullName.charAt(0).toUpperCase()}
              </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={item.fields.serviceName}
                        subheader={item.fields.fullName}
                    />
                    <CardMedia
                        className={classes.media}
                        image={item.fields.image && item.fields.image.fields && item.fields.image.fields.file.url}
                        title={item.fields.serviceName}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">

            </Typography>
                    </CardContent>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {item.fields.description}
              </Typography>
                          {item.fields.phoneNumber && <Typography paragraph>
                              טלפון: &nbsp;
                                {item.fields.phoneNumber}
              </Typography>}
                          {item.fields.openingTime && <Typography paragraph>
                                שעת פתיחה:&nbsp;
                              {item.fields.openingTime}
              </Typography>}
                          {item.fields.closingTime && <Typography>
                                שעת סגירה:&nbsp;
                              {item.fields.closingTime}
                            </Typography>}
                        </CardContent>
                    </Collapse>
                </Card>
            </Grow>}
        </Container >
    );
}
