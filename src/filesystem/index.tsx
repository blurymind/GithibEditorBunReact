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
    disableSave
}) => {
    const [repoFiles, setRepoFiles] = useState([]);
    console.log({gitToken, repoFiles})

    useEffect(()=>{
        // requestUserRepos(gitOwner, console.log)
        //https://api.github.com/users/blurymind/repos/renjs-game-testbed/git/trees/main?recursive=1
        requestUserRepoFiles(gitOwner, gitRepo, gitRepoBranch, gitToken, res=>{
            console.log({res})
            setRepoFiles(res.tree)
        })
    }, [gitOwner, gitRepo, gitRepoBranch])

    //@ts-ignore
    const repoFilesPaths = repoFiles?.map(file=>file?.path)
    return (
        <div>
            <div>
                Repository
                <Input 
                    value={gitToken}
                    onChange={setGitToken}
                    title="access token:"
                />
                <Input 
                    value={gitOwner}
                    onChange={setGitOwner}
                    title="repo owner:"
                />
                <Input 
                    value={gitRepo}
                    onChange={setGitRepo}
                    title="repo name:"
                />
                <Input 
                    value={gitRepoBranch}
                    onChange={setGitRepoBranch}
                    title="repo branch:"
                />
                
            </div>
            <div style={{display:"flex", gap: 3}}>
                
                <Select
                    value={editorFile}
                    onChange={setEditorFile}
                    title="open file"
                    values={repoFilesPaths}
                    id="repo-files"
                />
                <button onClick={onGetRepoData}>pull</button>
                <button onClick={onSaveFile} disabled={disableSave}>save</button>
            </div>
        </div>
    )
}
export default GithubFiles;