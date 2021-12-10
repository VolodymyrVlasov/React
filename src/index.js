import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from "./App";
import TasksProvider from "./context/TasksContext";


ReactDOM.render(
    <React.StrictMode>
        <TasksProvider>
            <App/>
        </TasksProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
