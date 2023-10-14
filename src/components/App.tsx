import { useState, useEffect } from 'react';

import '../styles/App.css';
import RepositoryInformation from './RepositoryInformation.tsx';
import BranchSelect from './BranchSelect.tsx';


function App() {
  const [repositoryURL, setRepositoryURL] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    if (repositoryURL) {
      setLoading(true);
      setError(null);
      
      const parsedURL = new URL(repositoryURL);
      const repositoryVSC = parsedURL.hostname.split('.')[0];
      const repositoryOwner = parsedURL.pathname.split('/')[1];
      const repositoryName = parsedURL.pathname.split('/')[2];

      fetch(
        `http://localhost:3000/api/${repositoryVSC}/${repositoryOwner}/${repositoryName}/inspect`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .then((data) => {
          setData(data);
          setLoading(false);
          return data;
        })
        .then((data) => {
          fetch(
            `http://localhost:3000/api/${repositoryVSC}/${repositoryOwner}/${repositoryName}/branches`
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Failed to fetch branches');
              }
            })
            .then((branches) => {
              setBranches(branches);
              const selectedBranch = branches.find((branch: { name: any; }) => branch.name === data.default_branch) ?? branches[0];
              setSelectedBranch(selectedBranch?.name ?? '');
            })
            .catch((error) => {
              setError(error);
              setLoading(false);
            });
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [repositoryURL]);

  return (
    <>
      <input type="button" value="Test" className='btn' onClick={() => setRepositoryURL('https://github.com/oven-sh/bun')} />
      <div className="card">
        <input
          type="text"
          className="input input-bordered input-accent w-full max-w-xs"
          placeholder="Enter a repository URL"
          onChange={(e) => setRepositoryURL(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="flex items-center my-2">
        <div>
          <RepositoryInformation data={data} />
        </div>
        <div>
          <BranchSelect
            branches={branches}
            selectedBranch={selectedBranch}
            onBranchSelect={setSelectedBranch}
            />
        </div>
      </div>
      <p className="read-the-source">
        Check the source code at{' '}
        <a href="https://github.com/ChoqueCastroLD/vcs-commit-explorer-frontend" target="_blank">
          Github
        </a>
      </p>
    </>
  );
}

export default App;
