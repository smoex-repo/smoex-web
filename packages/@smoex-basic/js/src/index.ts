
// 转换成一个元素类型一致且没有空元素的数组
export function toArray<T>(value?: T | T[]): T[] {
  const empty = [] as T[]
  if (!value) {
    return empty
  }
  return empty.concat(value).filter(Boolean)
}

// 处理 date 类型的兼容
export function toDate(value: Date | string | number): Date {
  const param = typeof value === 'string' ? value.replace(/-/g, '/') : value
  return new Date(param)
}

// 可以获得更多的 typeOf 类型
export function typeOf(value: any): string {
    return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
}

// mock 耗时操作 1000 count 约为 700 毫秒，具体时间取决于电脑性能
export function calculate(count = 3000) {
  let a
  const startTime = +new Date()
	for (let i = 1; i < 1000; i++) {
		for (let j = 1; j < 1000; j++) {
      for (let k = 1; k < count; k++) {
        const b = k * 100
        a = b
      }
		}
  }
  console.log(`mock duration: ${+new Date() - startTime}ms`)
  return a
}

// 在 async 函数中 mock 延时
export const sleep = (timeout: any) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout)
})