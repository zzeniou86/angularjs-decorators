interface IComponentDef {
    /**
     * Element selector for component in camelCase.
     */
    selector: string;
    components?: string[];
    provides?: string[];
}

function dashToUppercase(str: string) {
    return str.replace(/-([a-z])/g, function (m, w) { return w.toUpperCase(); });
}


export function Component(config: ng.IComponentOptions & IComponentDef): ClassDecorator {
    return function (target: any): any {

        // set component options
        let componentOptions: ng.IComponentOptions = {};
        componentOptions.controller = target;
        componentOptions.controllerAs = config.controllerAs;
        componentOptions.templateUrl = "views/" + config.templateUrl;
        componentOptions.template = config.template;
        componentOptions.bindings = Object.assign({}, config.bindings, target.prototype.zz$$bindings);
        componentOptions.require = config.require;
        componentOptions.transclude = config.transclude;
        delete target.prototype.zz$$bindings;
        angular.module(target.name, config.provides ? config.provides : [])
            .component(dashToUppercase(config.selector), componentOptions);
        return target;
    };
}

export function Input(symbol?: any): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        if (!target.zz$$bindings) {
            target.zz$$bindings = {};
        }
        symbol = ( symbol !== undefined && (symbol === "<" || symbol === "@") ) ? symbol : "<";
        target.zz$$bindings[propertyKey] = symbol;
    };
}

export function Output(): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        if (!target.zz$$bindings) {
            target.zz$$bindings = {};
        }
        target.zz$$bindings[propertyKey] = "&";
    };
}

export function Inject(arr: string[]): ClassDecorator {
    return function (target: any): any {
        target.$inject = arr;
    };
}

export function Service(name: string): ClassDecorator {
    return function (target: any): any {
        angular.module(target.name, []).service(name, target);
        return target;
    };
}

export function Factory(name: string): ClassDecorator {
    return function (target: any): any {
        angular.module(target.name, []).factory(name, target.instance);
        return target;
    };
}

