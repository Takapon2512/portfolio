import React, { useContext, useEffect, useState } from "react";

//type
import { ResUserType } from "@/types/globaltype";

//lib
import { apiClient_multi } from "@/lib/apiClient";
import apiClient from "@/lib/apiClient";

interface AuthContextType {
    user: ResUserType | null;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<ResUserType | null>(null);

    useEffect(() => {
        const cookie: string = document.cookie;
        const token: string = cookie.split("=")[1];
        if (token) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
            apiClient_multi.defaults.headers["Authorization"] = `Bearer ${token}`;
            apiClient.get("/users/find").then((res) => {
                setUser(res.data.user);
            }).catch((err) => {
                console.error(err);
            });

            apiClient.get("/posts/db_search");
        }
    }, []);

    const login = async (token: string) => {
        document.cookie = `auth_token=${token};`;

        try {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
            apiClient_multi.defaults.headers["Authorization"] = `Bearer ${token}`;
            apiClient.get("/users/find").then(res => setUser(res.data.user));
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        document.cookie = "auth_token=; max-age=0"
        delete apiClient.defaults.headers["Authorization"];
        setUser(null);
    };

    const value: AuthContextType = {
        user: user,
        login: login,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
};