import { Repository, Branch, Commit } from "../types/api.ts";


const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

async function fetchJSON(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        return response.json();
    } else {
        throw new Error('Invalid response format: Expected JSON');
    }
}

export default {
    async fetchRepository(vcs: string, owner: string, repository: string): Promise<Repository> {
        const apiUrl = `${BASE_URL}/api/${vcs}/${owner}/${repository}/inspect`;
        return fetchJSON(apiUrl);
    },
    async fetchBranches(vcs: string, owner: string, repository: string): Promise<Branch[]> {
        const apiUrl = `${BASE_URL}/api/${vcs}/${owner}/${repository}/branches`;
        return fetchJSON(apiUrl);
    },
    async fetchCommits(vcs: string, owner: string, repository: string, sha: string): Promise<Commit[]> {
        const apiUrl = `${BASE_URL}/api/${vcs}/${owner}/${repository}/commits/${sha}`;
        return fetchJSON(apiUrl);
    }
};
