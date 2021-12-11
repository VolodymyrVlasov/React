import './styles/App.css';
import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard/Dashboard";
import "./styles/variables.css"

const App = () => {
    return (
        <>
            <Header/>
            <Dashboard/>
        </>
    );
}

export default App;
