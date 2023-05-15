import "./EditUserForm.scss";

function EditUserForm({
  profileData,
  handleEditUser,
  setEditUserForm,
  handleImageUpload,
}) {
  
  return (
    <>
      <div className="edit-user__overlay"></div>
      <div className="edit-user">
        <form className="edit-user__form" onSubmit={handleEditUser}>
          <p className="edit-user__title">
            Edit Your Information:{" "}
          </p>
          <div className="edit-user__container-input">
            <div className="edit-user__wrapper-1">
              <label htmlFor="username" className="edit-user__label">
                Username:
              </label>
              <input
                className="edit-user__input"
                type="text"
                id="username"
                name="username"
                defaultValue={profileData.username}
              />

              <label htmlFor="password" className="edit-user__label">
                Password (optional):
              </label>
              <input
                className="edit-user__input"
                type="password"
                id="password"
                name="password"
              />

              <label htmlFor="first_name" className="edit-user__label">
                First Name:
              </label>
              <input
                className="edit-user__input"
                type="text"
                id="first_name"
                name="first_name"
                defaultValue={profileData.first_name}
              />

              <label htmlFor="last_name" className="edit-user__label">
                Last Name:
              </label>
              <input
                className="edit-user__input"
                type="text"
                id="last_name"
                name="last_name"
                defaultValue={profileData.last_name}
              />
            </div>
            <div className="edit-user__wrapper-2">
              <label htmlFor="email" className="edit-user__label">
                Email:
              </label>
              <input
                className="edit-user__input"
                type="email"
                id="email"
                name="email"
                defaultValue={profileData.email}
              />
              <label htmlFor="address" className="edit-user__label">
                Address:
              </label>
              <input
                className="edit-user__input"
                type="text"
                id="address"
                name="address"
                defaultValue={profileData.address}
              />
              <label htmlFor="bio" className="edit-user__label">
                Bio:
              </label>
              <input
                className="edit-user__input"
                type="textarea"
                id="bio"
                name="bio"
                defaultValue={profileData.bio}
              />
              <label htmlFor="avatar_url" className="edit-user__label">
                Avatar URL:
              </label>
              <input
                className="edit-user__input"
                type="file"
                id="avatar_url"
                name="avatar_url"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="edit-user__container-button">
            <button type="submit" className="edit-user__button-submit">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditUserForm(false)}
              className="edit-user__button-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserForm;
