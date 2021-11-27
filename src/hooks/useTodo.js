import {TodosContext} from "../context/TodoContext";
import {useContext} from "react";

export const useTodos = () => {
  return useContext(TodosContext)
}