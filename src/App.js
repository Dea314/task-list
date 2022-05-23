import "./App.css";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

function App() {
  // if local storage's empty - create empty array
  const [list, setList] = useState(
    localStorage.list ? JSON.parse(localStorage.list) : []
  );
  // function to add items to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    const listItem = { text: e.currentTarget.todo.value, checked: false };
    setList([listItem, ...list]);
    e.currentTarget.reset();
  };

  // change checked value in object if value is checked
  const checkItem = (e) => {
    const copyList = [...list];
    const index = parseInt(e.currentTarget.id.substr(5, 3));
    copyList[index].checked = !copyList[index].checked;
    setList(copyList);
  };

  // click icon to open show input field
  const editItem = (e) => {
    const index = parseInt(e.currentTarget.id.substr(4, 3));
    const input = document.querySelector(`#editInput${index}`);
    const text = document.querySelector(`#listItem${index}`).innerText;
    input.value = text;
    input.classList.toggle("show");
  };

  // change the text key in a object in array
  const handleEdit = (e) => {
    e.preventDefault();
    const copyList = [...list];
    const input = e.currentTarget.edit;
    const index = parseInt(e.currentTarget.edit.id.substr(9, 3));
    copyList[index].text = input.value;
    setList(copyList);
    input.classList.toggle("show");
  };

  // delete item
  const deleteItem = (e) => {
    const index = parseInt(e.currentTarget.id.substr(6, 3));
    const filtered = list.filter((item) => item !== list[index]);
    setList(filtered);
  };
  // saving list to local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <input type="text" name="todo" placeholder="Add task.." />
        </label>
        <input type="submit" value="Add" className="submit" />
      </form>
      <div id="list">
        {list.map((listItem, i) => (
          <div id="itemContainer" key={i}>
            <p
              id={"listItem" + i}
              className={listItem.checked ? "listItem checked" : "listItem"}
            >
              {listItem.text}
            </p>
            <AiOutlineCheckCircle
              onClick={checkItem}
              id={"check" + i}
              className="icon"
            />
            <BiEdit onClick={editItem} id={"edit" + i} className="icon" />
            <RiDeleteBinLine
              onClick={deleteItem}
              id={"delete" + i}
              className="icon"
            />
            <form onSubmit={handleEdit}>
              <input
                type="text"
                name="edit"
                id={"editInput" + i}
                className="edit"
              />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
