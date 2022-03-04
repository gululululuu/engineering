import { get } from './request.js'

const getStudentsInfo = get('/students')
const getCoursesInfo = get('/courses')

export {
  getStudentsInfo,
  getCoursesInfo
}
