import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching from API:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Teams Data:', data);

        // Handle both paginated and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container-main">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="mt-3">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-main">
        <h2>Teams</h2>
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-main">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Teams</h2>
        <button className="btn btn-primary">+ Create Team</button>
      </div>
      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description}</p>
                  <div className="mb-3">
                    <span className="badge badge-info">Members: {team.members_count || 0}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-primary flex-fill">View Team</button>
                    <button className="btn btn-sm btn-success flex-fill">Join</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No teams found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
