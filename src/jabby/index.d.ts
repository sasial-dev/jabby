interface Jabby {
    set_check_function: (callback: (player: Player) => boolean) => void
    obtain_client: () => typeof import("./client")
    
    vm_id: number

    public: typeof import("./server/public")
    scheduler: typeof import("./server/scheduler")
    broadcast_server: typeof import("./server")["broadcast"]
}

declare const jabby: Jabby
export = jabby
