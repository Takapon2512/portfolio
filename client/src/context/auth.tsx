import React, { useContext } from "react";

interface AuthContextType {
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const login = async (token: string) => {
        document.cookie = `auth_token=${token}; secure`;
    };

    const logout = () => {
        document.cookie = "auth_token=";
    };

    const value: AuthContextType = {
        login: login,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
};