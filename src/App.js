import './App.css';
import AddTodo from "./components/AddTodo";
import TodosProvider from "./context/TodoContext";
import TodoList from "./components/TodoList";

function App() {

    return (
        <section className="container">
            <TodosProvider>
                <AddTodo/>
                <TodoList/>
            </TodosProvider>
        </section>
    );
}

export default App;
