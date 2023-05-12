import "./UserProfile.scss"


function UserProfile({ profileData }) {

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US");
      };

      
    return (
      <div className="profile-page__wrapper-2">
        <p className="profile-page__welcome-text">
          Hello, {profileData.first_name} {profileData.last_name}
        </p>
        <div className="profile-page__wrapper-2">
          <p className="profile-page__subtitle">
            <img
              className="profile-page__avatar"
              src={profileData.avatar_url}
              alt={`${profileData.username} avatar`}
            />{" "}
            {profileData.username}
          </p>
  
          <p className="profile-page__bio">Bio: {profileData.bio} </p>
          <p className="profile-page__info">
            {" "}
            Joined in {formatDate(profileData.updated_at)}
          </p>
        </div>
      </div>
    );
  }


  export default UserProfile;