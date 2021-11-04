import './App.css';
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";

function App() {
    const list = [{
        "text": "Main",
        "href": "/",
    }, {
        "text": "Apple",
        "href": "/apple",
    }, {
        "text": "iPad",
        "href": "/apple/ipads",
    }, {
        "text": "Air 2021",
        "href": "/apple/ipads/air2021",
    }
    ]
    return (
        <Breadcrumbs crumbList={list} divider={"/"}/>
    );
}

export default App;
