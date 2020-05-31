import { observable } from "mobx";
import { persist } from "mobx-persist";

export class Service {
	@persist @observable URL: string;
	@persist @observable Persistent = false;

	constructor(URL: string) {
		this.URL = URL;
	}
}

export class Zone {
	@persist @observable Name: string;
	@persist @observable Icon: string = "folder";
	@persist("list", Service) @observable Services: Service[] = [];
	@persist @observable Persistent = false;

	constructor(Name: string) {
		this.Name = Name;
	}
}

export class ZoneStore {
	@persist("list", Zone) @observable Zones: Zone[] = [];
}
