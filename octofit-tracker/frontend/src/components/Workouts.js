import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching from API:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Workouts Data:', data);

        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container-main">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="mt-3">Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-main">
        <h2>Workouts</h2>
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    const difficultyLower = (difficulty || '').toLowerCase();
    if (difficultyLower === 'easy') return 'badge-success';
    if (difficultyLower === 'medium') return 'badge-warning';
    if (difficultyLower === 'hard') return 'badge-danger';
    return 'badge-info';
  };

  return (
    <div className="container-main">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Workouts</h2>
        <button className="btn btn-primary">+ Create Workout</button>
      </div>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-3">
                    <p className="mb-2">
                      <strong>Duration:</strong> <span className="badge badge-info">{workout.duration || '0'} mins</span>
                    </p>
                    <p className="mb-0">
                      <strong>Difficulty:</strong> <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>{workout.difficulty || 'N/A'}</span>
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-primary flex-fill">Start</button>
                    <button className="btn btn-sm btn-success flex-fill">Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No workouts found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
