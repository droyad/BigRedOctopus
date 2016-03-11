module BigRedOctopus.Project {
    interface IProject {
        Id: string,
        Name: string,
    }

    class ViewModel {
        noEndpoint:boolean;
        endpointError:string;
        projects:IProject[];

        constructor($scope:ng.IScope, endpointAddressService:Connection.EndpointAddressService, $http:ng.IHttpService) {
            this.noEndpoint = !endpointAddressService.get();
            $http.get<IProject[]>(`${endpointAddressService.get()}/api/projects`)
                .then(
                    result => this.projects = result.data,
                    result => this.endpointError = `${result.status}:  ${result.statusText}`
                );

            //$scope.$watch(this.endpoint, () => endpointAddressService.set(this.endpoint))
        }
    }

    addAngularState("layout.project", "/project", "Project", ViewModel, "project/project.html")
}


