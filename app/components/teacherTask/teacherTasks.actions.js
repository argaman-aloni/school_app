/**
 * Created by argaman on 1/7/2017.
 */

import teachersTaskBoard from 'teacherTasks.module'

export const SAVE_ACTION = 'Saved';
export const EDIT_ACTION = 'Edited';
export const DELETE_ACTION = 'Deleted';
export const CANCEL_ACTION = 'Cancelled';

teachersTaskBoard.factory('taskActions', ['$log', 'gridTileList', '$mdToast',
    function ($log, gridTileList, $mdToast) {

        let tasks = null;
        let taskTiles = null;
        let task = null;

        function showToast(action) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(action + ' successfully')
                    .position('top')
                    .hideDelay(3000)
            );
        }

        function deleteTakLocallyAndNotify(index) {
            tasks.splice(index, 1);
            gridTileList.popTile(index, taskTiles);
            showToast(DELETE_ACTION);
            $log.log(tasks);
        }

        function saveTaskLocallyAndNotify() {
            tasks.push(task);
            gridTileList.pushTile(task, taskTiles);
            showToast(SAVE_ACTION);
            $log.log(tasks);
        }

        function setEditingTakFlag(index) {
            $log.log(tasks[index]);
            gridTileList.editTile(index, taskTiles, task.title);
            $log.log(tasks);
        }

        function cancelTaskAction() {
            $log.log('You cancelled the action.');
            $log.log(tasks);
            showToast(CANCEL_ACTION);
        }

        let actionMap = new Map();

        actionMap.set(DELETE_ACTION, deleteTakLocallyAndNotify);

        actionMap.set(SAVE_ACTION, saveTaskLocallyAndNotify);

        actionMap.set(EDIT_ACTION, setEditingTakFlag);

        actionMap.set(CANCEL_ACTION, cancelTaskAction);

        return {
            actionMap: actionMap,
            tasks: tasks,
            taskTiles: taskTiles,
            task: task
        }

    }]);
