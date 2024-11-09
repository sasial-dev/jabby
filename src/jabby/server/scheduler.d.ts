import { SystemData, SystemFrame, SystemId, SystemSettingData, SystemWatch, WatchData } from "../modules/types"

interface ProcessingFrame {
	started_at: number
}

declare class Scheduler {
    name: string

    /**
     * contains a map of valid system ids
     */
    valid_system_ids: Set<SystemId>

    /**
     * contains a list of static system data that is updated infrequently
     */
    system_data: Map<SystemId, SystemData>

    /**
     * list of system data that has updated
     */
    system_data_updated: Set<SystemId>

    /**
     * contains a buffer of the last couple frames of system data that is refreshed constantly
     */
    system_frames: Map<SystemId, SystemFrame[]>

    /**
     * stores the frames that have been updated
     */
    system_frames_updated: Map<SystemId, Set<SystemFrame>>

    /**
     * contains the current frame that a system is processing
     */
    processing_frame: Map<SystemId, ProcessingFrame>

    /**
     * contains a list of watches for each system
     */
    system_watches: Map<SystemId, { active: boolean, watch: SystemWatch }[]>

    register_system(settings?: SystemSettingData): SystemId
    set_system_data(id: SystemId, settings: SystemSettingData): void
    get_system_data(id: SystemId): SystemData
    remove_system(id: SystemId): void
    
    private _mark_system_frame_start(id: SystemId): void
    private _mark_system_frame_end(id: SystemId, s?: number): void
    private append_extra_frame_data(id: SystemId, label: unknown): void

    run<T extends unknown[]>(id: SystemId, system: (...args: T) => void, ...args: T): void
    create_watch_for_system(id: SystemId): WatchData
}

interface SchedulerExports {
    create: (name: string) => Scheduler
    schedulers: Scheduler[]
}

declare const scheduler: SchedulerExports
export = scheduler
