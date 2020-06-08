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
				<div>
					Name
					<input
						type="text"
						value={this.props.Zone.Name}
						onChange={this.Save.bind(this, "Name")}
					/>
				</div>
				<div>
					Icon
					<input
						type="text"
						value={this.props.Zone.Icon}
						onChange={this.Save.bind(this, "Icon")}
					/>
				</div>
				<div>
					Persistent
					<input
						type="checkbox"
						checked={this.props.Zone.Persistent}
						onChange={this.Save.bind(this, "Persistent")}
					/>
				</div>
				<div>
					Soft Close
					<input
						type="checkbox"
						checked={this.props.Zone.SoftClose}
						onChange={this.Save.bind(this, "SoftClose")}
					/>
				</div>
			</div>
		);
	}

	@action
	Save(Key: Extract<keyof Zone, string>, Event: ChangeEvent) {
		const Input = Event.currentTarget as HTMLInputElement;
		const Zone = this.props.Zone as any;
		if (Input.type === "checkbox") {
			Zone[Key] = Input.checked;
		} else {
			Zone[Key] = Input.value;
		}
	}
}
