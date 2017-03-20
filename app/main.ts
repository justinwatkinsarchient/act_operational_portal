import * as angular from 'angular';
import template from './main.html!text';

export var Name = 'mainComponent';

class MainController implements ng.IComponentController {   
    static $inject = ['modules'];
    constructor(private modules) {
    }

    $onInit() {
    }
}

export var Component  = <angular.IComponentOptions> {
    controller: MainController,
    template: template
}

console.log(Component);