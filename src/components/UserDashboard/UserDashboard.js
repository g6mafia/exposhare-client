import "./UserDashboard.scss";




function UserDashboard({setEditForm}) {
    return (
      <div className="profile-page__wrapper-1">
        <h1 className="profile-page__title">
          My Dashboard{" "}
          <button className="profile-page__button-edit" onClick={() => setEditForm(true)}>
            Edit Profile
          </button>
        </h1>
      </div>
    );
  }


  export default UserDashboard;