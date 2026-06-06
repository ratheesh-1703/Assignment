import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { currentUser, updateProfileImage } = useAuth();
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');
  const user = currentUser || {
    fullName: 'Marry Doe',
    email: 'Marry@Gmail.Com',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    profileImage: '',
  };

  const avatarSrc = user.profileImage || '/profile-avatar.svg';

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      event.target.value = '';
      return;
    }

    setUploadError('');

    const reader = new FileReader();
    reader.onload = () => {
      updateProfileImage(typeof reader.result === 'string' ? reader.result : '');
    };
    reader.onerror = () => setUploadError('Unable to load that image.');
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <main className="screen">
      <section className="screen__content screen__content--profile">
        <header className="page-header page-header--profile">
          <h1 className="page-title page-title--compact">Account Settings</h1>
        </header>

        <div className="profile-info-block">
          <section className="profile-card">
            <button
              className="profile-card__avatar-button"
              type="button"
              onClick={handleAvatarClick}
              aria-label="Change profile picture"
            >
              <img className="profile-card__avatar" src={avatarSrc} alt="Profile avatar" />
              <span className="profile-card__avatar-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="profile-card__camera-icon" role="presentation" focusable="false">
                  <path d="M9.5 5.5 11 4h2l1.5 1.5H17a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h2.5Zm2.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                </svg>
              </span>
            </button>
            <input
              ref={fileInputRef}
              className="profile-card__file-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <div className="profile-card__body">
              <h2 className="profile-card__name">{user.fullName}</h2>
              <p className="profile-card__email">{user.email}</p>
            </div>
          </section>

          {uploadError ? <p className="form__error profile-copy--error">{uploadError}</p> : null}
          <p className="profile-copy">Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam</p>
        </div>

        <div className="dotted-divider" aria-hidden="true" />
      </section>
    </main>
  );
}