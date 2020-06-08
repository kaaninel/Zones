import { observer } from "mobx-react";
import React from "react";
import { Zone, Service } from "../stores/ZoneStore";
import { PageFaviconUpdatedEvent } from "electron";

const Agent =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36";

@observer
export class View extends React.Component<{
	Zone: Zone;
	Service: Service;
	Index: number;
	Active: boolean;
}> {
	private view = React.createRef<HTMLWebViewElement>();

	render() {
		return (
			<webview
				ref={this.view}
				partition={
					this.props.Service.Partition ||
					`persist:${this.props.Zone.Name}//${this.props.Service.URL}/${this.props.Index}`
				}
				src={"https://" + this.props.Service.URL}
				useragent={Agent}
				key={this.props.Index}
				hidden={!this.props.Active}
				allowpopups={"true" as any}
			/>
		);
	}

	componentDidMount() {
		const view = this.view.current as HTMLWebViewElement & {
			insertCSS: Function;
		};
		view.addEventListener("did-finish-load", () => {
			if (view && view.insertCSS && this.props.Service.CustomCSS)
				view.insertCSS(this.props.Service.CustomCSS);
		});
		(view as any).addEventListener(
			"page-favicon-updated",
			(e: PageFaviconUpdatedEvent) => {
				this.props.Service.Icon = e.favicons[0];
			}
		);
	}
}
