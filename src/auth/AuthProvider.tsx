import React, { createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IUser } from "../interfaces/i-user";
import { useLoginMutation, useLogoutMutation } from "../redux/services/authApi";
import { ILogin } from "../interfaces/i-auth";

export const AuthContext = createContext<{
  user: IUser | null;
  handleLogin: (data: any) => Promise<any>;
  handleLogout: () => Promise<any>;
} | null>(null);

export const AuthProvider = ({
  data,
  children,
}: {
  data: any;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(data);
  const [loginApi] = useLoginMutation();
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();

  const value = useMemo(() => {
    const handleLogin = async (data: ILogin) => {
      try {
        const result = await loginApi(data).unwrap();
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
        await logoutApi("").unwrap();
      } catch (err: any) {
        console.error(err);
      }
      setUser(null);
      navigate("/login");
    };

    return {
      user,
      handleLogin,
      handleLogout,
    };
  }, [loginApi, navigate, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
