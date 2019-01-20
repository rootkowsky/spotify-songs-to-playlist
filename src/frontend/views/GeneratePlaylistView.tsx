import * as React from "react";
import {GeneratePlaylistAction} from "../GeneratePlaylistAction";

interface State {
	playlistName:string
}

export class GeneratePlaylistView extends React.Component<{}, State> {

	protected inputValue:string = "";

	constructor(props) {
		super(props);
		this.state = {
			playlistName: "",
		};
	}

	private handleInputChange = (event) => {
		this.setState({playlistName: event.target.value});
	};

	private handleGeneratePlaylist = () => {
		if (this.state.playlistName.length)
			GeneratePlaylistAction.generate(this.state.playlistName);
	};

	public render() {

		let playlistNameForButton = this.state.playlistName ? "`" + this.state.playlistName + "`" : "";

		return <div className={"GeneratePlaylistView"}>
			<p>Pass playlist name and click 'Generate Playlist from Songs!' to create new playlist, which will contain
				all tracks from your 'Songs'</p>
			<div className={"InputContainer"}>
				<input className={"Input"} type={"text"} placeholder={"my fabulous playlist"}
					   onChange={this.handleInputChange}
				/>
			</div>
			<button disabled={!this.state.playlistName} className={"Button"} onClick={this.handleGeneratePlaylist}
			>Generate {playlistNameForButton} Playlist
				from Songs!
			</button>
		</div>;
	}
}
