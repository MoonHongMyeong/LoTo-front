import { AuthDto } from '@/entities/auth';
import { jwtAuthApi } from '@/features/auth';
import { ApiResponse } from '@/shared/api/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth';

export const useAuth = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isLoading: true
    });
    const { setAuth, clearAuth } = useAuthStore();

    const checkAuth = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            const response: ApiResponse<AuthDto> | null = await jwtAuthApi.silentLogin().catch(() => null);

            if (!response || response.status === 204) {
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                });
                clearAuth();
                navigate('/login');
                return;
            }
            
            localStorage.setItem('accessToken', response.data.accessToken);
            setAuth(response.data);
            setAuthState({
                isAuthenticated: true,
                isLoading: false
            });
            return;
        }

        setAuthState({
            isAuthenticated: true,
            isLoading: false
        });
    };

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    return {
        ...authState,
        checkAuth
    };
};
