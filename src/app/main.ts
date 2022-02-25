import * as readline from 'readline'
import { ActionController } from './controller/action.controller'
import { StructureController } from './controller/structure.controller'
import { processResponseData } from './model/builder/action.builder'
import { ReadTXTFileUtil } from './util/input/read-txt-file.util'

const DEFAULT_PATH: string = __dirname + '\\input.txt'

export async function initProcess(inputFilePath: string): Promise<String[]> {
  const readTXTFileService = new ReadTXTFileUtil()
  const dataResponse = await readTXTFileService.readFile(inputFilePath)
  const actions = processResponseData(dataResponse)
  const structureFolder = new StructureController()
  const actionController = new ActionController(structureFolder)
  return actionController.processActions(actions)
}

async function startCLI() {
  console.log('Starting')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const inputConsole = await new Promise<string>(res =>
    rl.question(
      `Please enter the path of the input.txt file (${DEFAULT_PATH}): `,
      res
    )
  )
  const inputFilePath = inputConsole || DEFAULT_PATH
  console.warn(`You are using the file: ${inputFilePath}`)
  const response = await initProcess(inputFilePath)
  response.forEach(x => console.log(x))
  process.exit(0)
}

startCLI()
