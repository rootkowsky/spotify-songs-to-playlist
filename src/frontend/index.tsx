import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppInitializer} from "./AppInitializer";
import "./assets/scss/main.scss";
import {App} from "./views/App";

(async () => {
	const appElement = document.getElementById('app');
	if (!!appElement) {
		await AppInitializer.init();
		const app = (
			<App/>
		);
		ReactDOM.render(app, appElement);
	}
})();