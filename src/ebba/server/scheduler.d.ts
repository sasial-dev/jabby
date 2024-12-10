import { Scheduler } from "../modules/types"

interface SchedulerExports {
    create: (name: string) => Scheduler
    schedulers: Scheduler[]
}

declare const scheduler: SchedulerExports
export = scheduler
