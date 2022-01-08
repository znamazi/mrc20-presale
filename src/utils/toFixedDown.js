Number.prototype.toFixedDown = function (digits) {
  const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
    m = this.toString().match(re)
  return m ? parseFloat(m[1]) : this.valueOf()
}
