import {SpotifyAuthConfig} from "./config/SpotifyAuthConfig";
import {SongsToPlaylistRouter} from "./router/SongsToPlaylistRouter";
import {SpotifyAuthRouter} from "./router/SpotifyAuthRouter";

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const server = express();
const publicPath = path.resolve(__dirname, '..', 'public');

server
	.use(express.static(publicPath))
	.use(cookieParser());

const authConfig = new SpotifyAuthConfig({
	clientId: '--- fill ---',
	clientSecret: '--- fill ---',
	redirectUri: 'http://localhost:8888/callback',
	stateKey: 'spotify_auth_state',
});

new SpotifyAuthRouter("/", server, authConfig);
new SongsToPlaylistRouter("/", server, authConfig);

console.log('Listening on 8888');
server.listen(8888);
