import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
        
    </React.StrictMode>,
    document.getElementById("root")
);


serviceWorker.unregister();
