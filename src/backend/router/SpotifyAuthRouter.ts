import {StringUtil} from "../util/StringUtil";
import {Router} from "./Router";

const request = require('request');
const querystring = require('querystring');


const http = require('http');

export class SpotifyAuthRouter extends Router {

	get services() {
		return {
			'login': 'login',
			'callback': 'authCallback',
		};
	}

	private login(req, res, next) {

		const state = StringUtil.generateRandomString(16);
		res.cookie(this.config.stateKey, state);

		// application requests authorization
		const scopes = [
			'user-read-private',
			'user-read-email',
			'playlist-modify-public',
			'playlist-modify-private',
			'user-library-read',
		];

		const query = querystring.stringify({
			response_type: 'code',
			client_id: this.config.clientId,
			scope: scopes.join(" "),
			redirect_uri: this.config.redirectUri,
			state: state,
		});

		res.redirect('https://accounts.spotify.com/authorize?' + query);
	}

	private authCallback(req, res, next) {

		// your application requests refresh and access tokens
		// after checking the state parameter

		const {code, state} = req.query || null;
		const {stateKey, redirectUri, clientId, clientSecret} = this.config;
		const storedState = req.cookies ? req.cookies[stateKey] : null;

		if (state === null || state !== storedState) {
			const q = querystring.stringify({
				error: 'state_mismatch',
			});
			res.redirect('/#' + q);
		}
		else {
			res.clearCookie(stateKey);

			const authOptions = {
				url: 'https://accounts.spotify.com/api/token',
				form: {
					code: code,
					redirect_uri: redirectUri,
					grant_type: 'authorization_code',
				},
				headers: {
					'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
				},
				json: true,
			};

			request.post(authOptions, function (error, response, body) {
				if (!error && response.statusCode === 200) {

					const access_token = body.access_token;
					const refresh_token = body.refresh_token;

					// we can also pass the token to the browser to make requests from there
					res.cookie("spotify_access_token", access_token);
					res.cookie("spotify_refresh_token", refresh_token);

					res.redirect('/');
				}
				else {
					res.redirect('/#' +
								 querystring.stringify({
									 error: 'invalid_token',
								 }));
				}
			});
		}
	}

}
