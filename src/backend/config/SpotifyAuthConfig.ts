interface ISpotifyAuthConfig {
	/** Your client id */
	clientId:string;

	/** Your secret */
	clientSecret:string;

	/** Your redirect uri */
	redirectUri:string;

	/**  */
	stateKey:string;
}

export class SpotifyAuthConfig implements ISpotifyAuthConfig {

	public clientId:string;
	public clientSecret:string;
	public redirectUri:string;
	public stateKey:string;

	constructor(config:ISpotifyAuthConfig) {
		this.clientId = config.clientId;
		this.clientSecret = config.clientSecret;
		this.redirectUri = config.redirectUri;
		this.stateKey = config.stateKey;
	}

}