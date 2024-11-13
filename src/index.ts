import "./jecs"
import "./t"
import "./vide"

if (game.GetService("RunService").IsClient()) {
    import("./pebble").expect()
}

import jabby from "./jabby"

export = jabby
