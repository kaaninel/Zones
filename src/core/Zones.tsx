import { ZoneStore, Zone } from "../stores/ZoneStore";
import { create } from "mobx-persist";
import { observer } from "mobx-react";
import React from "react";
import { action, observable } from "mobx";
import { Services } from "./Services";

const ZoneList = new ZoneStore();
const hydrate = create();
hydrate("zones", ZoneList);

@observer
export class Zones extends React.Component {
	@observable Active?: Zone = ZoneList.Zones[0];
	@observable Settings = false;

	render() {
		return (
			<div className="zones">
				{this.Active ? (
					<Services ZoneSettings={this.Settings} Zone={this.Active}></Services>
				) : null}
				<div className="bar">
					<div className="list">
						{ZoneList.Zones.map((Zone) => (
							<i
								className={
									"material-icons " + (Zone === this.Active ? "active" : "")
								}
								key={Zone.Name}
								onClick={() => this.Select(Zone)}
							>
								{Zone.Icon}
							</i>
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
			</div>
		);
	}

	@action
	New() {
		ZoneList.Zones.push(new Zone(`Zone${ZoneList.Zones.length}`));
	}

	@action
	Select(Zone: Zone) {
		this.Active = Zone;
	}
}
