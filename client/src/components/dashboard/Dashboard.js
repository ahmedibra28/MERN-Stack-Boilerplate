import React from "react";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const loading = true;
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <code className="text-center">her is the dashboard</code>
    </div>
  );
};

export default Dashboard;
