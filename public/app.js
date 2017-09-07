var taskManagerApp = angular.module('taskmanager', []);

taskManagerController.$inject = ['$http'];
taskManagerApp.controller('taskManagerController', taskManagerController);

function taskManagerController($http){
    var vm = this;
    vm.task = {};

    init();

    vm.createTask = function() {
        $http.post('/task', vm.task)
            .then(successCallback, errorCallback);
    };

    vm.deleteTask = function() {
        $http.delete('/task/' + vm.selectedTask)
            .then(successCallback, errorCallback);
    };

     vm.editTask = function(id) {
        $http.put('/task/' + vm.selectedTask, vm.task)
            .then(successCallback, errorCallback);
    };

   function getTask(){
        $http.get('/task')
            .then(successCallback, errorCallback);
    }


    function successCallback(data){
        vm.task = {};
        vm.taskList = data.data;
    }

    function errorCallback(error){
        console.log('Error: ' + error);
    }

    function init(){
        getTask();
    }
};

