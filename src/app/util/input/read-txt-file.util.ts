import fs from 'fs'
import { ActionController } from '../../controller/action.controller'
import { StructureController } from '../../controller/structure.controller'
import { ActionInterface } from '../../model/action'
import { processResponseData } from '../../model/builder/action.builder'
import { FileInputInterface } from './file-input.interface'

export class ReadTXTFileUtil implements FileInputInterface {
  async readFile(path: string): Promise<String> {
    return new Promise((res, rej) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data)
        }
      })
    })
  }
}
