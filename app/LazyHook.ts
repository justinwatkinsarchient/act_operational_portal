import * as angular from 'angular';
import 'oclazyload';
import uiRouter from 'angular-ui-router';
import { StateProvider, Ng1StateDeclaration } from 'angular-ui-router';

var lazyHook = angular.module('lazyHook', [uiRouter, 'oc.lazyLoad'])

lazyHook.run(['$transitions', '$q', '$ocLazyLoad', function ($transitions, $q, $ocLazyLoad) {
    function hasLazyComponent(state) {
        console.log('hasLazyComponent', state);
        if (state.lazyComponent != null) {
            state.lazyLoad = loadStates(state.lazyComponent);
            return true;
        }
        return false;
    }

    function loadStates(path) {
        
        return (transition) => {
            console.log('loadStates', path);
            return System.import(path)
            .then((module) => {
                return module.moduleState;
            })
        }
    }

    function loadComponent(state) {
        console.log('loadComponent', state);
        return System.import(state.lazyComponent).then(
            (module) => {
                return $ocLazyLoad.inject(module.default)
                .then(() => {
                    delete state.lazyComponent;
                });
            })
    }

    function lazyLoadComponents($transition$) {
        let promises = $transition$.entering()
            .filter(hasLazyComponent)
            .map(loadComponent)

        // return a promise for all the lazy components loading
        return $q.all(promises);
    }
    let transitionCriteria = { entering: hasLazyComponent };
    $transitions.onBefore(transitionCriteria, lazyLoadComponents)
}])

export default 'lazyHook';

export interface ILazyStateDeclareation extends Ng1StateDeclaration {
    lazyComponent: string;
}