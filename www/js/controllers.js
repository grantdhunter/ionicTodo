angular.module('controllers', [])

.controller('mainCtrl', function ($scope, $ionicPopover, Camera) {
    $scope.showEdit = false;

    $scope.items = readLocalStorageArray('items');
    $scope.item = {};

    $ionicPopover.fromTemplateUrl('views/add-item-popover.html', {
        scope: $scope,
        focusFirstInput: true
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event).then(function () {
            console.log($scope);
        });
    }

    $scope.closePopover = function () {
        $scope.popover.hide();
    }

    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    $scope.saveItem = function () {
        console.log($scope.item);
        var items = readLocalStorageArray('items');
        $scope.item.id = new Date().getTime();
        items.push($scope.item);
        saveLocalStorage('items', items);
        $scope.item = {};

        $scope.closePopover();
        $scope.items = readLocalStorageArray('items');
    }

    function readLocalStorageArray(store) {
        var stores = localStorage[store]

        if (stores) {
            stores = JSON.parse(stores);
        } else {
            stores = [];
        }
        return stores;
    }

    function saveLocalStorage(store, thing) {
        localStorage[store] = JSON.stringify(thing);
    }
    $scope.showEditing = function () {
        $scope.showEdit = true;
    }
    $scope.hideEditing = function () {
        $scope.showEdit = false;
    }

    $scope.reorderItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
        saveLocalStorage('items', $scope.items);
    }
    $scope.deleteItem = function (index) {
        $scope.items.splice(index, 1)
        saveLocalStorage('items', $scope.items);
    }

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageUrl) {
            $scope.item.img = imageUrl;
        }, function (err) {
            console.log(err);
        });
    }
});