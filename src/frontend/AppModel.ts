export interface IUserData {
	display_name:string,
	email:string,
	href:string,
	id:string,
	images:any[],
	product:string
}

export class AppModel {
	public static userData:IUserData = null;
}