import { createContext, useContext, useMemo, useState } from 'react';

const PROFILE_KEY = 'popx.profile';
const SESSION_KEY = 'popx.session';

const AuthContext = createContext(null);

function safeParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function loadStoredProfile() {
  if (typeof window === 'undefined') {
    return null;
  }

  const profile = safeParse(window.localStorage.getItem(PROFILE_KEY));
  if (profile && (profile.fullName === 'PopX User' || profile.email === 'hello@popx.app')) {
    window.localStorage.removeItem(PROFILE_KEY);
    return null;
  }
  return profile;
}

function loadStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  const session = safeParse(window.localStorage.getItem(SESSION_KEY));
  if (session && (session.fullName === 'PopX User' || session.email === 'hello@popx.app')) {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

function saveItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function buildDescription(profile) {
  if (!profile) {
    return 'Your PopX profile is ready.';
  }

  const companyName = profile.companyName?.trim();
  if (companyName) {
    return `Account created for ${profile.fullName} at ${companyName}.`;
  }

  return `Account created for ${profile.fullName}.`;
}

function normalizeProfile(profile, source) {
  const fullName = profile.fullName?.trim() || profile.email?.split('@')[0] || 'Marry Doe';

  return {
    fullName,
    phoneNumber: profile.phoneNumber?.trim() || '',
    email: profile.email?.trim() || 'Marry@Gmail.Com',
    password: profile.password || '',
    companyName: profile.companyName?.trim() || '',
    agency: profile.agency || 'No',
    description: profile.description?.trim() || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    profileImage: profile.profileImage || '',
    source,
  };
}

export function AuthProvider({ children }) {
  const [savedProfile, setSavedProfile] = useState(() => loadStoredProfile());
  const [currentUser, setCurrentUser] = useState(() => loadStoredSession() || loadStoredProfile());

  const signup = (profile) => {
    const nextProfile = normalizeProfile(profile, 'signup');
    setSavedProfile(nextProfile);
    setCurrentUser(nextProfile);
    saveItem(PROFILE_KEY, nextProfile);
    saveItem(SESSION_KEY, nextProfile);
    return nextProfile;
  };

  const login = (email, password) => {
    const storedProfile = savedProfile || loadStoredProfile();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();

    if (storedProfile) {
      const profileEmail = storedProfile.email.trim().toLowerCase();
      const profilePassword = storedProfile.password;

      if (profileEmail !== sanitizedEmail || profilePassword !== sanitizedPassword) {
        return { success: false, message: 'Email or password is incorrect.' };
      }

      setCurrentUser(storedProfile);
      saveItem(SESSION_KEY, storedProfile);
      return { success: true, user: storedProfile };
    }

    const fallbackUser = normalizeProfile(
      {
        fullName: sanitizedEmail.split('@')[0] || 'PopX User',
        email: sanitizedEmail,
        password: sanitizedPassword,
        description: `Signed in as ${sanitizedEmail}.`,
      },
      'login',
    );

    setSavedProfile(fallbackUser);
    setCurrentUser(fallbackUser);
    saveItem(PROFILE_KEY, fallbackUser);
    saveItem(SESSION_KEY, fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const logout = () => {
    setCurrentUser(null);
    window.localStorage.removeItem(SESSION_KEY);
  };

  const updateProfileImage = (profileImage) => {
    const nextUser = currentUser ? { ...currentUser, profileImage } : null;

    if (nextUser) {
      setCurrentUser(nextUser);
      setSavedProfile(nextUser);
      saveItem(PROFILE_KEY, nextUser);
      saveItem(SESSION_KEY, nextUser);
    }

    return nextUser;
  };

  const value = useMemo(
    () => ({
      currentUser,
      signup,
      login,
      logout,
      updateProfileImage,
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}