import {Router} from "./Router";

const request = require('request');

export class SongsToPlaylistRouter extends Router {

	get services() {
		return {
			'generate_playlist': 'generatePlaylist',
		};
	}

	private async generatePlaylist(req, res, next) {

		const {username, playlistName} = req.query;
		const {spotify_access_token: access_token} = req.cookies;
		let tracks = await this.getAllTracks(access_token);
		let playlistId = await this.createPlaylist(access_token, username, playlistName);

		let tracksIds = tracks.map(function (element) {
			return "spotify:track:" + element.track.id;
		});

		let status = await this.addTracksToPlaylist(access_token, username, playlistId, tracksIds);

		if (status) {
			res.send({
				'status': 'ok',
			});
		}
		else {
			res.send({
				'status': 'error',
			});
		}
		return;
	}

	private async getAllTracks(access_token:string, offset:number = 0, total:number = 99999,
		tracks:any[] = []):Promise<any> {
		return new Promise((resolve, reject):void => {
			let limit = 50;
			let authOptions = {
				url: 'https://api.spotify.com/v1/me/tracks',
				headers: {'Authorization': 'Bearer ' + access_token, "Content-Type": "application/json"},
				qs: {
					limit: limit,
					offset: offset,
				},
			};
			if (offset < total) {
				request.get(authOptions, async (error, response, body) => {
					if (error) {
						reject(error);
					}
					else {
						let playlist = JSON.parse(body);
						tracks = await this.getAllTracks(access_token, offset + limit, playlist.total,
							tracks.concat(playlist.items));
						resolve(tracks);
					}
				});
			}
			else {
				resolve(tracks);
			}
		});

	}

	private async createPlaylist(accessToken, username, playlistName):Promise<any> {
		return new Promise((resolve, reject) => {
			let authOptions = {
				url: 'https://api.spotify.com/v1/users/' + username + '/playlists',
				headers: {'Authorization': 'Bearer ' + accessToken, "Content-Type": "application/json"},
				body: JSON.stringify({
					"name": playlistName,
					"public": false,
				}),
			};
			request.post(authOptions, function (error, response, body) {
				if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
					let playlistId = JSON.parse(body).id;
					resolve(playlistId);
					return;
				}
				reject({
					'status': 'something went wrong while creating playlist',
					'error': error,
					'response': response,
				});
			});
		});

	}

	private async addTracksToPlaylist(accessToken, username, playlistId, tracksIds) {

		return new Promise(async (mainResolve, mainReject) => {
			let tracksChunks = [];

			let i, j, temparray, chunk = 98;
			for (i = 0, j = tracksIds.length; i < j; i += chunk) {
				temparray = tracksIds.slice(i, i + chunk);
				tracksChunks.push(temparray);
			}

			for (const tracks of tracksChunks) {
				await new Promise((resolve, reject) => {
					let authOptions = {
						url: 'https://api.spotify.com/v1/users/' + username + '/playlists/' + playlistId + '/tracks',
						headers: {'Authorization': 'Bearer ' + accessToken, "Content-Type": "application/json"},
						body: JSON.stringify({
							"uris": tracks,
						}),
					};

					request.post(authOptions, function (error, response, body) {
						if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
							resolve(true);
							return;
						}
						mainReject(false);
						reject(false);
					});
				});
			}

			mainResolve(true);
		});
	}


}
