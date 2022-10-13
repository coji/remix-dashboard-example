import dayjs from "dayjs"

import ja from "dayjs/locale/ja"
import utc from "dayjs/plugin/utc"

dayjs.locale(ja)
dayjs.extend(utc)

console.log("dayjs extended")

export default dayjs
