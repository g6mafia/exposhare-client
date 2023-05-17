import "./UserDashboard.scss";

function UserDashboard({ handleLogout }) {
  return (
    <div className="user-dashboard__wrapper-1">
      <h1 className="user-dashboard__title">
        My Dashboard{" "}
        <button
          className="user-dashboard__button-logout"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </h1>
    </div>
  );
}

export default UserDashboard;
