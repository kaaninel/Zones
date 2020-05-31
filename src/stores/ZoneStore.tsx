import { observable } from "mobx";
import { persist } from "mobx-persist";

export class Service {
	@persist @observable URL: string;

	constructor(URL: string) {
		this.URL = URL;
	}
}

export class Zone {
	@persist @observable Name: string;
	@persist @observable Icon: string = "folder";
	@persist("list", Service) @observable Services: Service[] = [];

	constructor(Name: string) {
		this.Name = Name;
	}
}

export class ZoneStore {
	@persist("list", Zone) @observable Zones: Zone[] = [];
}
