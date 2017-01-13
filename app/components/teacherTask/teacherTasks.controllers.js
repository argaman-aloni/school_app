/**
 * Created by argaman on 11/19/2016.
 */

import {Task} from 'shared.task'
import {
    SAVE_ACTION,
    EDIT_ACTION,
    DELETE_ACTION,
    CANCEL_ACTION
} from 'teacherTasks.actions'
import teachersTaskBoard from 'teacherTasks.module'
import FILE_UPLOAD_DB_URL from 'teacherTask.consts'


teachersTaskBoard.controller('tasksDisplayController', ['$log', '$scope', 'gridTileList', '$mdDialog', 'tasksDB', 'selectedTask', 'taskActions',
    function ($log, $scope, gridTileList, $mdDialog, tasksDB, selectedTask, taskActions) {

        let self = this;

        self.tasks = [];
        self.taskTiles = [];
        self.taskToSearch = "";
        self.fetchEnded = false;

        taskActions.tasks = self.tasks;
        taskActions.taskTiles = self.taskTiles;

        let task = Task();

        self.init = function () {
            tasksDB.query().$promise.then(function (tasks) {
                self.tasks = JSON.parse(JSON.stringify(tasks));
                $log.log(self.tasks);
                self.fetchEnded = true;
                self.taskTiles = gridTileList.buildTasksGrid(self.tasks);
            });

        };

        self.openTaskDialog = function (callback, ev) {
            $mdDialog.show({
                controller: "taskDialogController",
                bindToController: true,
                controllerAs: "ctrl",
                templateUrl: 'taskContent.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                escapeToClose: true,
                targetEvent: ev,
                fullscreen: true // Only for -xs, -sm breakpoints.
            }).then(callback);
        };

        self.openTaskContent = function (index, ev) {

            selectedTask.task = self.tasks[index];
            task.creationDate = new Date(task.creationDate);
            task.lastSubmissionDate = new Date(task.lastSubmissionDate);
            selectedTask.newTask = false;

            taskActions.task = selectedTask.task;
            self.openTaskDialog((action) => taskActions.actionMap.get(action)(index), ev);
        };

        self.createNewTask = function (ev) {
            selectedTask.task = Task();
            selectedTask.newTask = true;

            taskActions.task = selectedTask.task;
            self.openTaskDialog((action) => taskActions.actionMap.get(action)(0), ev);
        }

    }]);

teachersTaskBoard.controller('taskDialogController', ['$log', '$scope', '$mdDialog', 'tasksDB', 'selectedTask', 'dropZone',
    function ($log, $scope, $mdDialog, tasksDB, selectedTask, dropZone) {

        let self = this;

        self.dropzone = dropZone;
        $scope.task = selectedTask.task;
        $scope.newTask = selectedTask.newTask;
        self.minDate = selectedTask.task.creationDate;
        self.dropzone.options.url = FILE_UPLOAD_DB_URL;

        function __assertFileUpload() {
            "use strict";
            let filesList = self.dropzone.methods.getAllFiles();
            if (filesList.length == 0) {
                throw 'File not aded to the upload queue!';
            }

        }

        $scope.hide = function () {
            selectedTask.task = Task();
            $mdDialog.hide(CANCEL_ACTION);
        };

        self.delete = function () {
            tasksDB.delete({id: $scope.task._id}, function () {
                $mdDialog.hide(DELETE_ACTION);
            });
        };

        self.edit = function () {
            $log.log(selectedTask.task);
            $scope.editPressed = true;
        };

        self.save = function () {
            if (!$scope.taskForm.$valid)
                return;

            self.dropzone.methods.processQueue(); //starting the upload

            if ($scope.editPressed) {
                $scope.editPressed = false;
                tasksDB.update({id: selectedTask.task._id}, selectedTask.task,
                    (data) => $mdDialog.hide(EDIT_ACTION)
                );
                return;
            }
            __assertFileUpload();
            tasksDB.save(selectedTask.task, function (data) {
                $mdDialog.hide(SAVE_ACTION);
            });
        };

    }]);
