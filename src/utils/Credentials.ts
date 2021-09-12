import {USERNAMES_ENUM, VALID_PASSWORD, VALID_USERNAMES} from './Constants';

type CredentialsType = {
  username: string;
  password: string;
};

function verifyCredentials({username, password}: CredentialsType): boolean {
  if (password !== VALID_PASSWORD) {
    return false;
  }

  return VALID_USERNAMES.includes(username as USERNAMES_ENUM);
}

function isLockedOutUser({username}: {username: string}) {
  return username === USERNAMES_ENUM.LOCKED_OUT_USER;
}

export {isLockedOutUser, verifyCredentials};
