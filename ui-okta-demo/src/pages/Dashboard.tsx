import { useState, useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import {apiBaseUrl} from "../config.ts";

interface ProfileData {
    message: string;
    name: string;
    email: string;
}

export default function Dashboard() {
    const { authState } = useOktaAuth();
    const [data, setData] = useState<ProfileData | null>(null);
    const [error, setError] = useState<string | null>(null);
    console.log('access token:', authState?.accessToken?.accessToken)
    useEffect(() => {
        if (!authState?.accessToken) {
            return
        }

        const token = authState.accessToken.accessToken;

        fetch(`${apiBaseUrl}/api/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json() as Promise<ProfileData>)
            .then(setData)
            .catch((err: Error) => setError(err.message));
    }, [authState]);

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <p style={{color:'red'}}>Error: {error}</p>}
            {data && (
                <div>
                    <p>{data.message}</p>
                    <p>Name: {data.name}</p>
                    <p>Email: {data.email}</p>
                </div>
            )}
            {!data && !error && <p>Loading profile from API...</p>}
        </div>
    )
}