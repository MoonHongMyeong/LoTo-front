import { AuthDto } from '@/entities/auth/model/dtos';
import { jwtAuthApi } from '@/features/auth';
import { ApiError, ApiResponse } from '@/shared/api/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error?: ApiError;
}

interface AuthHookReturn extends AuthState {
    checkAuth: () => Promise<void>;
}

export const useAuth = (): AuthHookReturn => {
    const navigate = useNavigate();
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true
    });

    const checkAuth = async (): Promise<void> => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            const response: ApiResponse<AuthDto> | null = await jwtAuthApi.silentLogin().catch(() => null);

            if (!response || response.status === 204) {
                setState({
                    isAuthenticated: false,
                    isLoading: false,
                });
                navigate('/login');
                return;
            }
            
            localStorage.setItem('accessToken', response.data.accessToken);
            setState({
                isAuthenticated: true,
                isLoading: false
            });
            return;
        }

        setState({
            isAuthenticated: true,
            isLoading: false
        });
    };

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    return {
        ...state,
        checkAuth
    };
};
