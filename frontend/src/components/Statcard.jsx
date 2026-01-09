const StatCard = ({ title, value }) => {
  return (
    <div style={{
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "220px"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;
