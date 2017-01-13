/**
 * Created by argaman on 11/12/2016.
 */

const teacherLounge = angular.module('teacherLounge', ['ngMaterial']);

teacherLounge.controller('terminalActionsController', ['$location', '$log', function ($location, $log) {
    let self = this;

    self.goToPage = function (path) {
        $location.path(path);
    }
}]);

