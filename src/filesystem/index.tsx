import React, { useEffect } from "react";

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
}) => {

    console.log({gitToken})

    useEffect(()=>{
        // requestUserRepos(gitOwner, console.log)
        //https://api.github.com/users/blurymind/repos/renjs-game-testbed/git/trees/main?recursive=1
        requestUserRepoFiles(gitOwner, gitRepo, gitRepoBranch, gitToken, console.log)
    }, [gitOwner, gitRepo, gitRepoBranch])

    return (
        <div>
            <div>
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
            <div>
            File list
            </div>
        </div>
    )
}
export default GithubFiles;