import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "../Interfaces/IUser";

interface IAuthContextType {
    user: IUser | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<IUser>(token);
            setUser(decoded);
        }
    }, []);

    function login(token: string) {
        localStorage.setItem("token", token);
        setUser(jwtDecode(token));
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): IAuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
}