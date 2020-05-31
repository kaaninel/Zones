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
					<input
						type="url"
						value={this.props.Service.URL}
						onChange={this.Save.bind(this)}
					/>
				</div>
			</div>
		);
	}

	@action
	Save(Event: ChangeEvent) {
		const Input = Event.currentTarget as HTMLInputElement;
		this.props.Service.URL = Input.value;
	}
}
