import * as angular from 'angular';
import template from './layout.html!text';

export var Component = <ng.IComponentOptions> {
    controller: LayoutController,
    template: template,
    bindings: {
        '$transition$': '<'
    }
}

class LayoutController implements ng.IComponentController {
    static $inject = [];
    constructor() {
        console.log('layout');
    }
}

export var Name = 'portal.layout';