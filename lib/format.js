export function formatCurrency(n) {
  if (n === null || n === undefined) return ''
  const num = Number(n)
  if (isNaN(num)) return ''
  return num.toLocaleString('vi-VN') + ' VND'
}

export default formatCurrency
