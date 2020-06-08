import { observer } from "mobx-react";
import React from "react";
import { Zone, Service } from "../stores/ZoneStore";
import { observable, action } from "mobx";
import { ServiceSettings } from "./ServiceSettings";
import { View } from "./View";

const Agent =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36";

@observer
export class Services extends React.Component<{
	Zone: Zone;
	ZoneSettings: boolean;
	Active: boolean;
}> {
	@observable Active = 0;
	@observable ActiveExtension: string | null = null;

	@observable Extensions = {
		settings: ServiceSettings,
	};

	@observable ExtensionList = [null, "settings"];

	get ActiveService() {
		return this.props.Zone.Services[this.Active];
	}

	get Extension() {
		return (
			this.ActiveExtension && (this.Extensions as any)[this.ActiveExtension]
		);
	}

	render() {
		const Views = this.props.Zone.Services.map((Service, i) => (
			<View
				Zone={this.props.Zone}
				Index={i}
				Active={this.Active === i}
				Service={Service}
				key={i}
			/>
		));
		const Extension = this.Extension;
		return (
			<div className="services" hidden={!this.props.Active}>
				<div className="bar">
					<div className="list">
						{this.props.Zone.Services.map((Service, i) => (
							<img
								src={
									Service.Icon ||
									"https://static.thenounproject.com/png/74651-200.png"
								}
								className={i === this.Active ? "active" : ""}
								key={i}
								onClick={() => (this.Active = i)}
							/>
						))}
					</div>
					<div className="bottom">
						{this.ExtensionList.map(
							(Icon) =>
								Icon && (
									<i
										key={Icon}
										className="material-icons"
										onClick={() =>
											(this.ActiveExtension =
												this.ActiveExtension === Icon ? null : Icon)
										}
									>
										{Icon}
									</i>
								)
						)}
						<i className="material-icons" onClick={() => this.New()}>
							add
						</i>
					</div>
				</div>
				<div className="display">
					{Views.filter(
						(view, i) =>
							view.props.Zone.SoftClose ||
							view.props.Service.Persistent ||
							this.Active === i
					)}
				</div>
				<div className={"view " + (this.ActiveExtension ? "active" : "")}>
					{this.ActiveService && this.ActiveExtension && (
						<Extension key={this.Extension} Service={this.ActiveService} />
					)}
				</div>
			</div>
		);
	}

	@action
	New() {
		this.props.Zone.Services.push(new Service(`google.com`));
	}
}
