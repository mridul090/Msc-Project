import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/logs/views/')
      .then(response => {
        setLogs(response.data); 
        console.log("Fetched Data:", response.data);
      })
      .catch(error => {
        console.error('Error fetching Data:', error);
      });
  }, []);


  const renderChangeMessage = (changeMessage) => {
    try {
      const changes = JSON.parse(changeMessage); 
      if (Array.isArray(changes)) {
        return changes.map(change => {
          if (change.added) {
            return "Added new item";
          } else if (change.changed) {
            return `Changed fields: ${change.changed.fields.join(", ")}`;
          }
          return null;
        }).join(", ");
      }
    } catch (error) {
      return changeMessage; 
    }
  };

  return (
    <div className="dashboard">
      <div className='LogList'>
        <div className='LogList-nav'>
          <h3>Recent Actions</h3>
        </div>
        <div className='LogList-body'>
          <ul>
            {logs.length > 0 ? logs.map((log) => (
              <li key={log.id} className={`log-item ${log.action.toLowerCase()}`}>
                <div className="log-action-time">{new Date(log.action_time).toLocaleString()}</div>
                <div className="log-user"><strong>{log.user_details}</strong></div>
                <div className="log-action">{log.action}</div>
                <div className="log-object">{log.object_repr}</div>
                <div className="log-message">{renderChangeMessage(log.change_message)}</div>
              </li>
            )) : <li>No recent actions to show</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
