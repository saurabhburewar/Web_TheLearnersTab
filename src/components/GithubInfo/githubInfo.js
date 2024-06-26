/*global chrome*/ 
import { useEffect, useState } from "react";
import "./githubInfo.css";
import axios, * as others from "axios";


export default function GithubInfo() {

    const [gitfilter, setGitfilter] = useState("Repo");
    const [userGit, setUserGit] = useState("");
    const [repos, setRepos] = useState([]);
    const [gists, setGists] = useState([]);
    const [issues, setIssues] = useState([]);
    const [prs, setPrs] = useState([]);

    useEffect(() => {
        chrome.storage.sync.get("LTGithub", (result) => {
            if(result.LTGithub) {
                setUserGit(result.LTGithub)
            }
        })

        if (userGit !== "") {
            axios
            .get(`https://api.github.com/users/${userGit}/repos?type=all`)
            .then((resp) => {
                setRepos(resp.data)
            });

            axios
                .get(`https://api.github.com/users/${userGit}/gists`)
                .then((resp) => {
                    setGists(resp.data)
                });
        }

        chrome.history.search({ text: "github.com/*/issues", startTime: 0, maxResults: 10 }, (historyItems) => {
            setIssues(historyItems)
        })

        chrome.history.search({ text: "github.com/*/pulls", startTime: 0, maxResults: 10 }, (historyItems) => {
            setPrs(historyItems)
        })
        
    }, [userGit])

    return (
        <div className="githubPage">
            <div className="githubBox">
                <div className="githubNav">
                    <div className="githubNavItem">
                        <div className="githubNavButBox">
                            <div className="githubNavBut1" onClick={() => {setGitfilter("Repo")}}>Repos</div>
                            <div className="githubNavBut1" onClick={() => {setGitfilter("Gist")}}>Gists</div>
                        </div>
                        <div className="githubNavIcon">
                            <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.55 427.82" fill={"#fff"}><title>github</title><path class="cls-1" d="M409.13,114.57a218.32,218.32,0,0,0-79.8-79.8Q278.94,5.36,219.27,5.36T109.21,34.77a218.29,218.29,0,0,0-79.8,79.8Q0,165,0,224.63,0,296.3,41.83,353.54t108.06,79.23q7.71,1.43,11.42-2A11.17,11.17,0,0,0,165,422.2q0-.86-.14-15.42t-.14-25.41l-6.57,1.14a83.77,83.77,0,0,1-15.85,1,120.73,120.73,0,0,1-19.84-2A44.34,44.34,0,0,1,103.35,373,36.23,36.23,0,0,1,90.79,355.4l-2.86-6.57a71.34,71.34,0,0,0-9-14.56q-6.14-8-12.42-10.85l-2-1.43a21,21,0,0,1-3.71-3.43,15.66,15.66,0,0,1-2.57-4q-.86-2,1.43-3.29C61.2,310.42,64,310,68,310l5.71.85q5.71,1.14,14.13,6.85a46.08,46.08,0,0,1,13.85,14.84q6.57,11.71,15.85,17.85t18.7,6.14a81.19,81.19,0,0,0,16.27-1.42,56.78,56.78,0,0,0,12.85-4.29q2.57-19.14,14-29.41A195.49,195.49,0,0,1,150,316.28a116.52,116.52,0,0,1-26.83-11.14,76.86,76.86,0,0,1-23-19.13q-9.14-11.42-15-30T79.37,213.2q0-34.55,22.56-58.82-10.57-26,2-58.24,8.28-2.57,24.55,3.85t23.84,11q7.57,4.56,12.13,7.71a206.2,206.2,0,0,1,109.64,0l10.85-6.85A153.65,153.65,0,0,1,311.2,99.29q15.13-5.71,23.13-3.14,12.84,32.26,2.28,58.24,22.55,24.27,22.56,58.82,0,24.27-5.85,43t-15.12,30a79.82,79.82,0,0,1-23.13,19,116.74,116.74,0,0,1-26.84,11.14A195.29,195.29,0,0,1,259,321.42Q273.8,334.26,273.81,362V422.2a11.37,11.37,0,0,0,3.57,8.56q3.57,3.42,11.28,2,66.24-22,108.07-79.23t41.83-128.91Q438.53,165,409.13,114.57Z" transform="translate(0 -5.36)"/></svg>
                        </div>
                        <div className="githubNavButBox">
                            <div className="githubNavBut2" onClick={() => {setGitfilter("Issue")}}>Issues</div>
                            <div className="githubNavBut2" onClick={() => {setGitfilter("PR")}}>PRs</div>
                        </div>
                    </div>
                </div>
                <div className="gitListBox">
                    {gitfilter === "Repo" ? (
                        <div className="gitList">
                            {repos.map((repo) => (
                                <div className="repoItem">
                                    <a className="repoText" href={repo.html_url}>
                                        {repo.name}
                                    </a>
                                    <br />
                                    <a className="repoauthor" href={repo.owner.html_url}><i>Owner: {repo.owner.login}</i></a>
                                    <div className="repoissues">
                                        {repo.open_issues_count ? (
                                            <svg id="e39158ec-8681-4fd1-9ec3-4be92eb00fbf" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#4fba6e"}><title>issues</title><path class="0917861a-c670-41e6-bcd4-d53185b8375a" d="M9.14,152.6c0-82,67.66-144.89,145.69-143.45C232.4,10.58,296.52,73.78,295.51,154A143,143,0,0,1,149.9,295.53C72.79,294.26,9.67,231.71,9.14,152.6Zm271.24-.42c0-69.71-57.42-128-126.14-128-72.33,0-130,56.59-130.07,127.63s57.48,128.57,128.2,128.58C222.73,280.39,280.38,222.66,280.37,152.18Z"/><path class="ef6ffb72-eb63-4b16-a8b2-e3d3033b072c" d="M131.12,79.14c-.49-15.06,8-25.22,21.14-25.3,11.51-.06,22.11,10.1,21.65,21.66-.88,21.78-2.31,43.54-3.49,65.31-.61,11.3-1,22.62-1.85,33.91-.76,10.12-7.05,16.22-16.09,16.27-8.36,0-14.67-4.85-15.47-13.19-1.25-12.91-1.85-25.89-2.6-38.84C133.25,119,132.21,99.09,131.12,79.14Z"/><path class="ef6ffb72-eb63-4b16-a8b2-e3d3033b072c" d="M151.89,251.15c-11.67-.16-20.13-9.11-19.9-21a20.24,20.24,0,0,1,20.65-20,20.51,20.51,0,1,1-.75,41Z"/></svg>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : gitfilter === "Gist" ? (
                        <div className="gitList">
                            {gists.map((gist) => (
                                <a className="gistsText" href={gist.html_url}>
                                    {gist.description !== "" ? gist.description : Object.keys(gist.files)[0]}
                                </a>
                            ))}
                        </div>
                    ) : gitfilter === "Issue" ? (
                        <div className="gitList">
                            {issues.map((issue) => (
                                <a className="issueText" href={issue.url}>{issue.title}</a>
                            ))}
                        </div>
                    ) : gitfilter === "PR" ? (
                        <div className="gitList">
                            {prs.map((pr) => (
                                <a className="prText" href={pr.url}>{pr.title}</a>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}