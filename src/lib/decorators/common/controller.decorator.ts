export function Controller(name: string) {
  return (target: any) => {
    Reflect.defineMetadata('controller:name', name, target);
    const prototype = target.prototype;
    const methodNames = Object.getOwnPropertyNames(prototype);

    methodNames.forEach((methodName) => {
      console.log(methodName);
    });
  };
}
