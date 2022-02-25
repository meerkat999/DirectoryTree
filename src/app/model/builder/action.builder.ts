import { ActionEnum, ActionInterface } from '../action'

/**
 * Converts the string lines response into ActionInterface to manage the info into interfaces
 * @param data Big string data
 * @returns
 */
export const processResponseData = (data: String): ActionInterface[] => {
  const lines = data?.split('\n')
  return lines.map(processLine)
}

/**
 * It process all the lines of the data response and converts it into ActionInterface
 * @param line
 * @returns
 */
const processLine = (line: string): ActionInterface => {
  line = line.trim()
  const lineGroups: string[] = line.split(' ')
  const actionName = lineGroups.shift() || ''
  let action: ActionInterface = {
    name: actionName as ActionEnum,
    argument: lineGroups.join(' '),
  }
  if (!(actionName in ActionEnum)) {
    action.messageError = `The command ${actionName} doesn't exist`
  }
  return action
}
