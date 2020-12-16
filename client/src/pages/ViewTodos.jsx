import React, { useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const ViewTodos = () => {
  const [state, dispatch] = useGlobalContext();
  console.log({ state })


  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todo');
        const json = await response.json();
        console.log({ json });

        dispatch({ type: 'setTodos', payload: json.data });
      } catch (err) {
        console.log({ err });
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className="Todos">
      <h3 className="Todos-header">Current Todos</h3>
      <ul className="Todos-list">
        {state.todos.map(todo => (
          <li key={todo._id} className="Todos-listItem">
            <span>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTodos;