module BigRedOctopus.Connection
{

    class ViewModel
    {
        endpoint: string;

        constructor(private endpointAddressService : EndpointAddressService, $scope: ng.IScope)
        {
            this.endpoint = endpointAddressService.get() || "";

            $scope.$watch(() => this.endpoint, () => endpointAddressService.set(this.endpoint || ""))
        }
    }

    addAngularState("layout.connection", "/connection", "Connection", ViewModel, "connection/connection.html")
}


