import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/get-builds");
      setBuilds(response.data.builds);
    } catch (error) {
      console.error("Error fetching builds:", error);
    }
    setLoading(false);
  };

  const triggerBuild = async () => {
    setLoading(true);
    try {
      await axios.post("/api/trigger-build");
      fetchBuilds();
    } catch (error) {
      console.error("Error triggering build:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Google Cloud Build - CI/CD Dashboard</h1>
      <button onClick={triggerBuild} disabled={loading}>
        {loading ? "Triggering..." : "Trigger Build"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Build ID</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {builds.map((build) => (
            <tr key={build.id}>
              <td>{build.id}</td>
              <td style={{ color: build.status === "SUCCESS" ? "green" : "red" }}>
                {build.status}
              </td>
              <td>{new Date(build.createTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
