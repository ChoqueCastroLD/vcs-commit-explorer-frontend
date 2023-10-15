import { useEffect, useState } from "react";

import "../styles/App.css";
import ApiService from "../services/api";
import RepositoryInformation from "./RepositoryInformation.tsx";
import BranchSelect from "./BranchSelect.tsx";
import CommitsList from "./CommitsList.tsx";


function App() {
  const [repositoryURL, setRepositoryURL] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (repositoryURL) {
        setLoading(true);
        setError(null);

        const parsedURL = new URL(repositoryURL);
        const repositoryVCS = parsedURL.hostname.split(".")[0];
        const repositoryOwner = parsedURL.pathname.split("/")[1];
        const repositoryName = parsedURL.pathname.split("/")[2];

        try {
          const repositoryData = await ApiService.fetchRepository(
            repositoryVCS,
            repositoryOwner,
            repositoryName,
          );
          setData(repositoryData);
          setLoading(false);

          const repositoryBranches = await ApiService.fetchBranches(
            repositoryVCS,
            repositoryOwner,
            repositoryName,
          );
          setBranches(repositoryBranches);

          const selectedBranch = repositoryBranches.find(
            (branch) => branch.name === repositoryData.default_branch,
          );
          setSelectedBranch(selectedBranch?.name ?? "");
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [repositoryURL]);

  useEffect(() => {
    const fetchCommits = async () => {
      if (selectedBranch) {
        const parsedURL = new URL(repositoryURL);
        const repositoryVCS = parsedURL.hostname.split(".")[0];
        const repositoryOwner = parsedURL.pathname.split("/")[1];
        const repositoryName = parsedURL.pathname.split("/")[2];

        try {
          const branchCommits = await ApiService.fetchCommits(
            repositoryVCS,
            repositoryOwner,
            repositoryName,
            selectedBranch,
          );
          setCommits(branchCommits);
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchCommits();
  }, [selectedBranch, repositoryURL]);

  return (
    <>
      <div className="card">
        <input
          type="text"
          className="input input-bordered input-accent text-center w-full max-w"
          placeholder="Enter a repository URL"
          onChange={(e) => setRepositoryURL(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 m-6">
        <div>
          <RepositoryInformation data={data} />
        </div>
        <div>
          <BranchSelect
            branches={branches}
            selectedBranch={selectedBranch}
            onBranchSelect={setSelectedBranch}
          />
          <CommitsList commits={commits} />
        </div>
      </div>
    </>
  );
}

export default App;
