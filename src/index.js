import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from "./App";
import TasksProvider from "./context/AppContext";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";


ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <TasksProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </TasksProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
