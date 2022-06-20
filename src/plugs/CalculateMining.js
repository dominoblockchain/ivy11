class CalculateMining {
  /**
   * 计算当前北京时间
   * @returns {Date}
   */
  static getBeijingTime () {
    const systemDate = new Date()
    const offsetMinute = systemDate.getTimezoneOffset() + 480
    const beijing = systemDate.getTime() + offsetMinute * 60000
    return new Date(beijing)
  }

  /**
   * 计算活动已持续时间
   * @param startTime 活动开始日期
   * @returns {{hour: number, day: number, minute: number, second: number}}
   */
  static getContinuedTime (startTime) {
    const DAY = 86400000
    const HOUR = 3600000
    const MINUTE = 60000
    const offset = CalculateMining.getBeijingTime().getTime() - startTime.getTime()
    const day = parseInt((offset / DAY).toString())
    const hour = parseInt(((offset % DAY) / HOUR).toString())
    const minute = parseInt(((offset % HOUR) / MINUTE).toString())
    const second = parseInt(((offset % MINUTE) / 1000).toString())
    return {
      day,
      hour,
      minute,
      second
    }
  }

  /**
   * 获取当前挖矿数量
   * @param total 挖矿总量
   * @param startTime 活动开始日期
   * @param days 活动持续天数
   * @returns {number}
   */
  static getYields ({ total, startTime, days }) {
    const ContinuedTime = CalculateMining.getContinuedTime(startTime)
    const dayAverage = total / days
    const hourAverage = dayAverage / 24
    const minuteAverage = hourAverage / 60
    const secondAverage = minuteAverage / 60
    return dayAverage * ContinuedTime.day + hourAverage * ContinuedTime.hour + minuteAverage * ContinuedTime.minute + secondAverage * ContinuedTime.second
  }

  static install (app, options) {
    app.config.globalProperties.$CalculateMining = CalculateMining
  }
}

export default CalculateMining
