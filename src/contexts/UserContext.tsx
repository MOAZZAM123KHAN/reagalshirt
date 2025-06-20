// // import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// // import axios from 'axios';
// // import { jwtDecode } from 'jwt-decode';
// // import { toast } from 'react-toastify';

// // interface User {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   isAdmin: boolean;
// // }

// // interface JwtPayload {
// //   id: string;
// //   email: string;
// //   name: string;
// //   isAdmin: boolean;
// // }

// // interface UserContextType {
// //   user: User | null;
// //   loading: boolean;
// //   login: (email: string, password: string) => Promise<void>;
// //   register: (name: string, email: string, password: string) => Promise<void>;
// //   logout: () => void;
// //   isAuthenticated: boolean;
// //   isAdmin: boolean;
// // }

// // const UserContext = createContext<UserContextType | undefined>(undefined);

// // interface UserProviderProps {
// //   children: ReactNode;
// // }

// // export const UserProvider = ({ children }: UserProviderProps) => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Check if user is logged in on mount
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       try {
// //         const decoded = jwtDecode<JwtPayload>(token);
// //         setUser({
// //           _id: decoded.id,
// //           name: decoded.name,
// //           email: decoded.email,
// //           isAdmin: decoded.isAdmin
// //         });
// //       } catch (error) {
// //         console.error('Invalid token:', error);
// //         localStorage.removeItem('token');
// //       }
// //     }
// //     setLoading(false);
// //   }, []);

// // //   const login = async (email: string, password: string) => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.post('/api/auth/login', { email, password });
// // //       const { token, user } = response.data;
      
// // //       localStorage.setItem('token', token);
// // //       setUser(user);
// // //       toast.success('Login successful!');
// // //       return user;
// // //     } catch (error) {
// // //       console.error('Login error:', error);
// // //       toast.error('Invalid credentials');
// // //       throw error;
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const register = async (name: string, email: string, password: string) => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.post('/api/auth/register', { name, email, password });
// // //       const { token, user } = response.data;
      
// // //       localStorage.setItem('token', token);
// // //       setUser(user);
// // //       toast.success('Registration successful!');
// // //       return user;
// // //     } catch (error) {
// // //       console.error('Registration error:', error);
// // //       toast.error('Registration failed');
// // //       throw error;
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('token');
// // //     setUser(null);
// // //     toast.success('Logged out successfully');
// // //   };

// // //   return (
// // //     <UserContext.Provider
// // //       value={{
// // //         user,
// // //         loading,
// // //         login,
// // //         register,
// // //         logout,
// // //         isAuthenticated: !!user,
// // //         isAdmin: user?.isAdmin || false
// // //       }}
// // //     >
// // //       {children}
// // //     </UserContext.Provider>
// // //   );
// // // };

// // // export const useUser = () => {
// // //   const context = useContext(UserContext);
// // //   if (context === undefined) {
// // //     throw new Error('useUser must be used within a UserProvider');
// // //   }
// // //   return context;
// // // };
// // const login = async (email: string, password: string) => {
// //   try {
// //     setLoading(true);
// //     const response = await axios.post
    
// //     (
// //       `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
// //       { email, password }
// //     );
// //     const { token, user } = response.data;

// //     localStorage.setItem('token', token);
// //     setUser(user);
// //     toast.success('Login successful!');
// //     return user;
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     toast.error('Invalid credentials');
// //     throw error;
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // const register = async (name: string, email: string, password: string) => {
// //   try {
// //     setLoading(true);
// //     const response = await axios.post(
// //       `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
// //       { name, email, password }
// //     );
// //     const { token, user } = response.data;

// //     localStorage.setItem('token', token);
// //     setUser(user);
// //     toast.success('Registration successful!');
// //     return user;
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     toast.error('Registration failed');
// //     throw error;
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     setUser(null);
// //     toast.success('Logged out successfully');
// //   };

// //   return (
// //     <UserContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         login,
// //         register,
// //         logout,
// //         isAuthenticated: !!user,
// //         isAdmin: user?.isAdmin || false
// //       }}
// //     >
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const useUser = () => {
// //   const context = useContext(UserContext);
// //   if (context === undefined) {
// //     throw new Error('useUser must be used within a UserProvider');
// //   }
// //   return context;
// // };

// import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { toast } from 'react-toastify';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   isAdmin: boolean;
// }

// interface JwtPayload {
//   id: string;
//   email: string;
//   name: string;
//   isAdmin: boolean;
// }

// interface UserContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   adminLogin: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode<JwtPayload>(token);
//         setUser({
//           _id: decoded.id,
//           name: decoded.name,
//           email: decoded.email,
//           isAdmin: decoded.isAdmin
//         });
//       } catch (error) {
//         console.error('Invalid token:', error);
//         localStorage.removeItem('token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:5000/api/login',
//         { email, password }
//       );
//       const { token, user } = response.data;

//       localStorage.setItem('token', token);
//       setUser(user);
//       toast.success('Login successful!');
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Invalid credentials');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const adminLogin = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:5000/api/admin/login',
//         { email, password }
//       );
//       const { token, user } = response.data;

//       localStorage.setItem('token', token);
//       setUser(user);
//       toast.success('Admin login successful!');
//     } catch (error) {
//       console.error('Admin login error:', error);
//       toast.error('Invalid admin credentials');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:5000/api/register',
//         { name, email, password }
//       );
//       const { token, user } = response.data;

//       localStorage.setItem('token', token);
//       setUser(user);
//       toast.success('Registration successful!');
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Registration failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     toast.success('Logged out successfully');
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         adminLogin,
//         register,
//         logout,
//         isAuthenticated: !!user,
//         isAdmin: user?.isAdmin || false
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };


import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
          _id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          isAdmin: decoded.isAdmin
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/auth/admin/login', // This must match your actual admin route
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Admin login successful!');
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Invalid admin credentials');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        adminLogin,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
