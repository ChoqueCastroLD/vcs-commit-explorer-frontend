export type Repository = {
    owner: string;
    owner_avatar_url: string;
    owner_url: string;
    name: string;
    description: string;
    stars: number;
    watchers: number;
    forks: number;
    language: string;
    default_branch: string;
    license_name?: string;
    license_url?: string;
    fork: boolean;
    created_at: string;
    updated_at: string;
};

export type Branch = {
    name: string;
    sha: string;
};

export type Commit = {
    sha: string;
    node_id: string;
    message: string;
    author_name: string;
    author_email: string;
    committer_name: string;
    committer_email: string;
    parents: string[];
};
