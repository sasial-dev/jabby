import { World } from "../modules/types"
import SchedulerExports from "./scheduler"

type Scheduler = typeof SchedulerExports.schedulers[number];
declare const public: (World | Scheduler)[] & { updated: boolean }

export = public
