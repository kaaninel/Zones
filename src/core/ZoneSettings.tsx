import { observer } from "mobx-react";
import React, { ChangeEvent } from "react";
import { Zone } from "../stores/ZoneStore";
import { action } from "mobx";

type Props = {
	Zone: Zone;
};

@observer
export class ZoneSettings extends React.Component<Props> {
	render() {
		return (
			<div className="settingsPage">
				<div className="card">
					<input
						type="url"
						value={this.props.Zone.Name}
						onChange={this.Save.bind(this, "Name")}
					/>
					<input
						type="url"
						value={this.props.Zone.Icon}
						onChange={this.Save.bind(this, "Icon")}
					/>
				</div>
			</div>
		);
	}

	@action
	Save(Key: string, Event: ChangeEvent) {
		const Input = Event.currentTarget as HTMLInputElement;
		//@ts-ignore
		this.props.Zone[Key] = Input.value;
	}
}
