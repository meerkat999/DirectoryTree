import { ActionController } from './controller/action.controller'
import { StructureController } from './controller/structure.controller'
import { processResponseData } from './model/builder/action.builder'
import { ReadTXTFileUtil } from './util/input/read-txt-file.util'

const DEFAULT_PATH: string = __dirname + '\\input.txt'

export async function main(): Promise<String[]> {
  console.log('Starting')
  const inputFileData = process.env.FILE_PATH || DEFAULT_PATH
  if (inputFileData === DEFAULT_PATH) {
    console.warn(`You are using the default path file: ${DEFAULT_PATH}`)
  }
  const readTXTFileService = new ReadTXTFileUtil()
  const dataResponse = await readTXTFileService.readFile(inputFileData)
  const actions = processResponseData(dataResponse)
  const structureFolder = new StructureController()
  const actionController = new ActionController(structureFolder)

  const response = actionController.processActions(actions)
  response.forEach(x => console.log(x))
  return response
}

main()
