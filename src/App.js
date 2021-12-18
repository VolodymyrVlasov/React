import './styles/App.css';
import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard/Dashboard";
import "./styles/variables.css"
import {useTasks} from "./hooks/useTasks";
import Popup from "./containers/Popup/Popup";
import CreateOrder from "./components/CreateOrder/CreateOrder";


const App = () => {
    const [{isNewTaskPopup}, dispatch] = useTasks()

    const handleClose = () => dispatch({type: "changeNewTaskPopup"})

    return (
        <>
            {
                isNewTaskPopup && <Popup handleClose={handleClose}>
                    <CreateOrder/>
                </Popup>
            }
            <Header/>
            <Dashboard/>
        </>
    );
}

export default App;
