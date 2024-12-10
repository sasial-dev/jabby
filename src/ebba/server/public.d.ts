import { Scheduler, World } from "../modules/types"

declare const public: (World | Scheduler)[] & { updated: boolean }

export = public
