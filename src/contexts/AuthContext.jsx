// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitorar estado de autenticação (Persistência)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Mapear dados do Firebase para o formato do app
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuário',
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          // Lógica simples para definir admin (idealmente viria do Firestore)
          role: firebaseUser.email === 'admin@finaestampa.com' ? 'admin' : 'customer'
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login Email/Senha
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Cadastro (Para usar na página de registro)
  const register = async (name, email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // Atualizar nome do usuário logo após criar
    await updateProfile(res.user, { displayName: name });
    return res;
  };

  // Login Google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};