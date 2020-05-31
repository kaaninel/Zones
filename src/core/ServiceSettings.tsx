import { observer } from "mobx-react";
import React, { ChangeEvent } from "react";
import { Service } from "../stores/ZoneStore";
import { action } from "mobx";

type Props = {
	Service: Service;
};

@observer
export class ServiceSettings extends React.Component<Props> {
	render() {
		return (
			<div className="settingsPage">
				<div className="card">
					<div>
						URL
						<input
							type="text"
							value={this.props.Service.URL}
							onChange={this.Save.bind(this, "URL")}
						/>
					</div>
					<div>
						Persistent
						<input
							type="checkbox"
							checked={this.props.Service.Persistent}
							onChange={this.Save.bind(this, "Persistent")}
						/>
					</div>
				</div>
			</div>
		);
	}

	@action
	Save(Key: Extract<keyof Service, string>, Event: ChangeEvent) {
		const Input = Event.currentTarget as HTMLInputElement;
		const Service = this.props.Service as any;
		if (Input.type === "checkbox") {
			Service[Key] = Input.checked;
		} else {
			Service[Key] = Input.value;
		}
	}
}
