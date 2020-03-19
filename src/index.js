import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import rtl from 'jss-rtl'
import purple from '@material-ui/core/colors/purple';



const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});

const theme = createMuiTheme({
    palette: {
        secondary: purple,
    },
});


export default function RootComponent() {
    return (
        <MuiThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
                <App />
            </StylesProvider>
        </MuiThemeProvider>
    );
}

ReactDOM.render(<RootComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
