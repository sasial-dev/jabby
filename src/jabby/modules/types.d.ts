import jecs from "@rbxts/jecs"

type host = "client" | "server"

export interface IncomingConnector {
	host: Player | "server",
	from_vm: number,
	to_vm: number
}

export interface OutgoingConnector {
	host: Player | "server",
	/**
     * not specifying a vm makes it received by all
     */
    to_vm?: number,
	from_vm: undefined
}

export interface NetEvent<T extends unknown[]> {
	type: "event",

	fire: (connector: OutgoingConnector, ...args: T) => void,
	connect: (callback: (connector: IncomingConnector, ...args: T) => void) => RBXScriptConnection,
}

export type NetCallback<T extends unknown[], U extends unknown[]> = {
	type: "callback",

	invoke: (connector: OutgoingConnector, ...args: T) => LuaTuple<U>,
	set_callback: (callback: (connector: IncomingConnector, ...args: T) => LuaTuple<U>) => void
}

declare const SYSTEM_ID_ARCHTYPE: unique symbol

export type SystemId = number & {
    [SYSTEM_ID_ARCHTYPE]: never
}

export type SystemTag = "processing" | "finished" | "paused"
export interface SystemSettingData {
	name?: string,
	phase?: string,
	layout_order?: number,
	paused?: boolean,
}
export interface SystemData {
	name: string,
	phase?: string,
	layout_order: number,
	paused: boolean
}

type ChangeTypes = "remove" | "clear" | "delete" | "add" | "set" | "entity" | "component"
export interface WatchLoggedChanges {
	types: ChangeTypes[],
	entities: jecs.Entity[],
	component: jecs.Entity[],
	values: string[],
	worlds: jecs.World[]
}

export interface SystemWatch {
	/**
     * enables Lua Object Notation.
     * incurs a significant performance penalty. 
     */
	enable_lon: boolean,
	/**
     * the current frame to process
     */
	frame: number,

	frames: WatchLoggedChanges[]
}

export interface SystemLabel {}

export interface SystemFrame {
	i: number,
	s: number
}

interface WatchData {
    active: boolean,
    watch: SystemWatch,
    untrack: () => void
}

export class World {
    name: string
    debug: jecs.Entity<string>
    world: jecs.World

    entities: Map<Instance, jecs.Entity>
    get_entity_from_part?: (part: BasePart) => LuaTuple<[jecs.Entity | undefined, BasePart | undefined]>
}
