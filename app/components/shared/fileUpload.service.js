/**
 * Created by argaman on 12/7/2016.
 */

const fileUploadModule = angular.module('fileUploadModule', ['thatisuday.dropzone']);

fileUploadModule.factory('dropZone', ['$log', function ($log) {

    // Dropzone.autoDiscover = false;

    /**
     * TODO: find out if there is something more that needs to be added to
     * TODO: those methods other than just logging
     * */

    function addedFile(file) {
        $log.log( file );
    }

    function success(file, xhr){
        $log.log(file, xhr);
    }

    function sending(req, formData) {
        $log.log('sending the file!');
    }

    let dzOptions = {
        clickable: true,
        paramName: 'file',
        maxFilesize: 5, //Maximal file size in MB
        autoProcessQueue: false,
        uploadMultiple: true
    };

    return {
        options: dzOptions,
        callbacks: {
            'addedfile': addedFile,
            'success': success,
            'sending': sending
        },
        methods: {}
    };

}]);