import React from "react";
import "./EditorHeader.css";

import runCode, { CodeStatus, languageCode } from "../../util/runCode";
import SettingModal from "../setting-modal/SettingModal";
import DropDown from "../dropdown-btn/DropDown";

const EditorHeader = ({
  codeStatus,
  setCodeStatus,
  editorRef,
  inputRef,
  outputRef,
  languageState,
  themeState,
  fontSizeState,
}) => {
  const [language, setLanguage] = languageState;
  const [theme, setTheme] = themeState;
  const [fontSize, setFontSize] = fontSizeState;

  function handleRunCode() {
    setCodeStatus(CodeStatus.Running);
    outputRef.current.value = "";

    console.log(editorRef.current);

    /* 

    // editorRef.current.monaco.editor.setTheme("hc-light"); // working


    // editorRef.current.monaco.editor.setModelLanguage(
    //   editorRef.current.editor.getModel(),
    //   "java"
    // ); // working

    editorRef.current.container.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].style.fontSize =
      "22px"; // working

    */

    const code = editorRef.current.editor.getModel().getValue();
    // console.log(editorRef.current.editor.getModel());
    const input = inputRef.current.value;
    const languageChoice = languageCode[language];

    runCode(code, input, languageChoice)
      .then(function (response) {
        console.log(response);
        if (!response.data.Errors) {
          if (response.data.Result === null) response.data.Result = "";
          outputRef.current.value = response.data.Result;
          setCodeStatus(CodeStatus.Finished);
        } else {
          outputRef.current.value = response.data.Errors;
          setCodeStatus(CodeStatus.Error);
        }
      })
      .catch(function (error) {
        console.error(error);
        outputRef.current.value = "Something went wrong";
        setCodeStatus(CodeStatus.Error);
      });
  }

  return (
    <div className="editor__header">
      <div className="editor__header--left">
        <button
          onClick={handleRunCode}
          className={
            `btn btn-success round run-code-btn` +
            (codeStatus === CodeStatus.Running ? " disabled" : "")
          }
        >
          <i className="fa fa-play-circle" aria-hidden="true"></i>&nbsp; Run
          <span className="hidden-xs hidden-sm"> Code</span>
        </button>
      </div>
      <div className="editor__header--right">
        <DropDown
          dropDownState={[language, setLanguage]}
          dropDownOptions={["Java", "C#", "C++", "Javascript", "Python"]}
        />

        <div className="editor__header--right--options">
          <button data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i
              className="fa fa-cog editor__header--setting"
              aria-hidden="true"
            ></i>
          </button>
          <SettingModal
            fontSizeState={[fontSize, setFontSize]}
            themeState={[theme, setTheme]}
          />
          <button
            onClick={() => editorRef.current.editor.getModel().setValue("")}
          >
            <i
              className="fa fa-refresh editor__header--reset"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
