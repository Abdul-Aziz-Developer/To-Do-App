import { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

// Functional Component for To-Do List Edit Start //

function Todo() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")) || []);

  const [newTodo, setNewTodo] = useState(
    {
      id: Date.now(),
      text: "",
      completed: false,
      isUpdating: false,
    }
  );

  const [updateText, setUpdateText] = useState("");

  const handleAddTodo = (e) => {
    setTodo([...todo, newTodo]);
    setNewTodo(
      {
        id: Date.now(),
        text: "",
        completed: false,
        isUpdating: false,
      }
    );


    localStorage.setItem("todo", JSON.stringify([...todo, newTodo]))
  }
  const handleDeleteTodo = (id) => {
    const afterDeleteTodos = todo.filter((t) => t.id !== id);
    setTodo(afterDeleteTodos);
    console.log(afterDeleteTodos);

    localStorage.setItem("todo", JSON.stringify(afterDeleteTodos))
  }

  const handleEditTodo = (id) => setTodo((prevState) => {
    const prevText = todo.filter((todo) => todo.id === id)

    setUpdateText(prevText[0].text)
    const updatedTodos = prevState.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, isUpdating: true };
      }
      return todoItem;
    }
    );
    return updatedTodos;
  })

  const handleUpdateTodo = (id) => setTodo((prevState) => {
    const updatedTodos = prevState.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, text: updateText, isUpdating: false };
      }
      return todoItem;
    }
    );
    localStorage.setItem("todo", JSON.stringify(updatedTodos))
    return updatedTodos;

  })

  const handleChangeUpdateText = (e) => {
    setUpdateText(e.target.value);
  }


  const clearAllTodo = () => {
    setTodo([])
    localStorage.setItem("todo", JSON.stringify([]))
  }


  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("todo")) || [])
  }, [])


  // Functional Component for To-Do List Edit End //



  // JSX Return //

  return (
    <div className="flex justify-center items-start min-h-screen bg-slatea-300 p-4">
      <div className="bg-teal-200 shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          To-Do List
        </h1>

        {/* Input Form (static) */}

        <form className="flex items-center border border-gray-700 rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={newTodo.text}
            placeholder="Add a new task"
            className="flex-1 p-2 outline-none text-gray-800"
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}

          />
          <button
            onClick={handleAddTodo}
            type="button"
            className="bg-green-500 text-white px-4 py-2 hover:bg-red-500 transition "
          >
            Add
          </button>
        </form>

        {/* To-Do List (dynamic) */}
        <ul className="space-y-2">

          {todo.map((t, index) => {
            return (
              <li key={t.id} className="flex justify-between items-center bg-gray-300 p-2 shadow rounded-lg hover:bg-green-300 transition-all">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-500"
                    checked={t.completed}
                    onChange={(e) => setTodo((prevState) => {
                      const updatedTodos = prevState.map((todoItem) => {
                        if (todoItem.id === t.id) {
                          return { ...todoItem, completed: e.target.checked };
                        }
                        return todoItem;
                      }
                      );
                      return updatedTodos;
                    })}

                  />

                  {t.isUpdating
                    ? <input value={updateText} type="text" className="border border-slate-200 p-1 w-full" onChange={(e) => handleChangeUpdateText(e)} />
                    : <p className={`${t.completed && "line-through"} text-gray-600`}>
                      {t.text}
                    </p>


                  }
                </div>
                <div className="flex gap-2 justify-end">
                  {
                    !t.isUpdating
                      ? (<span className="text-yellow-500 text-2xl <MdDeleteForever />" onClick={() => handleEditTodo(t.id)}><MdEdit /></span>)

                      : (<span className="text-gray-500 text-2xl <MdDeleteForever />" onClick={() => handleUpdateTodo(t.id)}>Update</span>)
                  }
                  <span className="text-red-500 text-2xl <MdDeleteForever />" title={t.id} onClick={(e) => handleDeleteTodo(t.id)}><MdDeleteForever /></span>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Clear button (static) */}

        {todo.length > 0 && (
          <button
            type="button"
            className="bg-red-500  rounded px-4 py-2 mt-4 hover:bg-green-700 transition <MdDeleteForever /> w-full"
            onClick={clearAllTodo}
          >
            Clear All
          </button>
        )}

      </div>
    </div>
  );
}

export default Todo;
