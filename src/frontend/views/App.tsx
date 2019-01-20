import * as React from "react";
import {AppModel} from "../AppModel";
import {GeneratePlaylistView} from "./GeneratePlaylistView";
import {LoginView} from "./LoginView";
import {ProfileView} from "./ProfileView";

interface Props {}

interface State {}

export class App extends React.Component<Props, State> {
	public render() {

		let loggedIn = !!AppModel.userData;

		if (!loggedIn) {
			return <div className={"App"}>
				<LoginView/>
			</div>;
		}

		return <div className={"App"}>
			<ProfileView/>
			<hr/>
			<GeneratePlaylistView/>
		</div>;
	}
}
