import React, { useRef, useState } from "react";
import Editor from "../editor/Editor";
import "./PlayGround.css";
import IO from "../io/IO";
import { CodeStatus } from "../../util/runCode";

const PlayGround = () => {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const editorRef = useRef(null);

  const [language, setLanguage] = useState("Java");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState("16px");
  const [codeStatus, setCodeStatus] = useState(CodeStatus.Finished);

  const codeStatusStyle = {
    borderColor:
      codeStatus === CodeStatus.Running
        ? "yellow"
        : codeStatus === CodeStatus.Finished
        ? "green"
        : "red",
  };

  return (
    <div className="playground">
      <Editor
        languageState={[language, setLanguage]}
        themeState={[theme, setTheme]}
        fontSizeState={[fontSize, setFontSize]}
        codeStatus={codeStatus}
        setCodeStatus={setCodeStatus}
        editorRef={editorRef}
        inputRef={inputRef}
        outputRef={outputRef}
      />
      <div className="console">
        <div className="console-header">
          <div className="console-left ">
            <span className="text-500 text-md split-too-small">
              Output: &nbsp;
            </span>
            <span
              className="text-default label label-default label-Finished round code-status"
              style={codeStatusStyle}
            >
              {codeStatus === CodeStatus.Running
                ? "Running"
                : codeStatus === CodeStatus.Finished
                ? "Finished"
                : "Error"}
            </span>
          </div>
          <div className="console-right Oi">
            <span
              onClick={() => (outputRef.current.value = "")}
              className="btn btn-default"
              style={{ display: "inline-block" }}
            >
              Clear{" "}
              <span className="unify-too-small split-too-small">Console</span>
            </span>
          </div>
        </div>
        <div className="output">
          <IO
            ioRef={outputRef}
            backgroundColor="rgb(245, 243, 244)"
            editable={false}
          />
        </div>
        <div className="input">
          <IO ioRef={inputRef} backgroundColor="white" editable={true} />
        </div>
      </div>
    </div>
  );
};

export default PlayGround;
