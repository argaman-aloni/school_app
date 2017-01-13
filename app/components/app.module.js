/**
 * Created by argaman on 11/11/2016.
 */

const schoolApp = angular.module('schoolApp', [
    'ngMaterial',
    'ngAnimate',
    'ngResource',
    'ui.router',
    'thatisuday.dropzone',
    'teacherLounge',
    'teachersTaskBoard'
]);

schoolApp.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('light-blue');
});

schoolApp.config(function($stateProvider) {
    $stateProvider.state('teacher-terminal', {
        url: '/teacher-terminal',
        templateUrl: 'teacherLounge/teacherLounge.html'
    }).state('task-board', {
        url: '/teacher-task-board',
        templateUrl: 'teacherTask/tasksPage.html'
    });
});