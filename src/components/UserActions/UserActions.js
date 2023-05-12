import "./UserActions.scss"




function UserActions({ handleLogout, handleDeleteUser }) {
    return (
      <div className="user-actions__wrapper-button">
        <button
          className="user-actions__button-logout"
          onClick={handleLogout}
        >
          Log Out
        </button>
  
        <button
          className="user-actions__button-delete"
          onClick={handleDeleteUser}
        >
          Delete My Account
        </button>
      </div>
    );
  }


  export default UserActions;