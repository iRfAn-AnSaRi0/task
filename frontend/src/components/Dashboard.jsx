import { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardRes = await api.get("/dashboard");
        const treeRes = await api.get("/referral-tree");

        setData(dashboardRes.data.data);
        setTree(treeRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <StatCard title="Total Investment" value={data.totalInvestment} />
        <StatCard title="Daily ROI" value={data.dailyROI} />
        <StatCard title="Level Income" value={data.levelIncome} />
      </div>

      <ReferralTree data={tree} />
    </div>
  );
};

export default Dashboard;
