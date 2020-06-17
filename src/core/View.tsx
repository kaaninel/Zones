import { observer } from "mobx-react";
import React from "react";
import { Zone, Service } from "../stores/ZoneStore";
import { WebviewTag, shell, remote } from "electron";
import { computed, autorun } from "mobx";

const Agent =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36";
@observer
export class View extends React.Component<{
	Zone: Zone;
	Service: Service;
	Index: number;
	Active: boolean;
}> {
	private view = React.createRef<WebviewTag>();

	@computed({ keepAlive: true }) get partition() {
		return (
			this.props.Service.Partition ||
			`persist:${this.props.Zone.Name}//${this.props.Service.URL}/${this.props.Index}`
		);
	}

	render() {
		return (
			<webview
				ref={this.view}
				partition={this.partition}
				src={"https://" + this.props.Service.URL}
				key={this.props.Index}
				hidden={!this.props.Active}
				webpreferences="nativeWindowOpen=true"
				allowpopups={"true" as any}
			/>
		);
	}

	componentDidMount() {
		const view = this.view.current;
		if (view) {
			view.enableremotemodule = false;
			view.addEventListener("did-finish-load", () => {
				if (this.props.Service.CustomCSS)
					view.insertCSS(this.props.Service.CustomCSS);
			});
			view.addEventListener("page-favicon-updated", (e) => {
				this.props.Service.Icon = e.favicons[0];
			});
			view.addEventListener("new-window", (e) => {
				shell.openExternal(e.url);
			});
			view.addEventListener("page-title-updated", (e) => {
				document.head.title = e.title;
			});
			autorun(() => {
				const partition = remote.session.fromPartition(this.partition);
				partition.webRequest.onBeforeSendHeaders(
					({ requestHeaders }, callback) => {
						requestHeaders["User-Agent"] = Agent;
						callback({ requestHeaders: requestHeaders });
					}
				);
			});
		}
	}
}
