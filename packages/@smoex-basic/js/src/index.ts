
export function toArray<T>(value?: T | T[]): T[] {
  const empty = [] as T[]
  if (!value) {
    return empty
  }
  return empty.concat(value).filter(Boolean)
}

export function toDate(value: Date | string | number): Date {
  const param = typeof value === 'string' ? value.replace(/-/g, '/') : value
  return new Date(param)
}

export function toSwitch(...exps: any[]): any {
  return exps.filter(Boolean)[0]
}

export function typeOf(value: any): string {
    return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
}
