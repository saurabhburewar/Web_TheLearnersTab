/*global chrome*/
import { useEffect, useState } from "react";
import "./todo.css";
import bin from "../../images/Todo/deletebin.png";
import TodoList from "./todoList";

import shortid from "shortid";
import "./todoform.css";

export default function Todo() {

    const [todos, setTodos] = useState([]);
    const [formtext, setText] = useState("");
    let plusSign;
    
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    };
    
    const clearTodo = () => {
        setTodos([])
    };

    const handleText = (event) => {
        setText(event.target.value)
    };

    const Submit = (event) => {
        event.preventDefault();
        let todo = {
            id: shortid.generate(),
            text: formtext,
        }
        setTodos([todo, ...todos])
        setText("")
    };

    return (
        <div className="TodoContainer">
            <form onSubmit={Submit}>
                <div className="addTodo">
                    <input
                        className="todoInput"
                        name="text"
                        value={formtext}
                        onChange={handleText}
                        placeholder="What to do..."
                        autoComplete="off"
                    ></input>
                    <button className="plus" onClick={Submit}>
                        <svg id="bdf8583a-9ade-4715-973c-b5041e160863" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#4db96b"}><title>add_sign</title><path class="f63b6ae5-c9dd-4d97-85f4-512e570e466c" d="M76.35,121c13.59,0,27.18-.18,40.76.1,4.37.09,5.52-1.14,5.53-5.51.06-27.55.39-55.1.74-82.65.17-13.36,7.59-23.4,19.68-27,13.56-4.09,25.72-.23,33.58,10.62,4.48,6.18,5,13.48,5.05,20.58.32,25.62.49,51.25.1,76.87-.09,6.31,2.16,7.32,7.57,7.3,26.4-.13,52.8,0,79.2.08,18.93,0,30.91,11.73,30.93,30.19,0,17.1-12.59,29.09-30.87,29.24-27,.22-53.94.48-80.91.44-4.62,0-5.85,1.32-5.84,5.88.11,24.07-.07,48.14-.29,72.21A120.34,120.34,0,0,1,180.46,275c-2.06,14.6-14.53,24.29-29.87,23.48-14.67-.77-26.66-11.93-27-26.18q-1-42.19-.93-84.4c0-5.46-1.59-6.67-6.8-6.66-26.77,0-53.55-.39-80.33-.58-17.42-.12-29.41-11.32-29.9-28.11-.52-17.62,11.28-30.8,28.77-31.36,14-.44,27.95-.09,41.92-.09Z"/></svg>
                    </button>
                </div>
            </form>
            <div className="lefttodo">
                <div id="textLeft">Tasks Left</div>: {todos.length}
            </div>
            {todos.length >= 5 ? (
                <div className="message">Your tasks are piling up!</div>
            ) : null}
            {todos.length ? (
                <button className="deletebut" onClick={clearTodo}>
                    <svg id="bf7615c1-123d-44e7-836e-799fefe6b0e3" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#b43c3c"}><title>bin</title><path class="3fed871a-4c7a-4142-8105-fc32c23198f3" d="M187.3,2c6.21,1.74,8.16,4.15,8.27,10.78.12,7.14,0,14.28,0,21.42,0,6.75,0,6.75,7,6.75,20,0,40-.07,60.07,0,6.5,0,10.57,3,11.41,7.8,1.2,6.81-3.25,11.62-11.1,11.71-12.71.14-25.42.18-38.13.18q-95.85,0-191.71.06c-6.22,0-11.16-1.79-14.32-7.38V48.11c3.31-5.75,8.37-7.36,14.82-7.27,19.81.27,39.62,0,59.43.17,3.56,0,4.78-.84,4.74-4.58-.09-8.33-.62-16.68.33-25,.76-6.65,2.72-8.57,9.45-9.54ZM147.22,22H131c-13.53,0-13.39,0-13.35,13.63,0,3.71,1.15,4.71,4.76,4.66,13.07-.19,26.14-.08,39.21-.08,14.94,0,14.85,0,14.31-14.8-.1-2.81-1-3.51-3.63-3.46C164,22.07,155.59,22,147.22,22Z"/><path class="99aa75d5-80d8-4ae5-8727-923e3b38ea2b" d="M107.58,1.9a4.4,4.4,0,0,1,.15-.85h79.49a1.21,1.21,0,0,0,.08,1Z"/><path class="e35c0162-cdfe-488f-991c-3dfcded81236" d="M38.84,173.87q0-45.23,0-90.45c0-3.06,0-6,2.46-8.16,2.73-2.41,5.57-5.72,9.53-3.63s7.92,5,7.84,10.68c-.19,12.89-.2,25.79-.2,38.68q0,70.58.15,141.16c0,11.19,2.57,14.06,13.78,14.08q74.5.15,149,0c11.06,0,13.78-3.13,13.78-14.79q0-87.57,0-175.15c0-1.22,0-2.44,0-3.66.05-7.87,2.68-11.69,8-11.69,6.15,0,11.57,5.66,11.57,12.19q0,89.67,0,179.33c0,22-11.68,33.54-33.6,33.54H71.63c-20.87,0-32.76-11.88-32.78-32.74q0-44.7,0-89.39Z"/><path class="aa275fb3-980a-42bf-8390-f4617bf3d06e" d="M137.16,167.87q0-32.13,0-64.26a21.93,21.93,0,0,1,.85-7.21c1.49-4.4,4.64-6.36,9.12-6.29a8.24,8.24,0,0,1,8.44,6.46,29.61,29.61,0,0,1,.87,7.74q.08,64,0,128a29.28,29.28,0,0,1-.84,7.75c-1.18,4.22-3.93,6.79-8.67,6.84s-7.46-2.25-9-6.5a21.37,21.37,0,0,1-.83-7.22Q137.17,200.52,137.16,167.87Z"/><path class="3ccf26db-2a39-4b4f-92dd-1b92fd694d32" d="M186.16,168.59q0-23,0-46a20.16,20.16,0,0,1,.82-6.69c1.45-4.24,4.52-6,8.75-6.07,4.47,0,7.78,1.93,9.08,6.36a22.27,22.27,0,0,1,.77,6.19q.07,46.25,0,92.49a19.22,19.22,0,0,1-.73,5.67c-1.26,4-3.9,6.46-8.36,6.6s-7.69-1.58-9.4-5.91a19,19,0,0,1-.94-7.19Q186.17,191.32,186.16,168.59Z"/><path class="e35c0162-cdfe-488f-991c-3dfcded81236" d="M88,168.56c0-15.5,0-31,0-46.49a17.12,17.12,0,0,1,1-6.65c1.67-4.08,4.94-5.69,9.14-5.56s7.35,2.17,8.44,6.42a29.6,29.6,0,0,1,.94,7.22q.09,44.93,0,89.86a27,27,0,0,1-1.06,7.71c-1.26,4.12-4.37,6-8.7,6.1s-7.39-1.94-8.8-6A19.09,19.09,0,0,1,88,215C88,199.55,88,184.06,88,168.56Z"/></svg>
                </button>
            ) : null}
            <div className="showthelist">
                {todos.map((todo) => (
                    <TodoList
                    key={todo.id}
                    permaDelete={() => deleteTodo(todo.id)}
                    text={todo.text}
                    />
                ))}
                {todos.length ? null : (
                    <div className="listmessage">
                        Your pending tasks <br /> will be shown here
                    </div>
                )}
            </div>
      </div>
    )
}
