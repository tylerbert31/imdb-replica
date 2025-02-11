export default function autoBind<T extends object>(instance: T): void {
  const proto = Object.getPrototypeOf(instance) as object;

  Object.getOwnPropertyNames(proto).forEach((key) => {
    const val = (proto as Record<string, any>)[key];
    if (typeof val === "function" && key !== "constructor") {
      (instance as Record<string, any>)[key] = val.bind(instance);
    }
  });
}
