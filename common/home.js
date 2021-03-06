miModulo.controller("HomeController", [
    "$scope",
    "auth",
    "$location",
    "ajaxService",
    "$routeParams",
    function ($scope, auth, $location, ajaxService, $routeParams) {
        $scope.controller = "HomeController";
        if (auth.data.status == 200) {
            $scope.datosDeSesion = auth.data;
        } else {
            $location.path("/home");
        }
        $scope.operationIcon = "fas fa-home";
        $scope.operationName = "Bienvenido";
        $scope.entityName = "producto";
        $scope.entityHome = "home";
        $scope.entityIcon = "fas fa-shopping-cart";

        $scope.status = {};
        $scope.status.success = "";
        $scope.status.error = "";

        $scope.neighbourhood = 2;

        if ($routeParams.page == undefined) {
            $scope.page = 1;
        } else {
            $scope.page = parseInt($routeParams.page);
        }

        if ($routeParams.rpp == undefined) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = parseInt($routeParams.rpp);
        }

        if ($routeParams.orderfield == undefined) {
            $scope.orderField = "id";
        } else {
            $scope.orderField = $routeParams.orderfield;
        }

        if ($routeParams.orderdirection == undefined) {
            $scope.orderDirection = "asc";
        } else {
            $scope.orderDirection = $routeParams.orderdirection;
        }

        ajaxService.ajaxPlist($scope.entityName, $scope.page, $scope.rpp, $scope.orderField, $scope.orderDirection).then(function (response) {
            $scope.entities = response.data;
            $scope.pages = response.data.totalPages;
            paginacion();
        }).catch(function (error) {
            $scope.status.error = "ERROR: Los " + $scope.entityName + " con id " + $scope.id + " NO se ha podido leer.";
        });

        function paginacion() {
            $scope.botonera = [];
            for (i = 1; i <= $scope.pages; i++) {
                if (i == 1) {
                    $scope.botonera.push(i);
                } else if (i > ($scope.page - $scope.neighbourhood) && i < ($scope.page + $scope.neighbourhood)) {
                    $scope.botonera.push(i);
                } else if (i == $scope.pages) {
                    $scope.botonera.push(i);
                } else if (i == ($scope.page - $scope.neighbourhood) || i == ($scope.page + $scope.neighbourhood)) {
                    $scope.botonera.push('...');
                }
            }
        }
    }])