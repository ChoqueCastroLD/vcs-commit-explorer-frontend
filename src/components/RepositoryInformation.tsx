import { Repository } from "../types/api.ts";


type RepositoryInformationProps = {
  repository: Repository | null;
};
function RepositoryInformation({ repository }: RepositoryInformationProps) {
  const updated_at = (new Date(repository?.updated_at || "")).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return repository && (
    <>
      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Stars ⭐</div>
          <div className="stat-value">{repository.stars}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Watchers 👀</div>
          <div className="stat-value">{repository.watchers}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Forks 🍴</div>
          <div className="stat-value">{repository.forks}</div>
        </div>
      </div>

      {/* Owner */}
      <div className="flex items-center m-6">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={repository.owner_avatar_url} />
          </div>
        </div>
        <div>
          <strong className="ms-2">{repository.owner}</strong>
        </div>
      </div>

      {/* Repository */}
      <div className="text-left">
        <h4>{repository.name}</h4>
        <p>{repository.description}</p>
        <p>
          <strong>Primary Language:</strong> {repository.language}
          <br />
          <strong>Last Update:</strong> {updated_at}
        </p>
      </div>
    </>
  );
};

export default RepositoryInformation;
