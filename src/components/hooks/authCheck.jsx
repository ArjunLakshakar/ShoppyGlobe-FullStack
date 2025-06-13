import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, isTokenValid } from "./auth";
import { errorNotification } from "./NotificationService";

export function useAuthCheck() {
    const sessionNotified = useRef(false);
    const navigate = useNavigate();

    function checkAuth() {
        const token = localStorage.getItem('token'); // or wherever your token is stored

        if (!token) {
            clearToken();
            if (!sessionNotified.current) {
                errorNotification("Not Logged In", "Please log in to continue..");
                sessionNotified.current = true;
            }
            return false;
        }

        if (!isTokenValid()) {
            clearToken();
            if (!sessionNotified.current) {
                errorNotification("Session Expired", "Your session has ended. Please log in to continue.");
                sessionNotified.current = true;
            }
            navigate('/login');
            return false;
        }

        // Token is valid
        return true;
    }

    return { checkAuth };
}
