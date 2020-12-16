import React, { useState } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const AddTodo = () => {
  const [, dispatch] = useGlobalContext();
  const [todoValue, setTodoValue] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        '/api/todo',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: todoValue }),
          method: 'POST',
        }
      );
      const json = await response.json();

      dispatch({ type: 'addTodo', payload: json.data });
      setTodoValue('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Add a new todo!</h3>
      <form onSubmit={addTodo}>
        <input
          type="text"
          name="todo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <button>Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;