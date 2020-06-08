import { observable } from "mobx";
import { persist } from "mobx-persist";

export class Service {
	@persist @observable URL: string;
	@persist @observable CustomCSS: string | null = null;
	@persist @observable Partition: string | null = null;
	@persist @observable Icon: string | null = null;
	@persist @observable Persistent = false;
	@persist @observable Insecure = false;

	constructor(URL: string) {
		this.URL = URL;
	}
}

export class Zone {
	@persist @observable Name: string;
	@persist @observable Icon: string = "folder";
	@persist("list", Service) @observable Services: Service[] = [];
	@persist @observable Persistent = false;
	@persist @observable SoftClose = false;

	constructor(Name: string) {
		this.Name = Name;
	}
}

export class ZoneStore {
	@persist("list", Zone) @observable Zones: Zone[] = [];
}
