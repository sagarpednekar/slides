import React, { useState } from "react";
import EditorComponent from "./Components/EditorComponent";
import "./style.css";

export default function App() {
  const [state, setState] = useState({ editorsList: [], count: 0 });

  // handler to add text on button click

  const handleSave = html => {
    console.log("HTML in parent");
  };

  const handleClick = () => {
    setState({
      ...state,
      editorsList: [
        ...state.editorsList,
        <EditorComponent editorIndex={state.count} handleSave={handleSave} />
      ],
      count: state.count + 1
    });
  };
  return (
    <div>
      <h1>Lets try to add text on click of button</h1>
      <button onClick={handleClick}>Add new Text</button>
      <div className="whiteboard">{state.editorsList}</div>
    </div>
  );
}
