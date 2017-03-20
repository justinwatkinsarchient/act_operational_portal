import * as $ from 'jquery';
import * as _ from 'lodash';
import 'bootstrap';
import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import { StateProvider, Ng1StateDeclaration, Ng1StateTransitionHook } from 'angular-ui-router';
import 'oclazyload';
import * as MainComponent from './main';


/**
 * manually bootstrap angular.
 * This loads a small json configuration file
 * to determine the modules that are installed as a part of the application
 */
$.get('modules.json')
.then((modules) => {
    var appModule = angular.module('app', [uiRouter, 'oc.lazyLoad'])
    .constant('modules', modules) // create a modules constant
    .config(config) // run the configuration logic
    .component(MainComponent.Name, MainComponent.Component); // declare the root component
    angular.element(function() {
        angular.bootstrap(document, ['app'], {strictDi:true});
    });
});


config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'modules'];
/**
 * Root application configuration section
 * 
 * @param {StateProvider} $stateProvider 
 * @param {any} $urlRouterProvider 
 * @param {any} $ocLazyLoadProvider 
 * @param {any} modules 
 */
function config($stateProvider: StateProvider, $urlRouterProvider, $ocLazyLoadProvider, modules) {
    $ocLazyLoadProvider.config({
        suppressBootstrapWarning: true
    });
    $stateProvider
    .state(<Ng1StateDeclaration>{
        name: 'app',
        url: '/act',
        component: MainComponent.Name,
        data: {
            hide: true
        }
    });

    /**
     * A small utility to dynamically load modules with SystemJS and ocLazyLoad
     * @param path 
     */
    let loader = (path) => {
        return transition => {
            let modLoader = transition.injector().get('$ocLazyLoad');
            return System.import(path).then(module => {
                modLoader.inject(module.default);
                return module.moduleStates;
            })
        }
    }
    _.each(modules, (state) => {
        state.lazyLoad = loader(state.lazyModule)
        $stateProvider.state(state);
    })

    // TODO: make this use $state instead of url routing
    $urlRouterProvider.otherwise('/act');
}