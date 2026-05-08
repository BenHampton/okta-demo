const oktaConfig = {
    clientId: '0oa12ox2scxHsV76n698',
    issuer: 'https://integrator-9423550.okta.com/oauth2/default',
    redirectUri:  `${window.location.origin}/login/callback`,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: true,
}

export default oktaConfig;