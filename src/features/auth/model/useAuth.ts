import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtAuthApi } from '@/features/auth';

export const useAuth = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            
            if (!accessToken) {
                // accessToken이 없으면 silentLogin 시도
                const response = await jwtAuthApi.silentLogin();
                localStorage.setItem('accessToken', response.accessToken);
                setIsAuthenticated(true);
                return;
            }

            setIsAuthenticated(true);
        } catch (error) {
            // silentLogin 실패 (refreshToken 만료 또는 없음)
            setIsAuthenticated(false);
            localStorage.removeItem('accessToken');
            if (window.location.pathname !== '/login') {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    return { isAuthenticated, isLoading };
}
