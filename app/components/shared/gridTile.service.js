/**
 * Created by argaman on 11/26/2016.
 */

const gridModule = angular.module('gridModule', ['ngMaterial', 'ngMessages']);

gridModule.factory('gridTileList', ['$log', function($log) {

    let colorList = ["green", "darkBlue", "blue", "deepBlue", "lightPurple"];

    let tileTemplate = {
        title: "",
        background: ""
    };

    let buildTasksGrid = function(objectsList) {
        let objectTile, tileList = [ ];
        $log.info('Starting to build the UI tiles list');
        for (let i = 0; i < objectsList.length; i++) {
            objectTile = angular.extend({}, tileTemplate);
            objectTile.title = objectsList[i].title;
            objectTile.span = {row: 1, col: 1};

            objectTile.background = colorList[i % colorList.length];
            tileList.push(objectTile);
        }
        return tileList;
    };

    let pushTile = function(newObject, tileList) {
        $log.info('Adding a new tile to the tiles list');
        let objectTile = angular.extend({}, tileTemplate);
        objectTile.title = newObject.title;
        objectTile.span = {row: 1, col: 1};

        objectTile.background = colorList[tileList.length % colorList.length];
        tileList.push(objectTile);
    };

    let popTile = function(index, tileList) {
        $log.info('Removing a tile from th tiles list');
        tileList.splice(index, 1);
    };

    let editTile = function(index, tileList, title) {
        $log.info('Editing an exisitng tile');
        tileList[index].title = title;
    };

    return {
        buildTasksGrid: buildTasksGrid,
        pushTile: pushTile,
        popTile: popTile,
        editTile: editTile
    }

}]);
