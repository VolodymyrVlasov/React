import './App.css';
import Header from "./components/Header";
import Dashboard from "./containers/Dashboard/Dashboard";

const todos = [
    {
        "orderId": "ПФ-00012",
        "customer": "John Doe",
        "maker": {
            "name": "Иван Лубянко",
            "hash": "hash3"
        },
        "manager": {
            "name": "Иван Лубянко",
            "hash": "hash3"
        },
        "taskList": [
            {
                "name": "Чашка белая 310 мл",
                "amount": 500,
                "folder": "/desktop/cups/00012"
            },
            {
                "name": "Холст хлопок 30х40 + лак",
                "amount": 1,
                "folder": "/desktop/canvas/00012"
            }
        ],
        "messages": [
            {
                "authorName": "Pawel Smolow",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
            },
            {
                "authorName": "Владимир Власов",
                "message": "Да че ты такое несешь?"
            }
        ],
        "state": "Приступить"
    },
    {
        "orderId": "ПФ-00014",
        "customer": "John Doe",
        "maker": {
            "name": "Pavel Smolow",
            "hash": "hash3"
        },
        "manager": {
            "name": "Иван Лубянко",
            "hash": "hash3"
        },
        "taskList": [
            {
                "name": "Чашка белая 310 мл",
                "amount": 50,
                "folder": "/desktop/cups/00012"
            },
            {
                "name": "Холст хлопок 30х40 + лак",
                "amount": 1,
                "folder": "/desktop/canvas/00012"
            }
        ],
        "messages": [
            {
                "authorName": "Pawel Smolow",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
            },
            {
                "authorName": "Владимир Власов",
                "message": "Да че ты такое несешь?"
            }
        ],
        "state": "Приступить"
    }
]

const App = () => {
    return (
        <>
            <Header/>
            <Dashboard/>
        </>
    );
}

export default App;
