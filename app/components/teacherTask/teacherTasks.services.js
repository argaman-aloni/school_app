/**
 * Created by argaman on 12/4/2016.
 */

import {Task} from 'shared.task'
import teachersTaskBoard from 'teacherTasks.module'

teachersTaskBoard.factory('tasksDB', ['$log', '$http', '$resource',
    function ($log, $http, $resource) {
        return $resource('/database/tasks/:id', null, {
            'update': {method: 'PUT'}
        });
    }]);

teachersTaskBoard.factory('selectedTask', function () {
    return {
        task: Task(),
        newTask: false
    };
});