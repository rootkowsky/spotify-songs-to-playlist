import * as React from "react";
import {AppModel} from "../AppModel";

export class ProfileView extends React.Component {
	public render() {
		return <div className={"ProfileView"}>
			<h1>Welcome {AppModel.userData.display_name}</h1>
		</div>;
	}
}
