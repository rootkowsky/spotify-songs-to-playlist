import {AppModel} from "./AppModel";
import {CookiesUtil} from "./CookiesUtil";
import {SpotifyCookie} from "./SpotifyCookie";

const axios = require('axios');

export class GeneratePlaylistAction {

	public static generate(playlistName:string) {
		let accessToken = CookiesUtil.getCookie(SpotifyCookie.SPOTIFY_ACCESS_TOKEN);

		return new Promise((resolve, reject) => {
			axios({
				url: '/generate_playlist',
				headers: {'Authorization': 'Bearer ' + accessToken},
				params: {
					'username': AppModel.userData.id,
					'playlistName': playlistName,
				},
			}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}

}