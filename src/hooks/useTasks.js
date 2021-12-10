import {TasksContext} from "../context/TasksContext";
import {useContext} from "react";

export const useTasks = () => {
  return useContext(TasksContext)
}