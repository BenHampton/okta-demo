// import { LoginCallback } from '@okta/okta-react'
// import { AppLoader } from '~/components/AppLoader/AppLoader'
// import { LoginError } from './LoginError'

export const LoginCallbackHOC = () => {
    // if someone refreshes the browser while at /login/callback, they will get
    // stuck with a loading icon thanks to how the LoginCallback component works.
    // In order to prevent that edge case, we can redirect back to the home page
    // (and kick off a login sequence again) when this component renders but we
    // aren't in the callback process. it would be nice if Okta had a flag for
    // pending authentication but they don't as of @okta/okta-react@6.10.0
    // so use the URL search semegment length instead.
    if (window.location.search.length === 0) {
        window.location.href = window.location.origin
    }

    // return <LoginCallback loadingElement={<AppLoader />} errorComponent={LoginError} />
    // return <LoginCallback loadingElement={<AppLoader />} errorComponent={LoginError} />
}