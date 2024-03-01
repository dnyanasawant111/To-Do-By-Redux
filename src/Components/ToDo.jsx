import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToDo, completedWork, deleteToDo, editToDo, clearAllCompletedTask } from '../Redux/ToDoSlice';
import '../index.css'

const ToDo = () => {

  const [input, setInput] = useState({
    title: '',
    description: '',
  });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.todo.todos);

  const dataHandler = () => {
    if (input.title.trim().length === 0) {
      alert("Please fill title field");
    } else {
      dispatch(addToDo(input));

    }

    setInput({
      title: "",
      description: ""
    });
  };

  const checkboxHandler = (i) => {
    dispatch(completedWork(i))
  }

  const deleteHandler = (i) => {
    dispatch(deleteToDo(i))
  }

  const editHandler = (i) => {
    const updatedTitle = prompt("Enter updated title:", data[i].title);
    const updatedDescription = prompt("Enter updated description:", data[i].description);

    if (updatedTitle !== null && updatedDescription !== null) {
      dispatch(editToDo({ index: i, title: updatedTitle, description: updatedDescription }));
    }
  };

  const deleteCompleteTask = () => {
    dispatch(clearAllCompletedTask())
  }


  const completedTodos = data.filter(todo => todo.completed);

  return (
    <div className="d-flex justify-content-center align-items-center main-to-do text-white p-4 ">
      <div className="container text-center">
        <h1 className="p-4 text-white">Add To Do</h1>
        <div className="w-50 mx-auto">
          <input
            className="form-control mb-4"
            placeholder="Enter title"
            name="title"
            value={input.title}
            onChange={inputHandler}
            type="text"
          />
          <input
            className="form-control mb-4"
            placeholder="Enter description"
            name="description"
            value={input.description}
            onChange={inputHandler}
            type="text"
          />
          <button onClick={dataHandler} className="btn btn-info mb-5">
            Add New Task
          </button>
        </div>

        {data.map((ele, i) => {
          return (
            <div className='p-2' key={i}>
              <div className='add-to-do p-4'>
                <div
                  className={ele.completed ? 'task-completion-status' : 'none'}>
                  <h4>Task-{i + 1}</h4>
                  <input onChange={() => checkboxHandler(i)} type="checkbox" />
                  <strong>Title:</strong> {ele.title} <br />
                  {ele.description.length > 0 ? <strong>Description:</strong> : null} {ele.description} <br />
                  <button onClick={() => deleteHandler(i)} className="btn btn-danger m-2"> Delete </button>
                  <button onClick={() => editHandler(i)} className="btn btn-warning m-2"> Edit </button>
                </div>
              </div>
            </div>

          )
        })}
        {completedTodos.length > 0 && (
          <button onClick={() => deleteCompleteTask()} className="btn btn-danger m-2"> Clear Completed Tasks </button>
        )}
      </div>
    </div>
  );
};

export default ToDo;