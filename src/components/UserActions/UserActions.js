import "./UserActions.scss"




function UserActions({ handleDeleteUser }) {
    return (
      <div className="user-actions__wrapper-button">
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