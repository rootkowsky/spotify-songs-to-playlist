import * as React from "react";

export class LoginView extends React.Component {
	public render() {
		return <div className={"LoginView"}>
			<h1>You have to log in to Spotify first</h1>
			<a className={"Button"} href={"/login"}>Sign in</a>
		</div>;
	}
}
