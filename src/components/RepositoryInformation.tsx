const RepositoryInformation = ({ data }) => {
  if (!data) {
    return null; // No hay datos para mostrar por defecto.
  }

  return (
    <>
      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Stars ⭐</div>
          <div className="stat-value">{data.stars}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Watchers 👀</div>
          <div className="stat-value">{data.watchers}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Forks 🍴</div>
          <div className="stat-value">{data.forks}</div>
        </div>
      </div>

      {/* Owner */}
      <div className="flex items-center m-6">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={data.owner_avatar_url} />
          </div>
        </div>
        <div>
          <strong className="ms-2">{data.owner}</strong>
        </div>
      </div>

      {/* Repository */}
      <div className="text-left">
        <p>
          <strong>Repository:</strong> {data.name}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Primary Language:</strong> {data.language}
        </p>
        <br />
        <p>
          <strong>Created at:</strong> {data.created_at}
        </p>
        <p>
          <strong>Updated at:</strong> {data.updated_at}
        </p>
      </div>
    </>
  );
};

export default RepositoryInformation;
