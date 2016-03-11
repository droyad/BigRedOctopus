/// <reference path="../typings/main.d.ts" />
var BigRedOctopus;
(function (BigRedOctopus) {
    function httpErrorHandler($httpProvider) {
        var interceptor = function ($q) {
            return {
                'requestError': function (response) {
                    toastr.error(response.message || response.statusText || "An error occured");
                    return $q.reject(response);
                },
                'responseError': function (response) {
                    var error = (response.data && (response.data.message || response.data.Message)) || response.statusText || "An error occured";
                    toastr.error(error);
                    return $q.reject(response);
                }
            };
        };
        $httpProvider.interceptors.push(interceptor);
    }
    ;
    BigRedOctopus.app = angular.module("app", [
        "ng",
        "ui.router",
        "ngMaterial"
    ])
        .config(httpErrorHandler)
        .config([
        "$httpProvider", function ($httpProvider) {
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            //disable IE ajax request caching
            $httpProvider.defaults.headers.get["If-Modified-Since"] = "0";
        }
    ])
        .config(function ($urlRouterProvider) {
        $urlRouterProvider.when("", "/")
            .otherwise(function () { return alert('not found'); });
    })
        .config([
        "$compileProvider", function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|local):/);
        }]);
    BigRedOctopus.app.config(function ($mdIconProvider) {
        var rootURL = "images/";
        // Register the user `avatar` icons
        $mdIconProvider
            .icon("menu", rootURL + "menu.svg", 24);
    });
    function addAngularState(id, url, title, controller, template) {
        var stateConfig = {
            url: url,
            templateUrl: "app/" + template,
            controller: controller,
            controllerAs: "vm",
            params: { title: title }
        };
        BigRedOctopus.app.config(function ($stateProvider) {
            return $stateProvider.state(id, stateConfig);
        });
    }
    BigRedOctopus.addAngularState = addAngularState;
})(BigRedOctopus || (BigRedOctopus = {}));
var BigRedOctopus;
(function (BigRedOctopus) {
    var Connection;
    (function (Connection) {
        var ViewModel = (function () {
            function ViewModel(endpointAddressService, $scope) {
                var _this = this;
                this.endpointAddressService = endpointAddressService;
                this.endpoint = endpointAddressService.get() || "";
                $scope.$watch(function () { return _this.endpoint; }, function () { return endpointAddressService.set(_this.endpoint || ""); });
            }
            return ViewModel;
        }());
        BigRedOctopus.addAngularState("layout.connection", "/connection", "Connection", ViewModel, "connection/connection.html");
    })(Connection = BigRedOctopus.Connection || (BigRedOctopus.Connection = {}));
})(BigRedOctopus || (BigRedOctopus = {}));
var BigRedOctopus;
(function (BigRedOctopus) {
    var Connection;
    (function (Connection) {
        var EndpointAddressService = (function () {
            function EndpointAddressService() {
            }
            EndpointAddressService.prototype.get = function () {
                return localStorage["endpoint"];
            };
            EndpointAddressService.prototype.set = function (url) {
                localStorage["endpoint"] = url;
            };
            return EndpointAddressService;
        }());
        Connection.EndpointAddressService = EndpointAddressService;
        BigRedOctopus.app.service("endpointAddressService", EndpointAddressService);
    })(Connection = BigRedOctopus.Connection || (BigRedOctopus.Connection = {}));
})(BigRedOctopus || (BigRedOctopus = {}));
var BigRedOctopus;
(function (BigRedOctopus) {
    var Home;
    (function (Home) {
        var ViewModel = (function () {
            function ViewModel() {
            }
            return ViewModel;
        }());
        BigRedOctopus.addAngularState("layout.home", "/", "Home", ViewModel, "home/home.html");
    })(Home = BigRedOctopus.Home || (BigRedOctopus.Home = {}));
})(BigRedOctopus || (BigRedOctopus = {}));
var BigRedOctopus;
(function (BigRedOctopus) {
    var Project;
    (function (Project) {
        var ViewModel = (function () {
            function ViewModel($scope, endpointAddressService, $http) {
                var _this = this;
                this.noEndpoint = !endpointAddressService.get();
                $http.get(endpointAddressService.get() + "/api/projects")
                    .then(function (result) { return _this.projects = result.data; }, function (result) { return _this.endpointError = result.status + ":  " + result.statusText; });
                //$scope.$watch(this.endpoint, () => endpointAddressService.set(this.endpoint))
            }
            return ViewModel;
        }());
        BigRedOctopus.addAngularState("layout.project", "/project", "Project", ViewModel, "project/project.html");
    })(Project = BigRedOctopus.Project || (BigRedOctopus.Project = {}));
})(BigRedOctopus || (BigRedOctopus = {}));
var BigRedOctopus;
(function (BigRedOctopus) {
    var Layout;
    (function (Layout) {
        var ViewModel = (function () {
            function ViewModel($mdSidenav) {
                this.$mdSidenav = $mdSidenav;
            }
            ViewModel.prototype.toggleSidebar = function () {
                this.$mdSidenav('left').toggle();
            };
            return ViewModel;
        }());
        BigRedOctopus.addAngularState("layout", null, null, ViewModel, "layout/layout.html");
    })(Layout = BigRedOctopus.Layout || (BigRedOctopus.Layout = {}));
})(BigRedOctopus || (BigRedOctopus = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyIsImNvbm5lY3Rpb24vY29ubmVjdGlvbi50cyIsImNvbm5lY3Rpb24vZW5kcG9pbnQtYWRkcmVzcy1zZXJ2aWNlLnRzIiwiaG9tZS9ob21lLnRzIiwicHJvamVjdC9wcm9qZWN0LnRzIiwibGF5b3V0L2xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2Q0FBNkM7QUFDN0MsSUFBTyxhQUFhLENBMkVuQjtBQTNFRCxXQUFPLGFBQWEsRUFBQyxDQUFDO0lBVWxCLDBCQUEwQixhQUErQjtRQUNyRCxJQUFJLFdBQVcsR0FBRyxVQUFDLEVBQWdCO1lBQy9CLE1BQU0sQ0FBQztnQkFDSCxjQUFjLEVBQUUsVUFBQSxRQUFRO29CQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO29CQUM1RSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxlQUFlLEVBQUUsVUFBQSxRQUFRO29CQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxrQkFBa0IsQ0FBQztvQkFFN0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9CLENBQUM7YUFDSixDQUFDO1FBQ04sQ0FBQyxDQUFDO1FBQ0YsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUFBLENBQUM7SUFFUyxpQkFBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMs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LE1BQU0sR0FBTixvQkFBTSxLQUFOLG9CQUFNLFFBZTFCO0FBQUQsQ0FBQyxFQWZNLGFBQWEsS0FBYixhQUFhLFFBZW5CIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL21haW4uZC50c1wiIC8+XHJcbm1vZHVsZSBCaWdSZWRPY3RvcHVzIHtcclxuXHJcbiAgICBpbnRlcmZhY2UgSVJvdXRlU3RhdGUgZXh0ZW5kcyBhbmd1bGFyLnVpLklTdGF0ZSB7XHJcbiAgICAgICAgcGFyYW1zOiBJUm91dGVQYXJhbXNcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgSVJvdXRlUGFyYW1zIGV4dGVuZHMgYW5ndWxhci51aS5JU3RhdGVPcHRpb25zIHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGh0dHBFcnJvckhhbmRsZXIoJGh0dHBQcm92aWRlcjogbmcuSUh0dHBQcm92aWRlcikge1xyXG4gICAgICAgIHZhciBpbnRlcmNlcHRvciA9ICgkcTogbmcuSVFTZXJ2aWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAncmVxdWVzdEVycm9yJzogcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcihyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlLnN0YXR1c1RleHQgfHwgXCJBbiBlcnJvciBvY2N1cmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdyZXNwb25zZUVycm9yJzogcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IChyZXNwb25zZS5kYXRhICYmIChyZXNwb25zZS5kYXRhLm1lc3NhZ2UgfHwgcmVzcG9uc2UuZGF0YS5NZXNzYWdlKSkgfHwgcmVzcG9uc2Uuc3RhdHVzVGV4dCB8fCBcIkFuIGVycm9yIG9jY3VyZWRcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goaW50ZXJjZXB0b3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYXBwXCIsIFtcclxuICAgICAgICBcIm5nXCIsXHJcbiAgICAgICAgXCJ1aS5yb3V0ZXJcIixcclxuICAgICAgICBcIm5nTWF0ZXJpYWxcIlxyXG4gICAgXSlcclxuICAgICAgICAuY29uZmlnKGh0dHBFcnJvckhhbmRsZXIpXHJcbiAgICAgICAgLmNvbmZpZyhbXHJcbiAgICAgICAgICAgIFwiJGh0dHBQcm92aWRlclwiLCAkaHR0cFByb3ZpZGVyID0+IHtcclxuICAgICAgICAgICAgICAgIC8vaW5pdGlhbGl6ZSBnZXQgaWYgbm90IHRoZXJlXHJcbiAgICAgICAgICAgICAgICBpZiAoISRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5nZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuZ2V0ID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgSUUgYWpheCByZXF1ZXN0IGNhY2hpbmdcclxuICAgICAgICAgICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5nZXRbXCJJZi1Nb2RpZmllZC1TaW5jZVwiXSA9IFwiMFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSlcclxuICAgICAgICAuY29uZmlnKFxyXG4gICAgICAgICAgICAoJHVybFJvdXRlclByb3ZpZGVyOiBhbmd1bGFyLnVpLklVcmxSb3V0ZXJQcm92aWRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oXCJcIiwgXCIvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm90aGVyd2lzZSgoKSA9PiBhbGVydCgnbm90IGZvdW5kJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5jb25maWcoW1xyXG4gICAgICAgICAgICBcIiRjb21waWxlUHJvdmlkZXJcIiwgJGNvbXBpbGVQcm92aWRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY29tcGlsZVByb3ZpZGVyLmFIcmVmU2FuaXRpemF0aW9uV2hpdGVsaXN0KC9eXFxzKihodHRwcz98ZnRwfG1haWx0b3xsb2NhbCk6Lyk7XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uKCAkbWRJY29uUHJvdmlkZXIgKXtcclxuICAgICAgICB2YXIgcm9vdFVSTCA9IFwiaW1hZ2VzL1wiO1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciB0aGUgdXNlciBgYXZhdGFyYCBpY29uc1xyXG4gICAgICAgICRtZEljb25Qcm92aWRlclxyXG4gICAgICAgICAgICAuaWNvbihcIm1lbnVcIiwgcm9vdFVSTCArIFwibWVudS5zdmdcIiwgMjQpXHJcbiAgICB9KTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYWRkQW5ndWxhclN0YXRlKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBjb250cm9sbGVyOiBGdW5jdGlvbiwgdGVtcGxhdGU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzdGF0ZUNvbmZpZzogSVJvdXRlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvXCIgKyB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlcixcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogeyB0aXRsZTogdGl0bGUgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVN0YXRlUHJvdmlkZXIpID0+XHJcbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGlkLCBzdGF0ZUNvbmZpZykpO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIEJpZ1JlZE9jdG9wdXMuQ29ubmVjdGlvblxyXG57XHJcblxyXG4gICAgY2xhc3MgVmlld01vZGVsXHJcbiAgICB7XHJcbiAgICAgICAgZW5kcG9pbnQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbmRwb2ludEFkZHJlc3NTZXJ2aWNlIDogRW5kcG9pbnRBZGRyZXNzU2VydmljZSwgJHNjb3BlOiBuZy5JU2NvcGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnRBZGRyZXNzU2VydmljZS5nZXQoKSB8fCBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB0aGlzLmVuZHBvaW50LCAoKSA9PiBlbmRwb2ludEFkZHJlc3NTZXJ2aWNlLnNldCh0aGlzLmVuZHBvaW50IHx8IFwiXCIpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRBbmd1bGFyU3RhdGUoXCJsYXlvdXQuY29ubmVjdGlvblwiLCBcIi9jb25uZWN0aW9uXCIsIFwiQ29ubmVjdGlvblwiLCBWaWV3TW9kZWwsIFwiY29ubmVjdGlvbi9jb25uZWN0aW9uLmh0bWxcIilcclxufVxyXG5cclxuXHJcbiIsIm1vZHVsZSBCaWdSZWRPY3RvcHVzLkNvbm5lY3Rpb24ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFbmRwb2ludEFkZHJlc3NTZXJ2aWNlXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VbXCJlbmRwb2ludFwiXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCh1cmw6IHN0cmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVtcImVuZHBvaW50XCJdID0gdXJsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHAuc2VydmljZShcImVuZHBvaW50QWRkcmVzc1NlcnZpY2VcIiwgRW5kcG9pbnRBZGRyZXNzU2VydmljZSlcclxufVxyXG4iLCJtb2R1bGUgQmlnUmVkT2N0b3B1cy5Ib21lXHJcbntcclxuXHJcbiAgICBjbGFzcyBWaWV3TW9kZWxcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkQW5ndWxhclN0YXRlKFwibGF5b3V0LmhvbWVcIiwgXCIvXCIsIFwiSG9tZVwiLCBWaWV3TW9kZWwsIFwiaG9tZS9ob21lLmh0bWxcIilcclxufVxyXG4iLCJtb2R1bGUgQmlnUmVkT2N0b3B1cy5Qcm9qZWN0IHtcclxuICAgIGludGVyZmFjZSBJUHJvamVjdCB7XHJcbiAgICAgICAgSWQ6IHN0cmluZyxcclxuICAgICAgICBOYW1lOiBzdHJpbmcsXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVmlld01vZGVsIHtcclxuICAgICAgICBub0VuZHBvaW50OmJvb2xlYW47XHJcbiAgICAgICAgZW5kcG9pbnRFcnJvcjpzdHJpbmc7XHJcbiAgICAgICAgcHJvamVjdHM6SVByb2plY3RbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoJHNjb3BlOm5nLklTY29wZSwgZW5kcG9pbnRBZGRyZXNzU2VydmljZTpDb25uZWN0aW9uLkVuZHBvaW50QWRkcmVzc1NlcnZpY2UsICRodHRwOm5nLklIdHRwU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vRW5kcG9pbnQgPSAhZW5kcG9pbnRBZGRyZXNzU2VydmljZS5nZXQoKTtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0PElQcm9qZWN0W10+KGAke2VuZHBvaW50QWRkcmVzc1NlcnZpY2UuZ2V0KCl9L2FwaS9wcm9qZWN0c2ApXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPT4gdGhpcy5wcm9qZWN0cyA9IHJlc3VsdC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9PiB0aGlzLmVuZHBvaW50RXJyb3IgPSBgJHtyZXN1bHQuc3RhdHVzfTogICR7cmVzdWx0LnN0YXR1c1RleHR9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vJHNjb3BlLiR3YXRjaCh0aGlzLmVuZHBvaW50LCAoKSA9PiBlbmRwb2ludEFkZHJlc3NTZXJ2aWNlLnNldCh0aGlzLmVuZHBvaW50KSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQW5ndWxhclN0YXRlKFwibGF5b3V0LnByb2plY3RcIiwgXCIvcHJvamVjdFwiLCBcIlByb2plY3RcIiwgVmlld01vZGVsLCBcInByb2plY3QvcHJvamVjdC5odG1sXCIpXHJcbn1cclxuXHJcblxyXG4iLCJtb2R1bGUgQmlnUmVkT2N0b3B1cy5MYXlvdXRcclxue1xyXG4gICAgY2xhc3MgVmlld01vZGVsXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkbWRTaWRlbmF2KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgdG9nZ2xlU2lkZWJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy4kbWRTaWRlbmF2KCdsZWZ0JykudG9nZ2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEFuZ3VsYXJTdGF0ZShcImxheW91dFwiLCBudWxsLCBudWxsLCBWaWV3TW9kZWwsIFwibGF5b3V0L2xheW91dC5odG1sXCIpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
