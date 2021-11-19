import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from "./components/AddTodo";
import TodosProvider from "./context/TodoContext";
import TodoList from "./components/TodoList";
// import Popup from "reactjs-popup"
import {Modal} from "reactstrap";

function App() {

    return (
        <section className="container">
            <TodosProvider>
                {/*<Modal toogle={}>*/}
                {/*    <AddTodo/>*/}
                {/*</Modal>*/}
                {/*<Popup trigger={<Button color="danger">Add Todo</Button>} modal nested>*/}
                {/*    <AddTodo/>*/}
                {/*</Popup>*/}
                <TodoList/>
            </TodosProvider>
        </section>
    );
}

export default App;
