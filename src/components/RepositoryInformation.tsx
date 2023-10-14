import React from 'react';


const RepositoryInformation = ({ data }) => {
  if (!data) {
    return null; // No hay datos para mostrar.
  }

  return (
    <>
      <a href={data.owner_url} target="_blank">
        <div className="flex items-center my-2">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={data.owner_avatar_url} />
            </div>
          </div>
          <div>
            <strong className='ms-2'>{data.owner}</strong>
          </div>
        </div>
      </a>
      
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
    </>
  );
};

export default RepositoryInformation;
