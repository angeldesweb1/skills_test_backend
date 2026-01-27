export interface AuthResponseSuccess {
  success: boolean;
  token: string;
  user: {
    uuid: string;
    email: string;
  };
  error: null;
}

export interface AuthResponseError {
  success: boolean;
  token: null;
  user: null;
  error: string;
}

export type AuthResponse = AuthResponseSuccess | AuthResponseError;
