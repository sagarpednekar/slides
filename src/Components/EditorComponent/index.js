import React, { useState, useMemo } from "react";

// import slate editor factory

import { createEditor, Node } from "slate";

// import slate componnenent and Plugins
import { Slate, Editable, withReact } from "slate-react";

// import slate-hyperscript

import { jsx } from "slate-hyperscript";

// import custom stylesheet

import "./style.css";

export default ({ editorIndex, handleSave }) => {
  console.log("Editorr Index", editorIndex);
  // create immutable editor object

  const editor = useMemo(() => withReact(createEditor()), []);

  // persist editor state
  const [state, setState] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);

  const handleChange = newState => {
    setState(newState);
    console.log("HTML", convertToHTML(newState));
    const document = new DOMParser().parseFromString(
      convertToHTML(newState),
      "text/html"
    );
    console.log("node", convertFromHTML(document.body));
  };

  const onSave = state => {
    // convert to HTML

    const editorHtml = convertToHTML(newState);

    console.log("HTML", convertToHTML(newState));
    () => handleSave(editorHtml);
  };

  const convertToHTML = nodes => {
    return nodes.map(node => Node.string(node)).join("\n");
  };

  const convertFromHTML = el => {
    if (el.nodeType === 3) {
      return el.textContent;
    } else if (el.nodeType !== 1) {
      return null;
    }
    const children = Array.from(el.childNodes).map(convertFromHTML);

    switch (el.nodeName) {
      case "BODY":
        return jsx("fragment", {}, children);
      case "BR":
        return "\n";
      case "BLOCKQUOTE":
        return jsx("element", { type: "quote" }, children);
      case "P":
        return jsx("element", { type: "paragraph" }, children);
      case "A":
        return jsx(
          "element",
          { type: "link", url: el.getAttribute("href") },
          children
        );
      default:
        return el.textContent;
    }
  };

  return (
    <div className="editorStyles">
      <Slate
        editor={editor}
        value={state}
        onChange={newValue => {
          handleChange(newValue);
          handleSave(convertToHTML(value));
        }}
        onFocusOut={() => alert("Saved!!")}
      >
        <Editable />
      </Slate>
    </div>
  );
};
