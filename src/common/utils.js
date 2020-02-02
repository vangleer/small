// 封装一个防抖函数
export function deBounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 封装一个时间格式化的方法
export function formatDate(date1, format) {
  const date = new Date()
  let y = date.getFullYear()
  y = y >= 10 ? y : '0' + y
  let m = date.getMonth() + 1
  m = m >= 10 ? m : '0' + m
  let d = date.getDate()
  d = d >= 10 ? d : '0' + d
  if (format === 'yyyy/mm/dd') {
    return `${y}/${m}/${d}`
  }
  return `${y}-${m}-${d}`
}
