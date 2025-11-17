export default function StatCard({ title, value, icon, color }) {
  return (
    <div className={`admin-stat-card admin-stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}