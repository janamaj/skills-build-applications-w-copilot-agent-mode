import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
      console.log('Fetching from API:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Activities Data:', data);

        // Handle both paginated and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container-main">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="mt-3">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-main">
        <h2>Activities</h2>
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-main">
      <h2>Activities</h2>
      <div className="row">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">{activity.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{activity.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge badge-info">ID: {activity.id}</span>
                    <button className="btn btn-sm btn-primary">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No activities found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
