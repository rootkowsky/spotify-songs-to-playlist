import {AppModel} from "./AppModel";
import {CookiesUtil} from "./CookiesUtil";
import {SpotifyCookie} from "./SpotifyCookie";

const axios = require('axios');

export class AppInitializer {

	public static async init():Promise<void> {
		await AppInitializer.logIn();
	}

	public static async logIn():Promise<void> {
		let accessToken = CookiesUtil.getCookie(SpotifyCookie.SPOTIFY_ACCESS_TOKEN);
		if (accessToken) {
			try {
				let response = await AppInitializer.fetchUserData(accessToken);
				if (response.status == 200) {
					AppModel.userData = response.data;
				}
			} catch (error) {
				console.error('isLoggedIn', error);
			}
		}
	}

	public static async fetchUserData(accessToken:string):Promise<any> {
		return new Promise((resolve, reject) => {
			axios({
				url: 'https://api.spotify.com/v1/me',
				headers: {'Authorization': 'Bearer ' + accessToken},
			}).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	}

}
