import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from "./App";
import TasksProvider from "./context/AppContext";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <React.StrictMode>
        <TasksProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </TasksProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
