import * as angular from 'angular';
import template from './about.html!text';

/**
 * 
 * 
 * @class AboutController
 * @implements {ng.IComponentController}
 */
class AboutController implements ng.IComponentController {
    //injector syntax, required for minification and by configuration
    static $inject = [];

    /**
     * Creates an instance of AboutController.
     * 
     * @memberOf AboutController
     */
    constructor() {
        console.log('about me');
    }
}

/**
 * component meta data
 */
export var Component  = <angular.IComponentOptions> {
    controller: AboutController,
    template: template,
    bindings: {
        $transition$: '<'
    }
}

export var Name = 'portal.about';