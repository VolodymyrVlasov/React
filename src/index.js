import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from "./App";
import TodosProvider from "./context/TodoContext";


ReactDOM.render(
    <React.StrictMode>
        <TodosProvider>
            <App/>
        </TodosProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
