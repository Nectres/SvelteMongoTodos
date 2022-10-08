import createAuthClient from '@auth0/auth0-spa-js';

// let origin = typeof document == "undefined" ? "" : location.origin;

const redirectUri = location.origin + '/authorize';

console.log({ redirectUri });

export const authClient = await createAuthClient({
	domain: 'keerthivasan.au.auth0.com',
	client_id: 'Hd6y0APWekI9C6vVLzhkuHsiALAV82an',
	redirect_uri: redirectUri
});
