import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import OktaAuth from "@okta/okta-auth-js";
import oktaConfig from "./oktaConfig.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { LoginCallback, Security } from '@okta/okta-react'
import {Home} from "./pages/Home.tsx";
import {RequiredAuth} from "./HOCs/RequiredAuth.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const oktaAuth = new OktaAuth(oktaConfig);

const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    window.location.replace(originalUri || '/')
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} >
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/*<Route path="/login/callback" element={<LoginCallbackHOC />} />*/}
                    <Route path="/login/callback" element={<LoginCallback />} />
                    <Route element={<RequiredAuth />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Security>
        </StrictMode>
    </BrowserRouter>
)