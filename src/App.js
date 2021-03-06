import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Results from './Results.js';
import { Route } from 'react-router-dom';
import Service from './Service.js';
var contentful = require('contentful');


var client = contentful.createClient({
  space: '50rrjxv2h4p8',
  accessToken: '0S-idIoakT5qS6PII5JyClZnJ29-RIiLBP27vslWs80'
})

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'כל הזכויות שמורות © '}
      <Link color="inherit" href="https://servicesil.co.il/">
        ServicesIl
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBarTitle: {
    flexGrow: 1,
  },
  appBarButton: {
    backgroundColor: '#52ab52',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(
    function () {

      client.getEntries({
        'query': ''
      }).then(function (response) {
        console.log(response)
        setData(response.items)
      }).catch(console.error)
    }, [])


  const handleInputChange = (e) => {
    setInput(e.currentTarget.value)

    client.getEntries({
      'query': e.currentTarget.value
    }).then(function (response) {
      console.log(response)
      setData(response.items)
    }).catch(console.error)
  }

  const addService = () => {
    window.location.href = "https://airtable.com/shrD72XirW6iiXtfE";
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.appBarTitle}>
            DigiServe
          </Typography>
          <Button className={classes.appBarButton} onClick={addService}>הוסף שירות</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              DigiServe
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              שירותים דיגיטליים בהישג יד

            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <TextField id="outlined-search" label="חפשו כאן" type="search" variant="outlined" onChange={handleInputChange} />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <div className={classes.mainContainer}>
          <Route path="/" exact render={() => <Results data={data}></Results>} />
          <Route path="/service/:id" component={Service} />
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <Link href="#" onClick={null}>
            הוספת שירות חדש
          </Link>&nbsp;|&nbsp;
          <Link href="#" onClick={null}>
            אודותינו
          </Link>
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
