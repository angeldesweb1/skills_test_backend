export function Controller(name: string) {
  return (target: any) => {
    Reflect.defineMetadata('controller:name', name, target);
    const prototype = target.prototype;
    const methodNames = Object.getOwnPropertyNames(prototype);

    methodNames.forEach((methodName) => {
      if (methodName === 'constructor') return;
      const method = Reflect.getMetadata('method', prototype, methodName);
      const path = Reflect.getMetadata('path', prototype, methodName);

      console.log(`[${method}]: path: ${path}`);
    });
  };
}
