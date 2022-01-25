import { createContext, useContext, useReducer, useState } from 'react';

const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload.user };
    case 'logout':
      return { ...state, user: null };
    default:
      throw new Error(`Uhnandled action type: ${action.type}`);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  function login(user) {
    dispatch({
      type: 'login',
      payload: { user },
    });
  }

  function logout() {
    dispatch({
      type: 'logout',
    });
  }

  const value = {
    user: state.user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const state = useContext(AuthContext);

  if (state === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider.');
  }

  return { ...state };
}
