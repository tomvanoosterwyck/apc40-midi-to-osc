import fs from 'fs'
import path from 'path'

export default (file) => {
  let p = fs.readFileSync(path.join(process.mainModule.path, file))

  // if (process.env.NODE_ENV === "development") {
  //   data = JSON.parse(fs.readFileSync(path.join(process.mainModule.path, 'src', file)))
  // }
  // else {
  //   data = JSON.parse(fs.readFileSync(path.join(path.dirname(process.execPath), 'src', file)))
  // }
  return JSON.parse(p)
}