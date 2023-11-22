import React, { useEffect, useState } from "react";

import Input from "../components/Input.tsx";
import { useStorage } from "../hooks.ts";
import {requestUserRepos, requestUserRepoFiles} from "./utils.ts"

import Select from "../components/Select.tsx";

const GithubFiles = ({
    gitToken,
    setGitToken,
    gitOwner,
    setGitOwner,
    gitRepo,
    setGitRepo,
    gitRepoBranch,
    setGitRepoBranch,
    editorFile, 
    setEditorFile,
    onSaveFile,
    onGetRepoData,
    lastLoadedFile
}) => {
    const [repoFiles, setRepoFiles] = useState([]);
    console.log({gitToken, repoFiles})

    const updateRepoFiles = () => {
        requestUserRepoFiles(gitOwner, gitRepo, gitRepoBranch, gitToken, res=>{
            console.log({res})
            setRepoFiles(res.tree)
        })
    }
    useEffect(()=>{
        // requestUserRepos(gitOwner, console.log)
        //https://api.github.com/users/blurymind/repos/renjs-game-testbed/git/trees/main?recursive=1
        updateRepoFiles();
    }, [gitOwner, gitRepo, gitRepoBranch])

    const onClickSaveFile = () => {
        onSaveFile();
        // todo replace w promise
        setTimeout(()=>{
            updateRepoFiles();
        }, 900)
    }
    //@ts-ignore
    const repoFilesPaths = repoFiles?.map(file=>file?.path)
    return (
        <div>
            <div>
                Repository:
                <Input 
                    value={gitRepo}
                    onChange={setGitRepo}
                    title="name:"
                />
                <Input 
                    value={gitRepoBranch}
                    onChange={setGitRepoBranch}
                    title="branch:"
                />
                Settings
                <Input 
                    value={gitOwner}
                    onChange={setGitOwner}
                    title="owner:"
                />
                <Input 
                    value={gitToken}
                    onChange={setGitToken}
                    title="access token:"
                />
            </div>
            File:
            <div style={{display:"flex", gap: 3}}>

                <Select
                    value={editorFile}
                    onChange={setEditorFile}
                    title="open file"
                    values={repoFilesPaths}
                    id="repo-files"
                />
                <button onClick={onGetRepoData}>pull</button>
                <button onClick={onClickSaveFile} disabled={lastLoadedFile !== editorFile && repoFilesPaths?.includes(editorFile)}>save</button>
            </div>
            <div>editing {lastLoadedFile}</div>
        </div>
    )
}
export default GithubFiles;