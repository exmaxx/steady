import dayjs from 'dayjs'
import Calendar from 'dayjs/plugin/calendar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

export function registerVueFilters() {
  // TODO: Show nicer format (needs additonal translations first).
  // Vue.filter('asIntervalDate', (datetime: string) => dayjs(datetime).calendar())

  Vue.filter('formatDateAndTime', (datetime: string) =>
    dayjs(datetime).format('LLL')
  )
  Vue.filter('formatDate', (datetime: string) => dayjs(datetime).format('LL'))
  Vue.filter('asIntervalDate', (datetime: string) => dayjs(datetime).fromNow())
  Vue.filter('dayInWeek', (datetime: string) => dayjs(datetime).format('dddd'))
}

export function registerDayjsExtensions() {
  dayjs.extend(Calendar)
  dayjs.extend(relativeTime)
  dayjs.extend(localizedFormat)
}
