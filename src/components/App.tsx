import { useState, useEffect } from 'react';

import '../styles/App.css';
import RepositoryInformation from './RepositoryInformation.tsx';


function App() {
  const [repositoryURL, setRepositoryURL] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (repositoryURL) {
      setLoading(true);
      setError(null);

      fetch(
        `http://localhost:3000/api/github/ChoqueCastroLD/vcs-commit-explorer-api/inspect?repo=${repositoryURL}`
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
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [repositoryURL]);

  return (
    <>
      <input type="button" value="Test" className='btn' onClick={() => setRepositoryURL('https://github.com/ChoqueCastroLD/vcs-commit-explorer-api')} />
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
      <RepositoryInformation data={data} />
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
