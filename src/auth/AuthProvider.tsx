/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/user";
import { useLoginMutation } from "../redux/services/authApi";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  data,
  children,
}: {
  data: any;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(data);
  const [loginApi] = useLoginMutation();
  const navigate = useNavigate();

  const value = useMemo(() => {
    const handleLogin = async (data: any) => {
      try {
        const result = await loginApi({ ...data }).unwrap();

        setUser(result);
        navigate("/");
        return result;
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    };

    const handleLogout = async () => {
      try {
        setUser(null);

        navigate("/login");
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    };

    return {
      user,
      handleLogin,
      handleLogout,
    };
  }, [loginApi, navigate, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
