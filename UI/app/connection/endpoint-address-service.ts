module BigRedOctopus.Connection {

    export class EndpointAddressService
    {
        get()
        {
            return localStorage["endpoint"];
        }

        set(url: string)
        {
            localStorage["endpoint"] = url;
        }
    }

    app.service("endpointAddressService", EndpointAddressService)
}
