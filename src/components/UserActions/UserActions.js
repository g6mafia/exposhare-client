import "./UserActions.scss"




function UserActions({ handleLogout, handleDeleteUser }) {
    return (
      <div className="profile-page__wrapper-3">
        <button
          className="profile-page__button-logout"
          onClick={handleLogout}
        >
          Log Out
        </button>
  
        <button
          className="profile-page__button-delete"
          onClick={handleDeleteUser}
        >
          Delete My Account
        </button>
      </div>
    );
  }


  export default UserActions;