import { useOktaAuth } from '@okta/okta-react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const navigate = useNavigate();

    if (!authState) return <p>Loading...</p>;

    const login  = () => oktaAuth.signInWithRedirect();
    const logout = () => oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin });

    return (
        <div>
            <h1>Welcome</h1>
            {authState.isAuthenticated ? (
                <>
                    <p>You are logged in!</p>
                    <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button onClick={login}>Login with Okta</button>
            )}
        </div>
    )
}