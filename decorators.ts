interface IComponentDef {
    name?: string;
    module?: string;
}

function copyObject(target: Object, source: Object): Object {
    for (let property in source) {
        if (source.hasOwnProperty(property)) {
            target[property] = source[property];
        }
    }
    return {};
}

export function Component(config: ng.IComponentOptions & IComponentDef): ClassDecorator {
    return function (target: any): ng.IComponentOptions {
        config.controller = target;
        config.templateUrl = "views/" + config.templateUrl;
        if (!config.hasOwnProperty("bindings")) {
            config.bindings = {};
        }
        copyObject(config.bindings, target.prototype.zz$$bindings);
        delete target.prototype.zz$$input;
        return config;
    };
}

export function Input(config?: any): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        if (!target.zz$$bindings) {
            target.zz$$bindings = {};
        }
        target.zz$$bindings[propertyKey] = "<";
    };
}
