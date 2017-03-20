/**
 * module required to allow TypeScript import of static templates without complaining about
 * no module found
 */
declare module "*.html" { 
  export default ""; 
} 

/**
 * module required to allow TypeScript import of static templates without complaining about
 * no module found
 */
declare module "*.html!text" { 
  export default ""; 
} 

/**
 * Simple shim definition for the System module loader 
 * 
 * @interface System
 */
interface System {
    import: (name: string, moduleName?: string) => {
        then: (successCallback: Function, failCallback?: Function) => void;
    }
}

declare var System: System;