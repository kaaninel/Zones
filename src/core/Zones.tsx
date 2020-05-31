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
	@observable Active = 0;
	@observable Settings = false;

	render() {
		return (
			<div className="zones">
				{ZoneList.Zones.map((Zone, i) =>
					Zone.Persistent || this.Active === i ? (
						<Services
							key={i}
							ZoneSettings={this.Settings}
							Zone={Zone}
							Active={this.Active === i}
						></Services>
					) : null
				)}
				<div className="bar">
					<div className="list">
						{ZoneList.Zones.map((Zone, i) => (
							<i
								className={
									"material-icons " + (i === this.Active ? "active" : "")
								}
								key={Zone.Name}
								onClick={() => this.Select(i)}
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
	Select(Index: number) {
		this.Active = Index;
	}
}
