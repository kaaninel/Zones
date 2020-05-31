import { observer } from "mobx-react";
import React from "react";
import { Zone, Service } from "../stores/ZoneStore";
import { observable, action } from "mobx";
import { ServiceSettings } from "./ServiceSettings";
import { ZoneSettings } from "./ZoneSettings";

const Agent =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36";

@observer
export class Services extends React.Component<{
	Zone: Zone;
	ZoneSettings: boolean;
	Active: boolean;
}> {
	@observable Active = 0;
	@observable Settings = false;

	get ActiveService() {
		return this.props.Zone.Services[this.Active];
	}

	render() {
		return (
			<div className="services" hidden={!this.props.Active}>
				<div className="bar">
					<div className="list">
						{this.props.Zone.Services.map((Service, i) => (
							<img
								src={`https://api.faviconkit.com/${Service.URL}/144`}
								alt={Service.URL}
								className={i === this.Active ? "active" : ""}
								key={i}
								onClick={() => this.Select(i)}
							/>
						))}
					</div>
					<div className="bottom">
						<i
							className="material-icons settings"
							onClick={() => (this.Settings = !this.Settings)}
						>
							settings
						</i>
						<i className="material-icons" onClick={() => this.New()}>
							add
						</i>
					</div>
				</div>
				<div className="display">
					{this.props.ZoneSettings ? (
						<ZoneSettings Zone={this.props.Zone}></ZoneSettings>
					) : null}
					{this.Settings ? (
						<ServiceSettings Service={this.ActiveService}></ServiceSettings>
					) : null}
					{this.props.Zone.Services.map((Service, i) =>
						Service.Persistent || this.Active === i ? (
							<webview
								partition={`persist:${this.props.Zone.Name}//${Service.URL}/${i}`}
								src={"https://" + Service.URL}
								useragent={Agent}
								key={i}
								hidden={this.Active !== i || this.Settings}
							/>
						) : null
					)}
				</div>
			</div>
		);
	}

	@action
	New() {
		this.props.Zone.Services.push(new Service(`google.com`));
	}

	@action
	Select(Index: number) {
		this.Active = Index;
	}
}
