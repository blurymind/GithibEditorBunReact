import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import AceEditor from "react-ace-builds";
import "react-ace-builds/webpack-resolver-min";

// ace.config.set('basePath', "https://unpkg.com/ace-builds@1.4.6/src-noconflict")


import { useStorage } from "./hooks.ts";
import Input from "./components/Input.tsx";
import GithubFiles from "./filesystem/index.tsx";
import { getFile, setFile } from "./filesystem/utils.ts";

function onChange(newValue) {
  console.log("change", newValue);
}

function App() {
  const [gitToken, setGitToken] = useStorage("git-token", "") ?? "";
  const [gitOwner, setGitOwner] = useStorage("git-owner", "") ?? "";
  const [gitRepo, setGitRepo] = useStorage("git-repo", "") ?? "";
  const [gitRepoBranch, setGitRepoBranch] = useStorage("git-repo-branch", "main") ?? "main";

  const [editorFile, setEditorFile] = useStorage("ace-editor-file", "") ?? "";
  const [editorText, setEditorText] = useStorage("ace-editor-text", "") ?? "";

  const [editorFileSha, setEditorFileSha] = useStorage("ace-editor-file-sha", "") ?? "";
  const onSubmitChanges =()=> {
    const b64Content = btoa(editorText);
    console.log("submit", {b64Content , editorText})
    setFile({owner: gitOwner,repo: gitRepo, name:editorFile, token: gitToken, content: b64Content, sha: editorFileSha}).then(result=>{console.log({result})})
  }

  const onGetChanges =() => {
    getFile({owner: gitOwner,repo: gitRepo, name:editorFile, token: gitToken}).then(er=>{
      console.log("GET IT", atob(er.content), er.content, er)
      setEditorFileSha(er.sha);//needed to write to it bleh
      setEditorText(atob(er.content))
    })
  }

  useEffect(()=>{
    console.log("Try to get files from repository:")
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <GithubFiles
        gitToken={gitToken}
        setGitToken={setGitToken}
        gitOwner={gitOwner}
        setGitOwner={setGitOwner}
        gitRepo={gitRepo}
        setGitRepo={setGitRepo}
        gitRepoBranch={gitRepoBranch}
        setGitRepoBranch={setGitRepoBranch}
        />
        {/* todo should be a dropdown list? */}
        <Input title="Editing file" value={editorFile} onChange={setEditorFile}/>
        <div>sha: {editorFileSha}</div>
        <AceEditor
          // mode="java"
          theme="github"
          onChange={setEditorText as any}
          name="UNIQUE_ID_OF_DIV"
          value={editorText as string}
        />
        <button onClick={onGetChanges}>get data from repo</button>
        <button onClick={onSubmitChanges}>submit</button>
      </header>
    </div>
  );
}

export default App;
