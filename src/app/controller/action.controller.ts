import { ActionEnum, ActionInterface } from '../model/action'
import { StructureController } from './structure.controller'

type ActionFunction = (action: ActionInterface) => String

/**
 * Class to traslate the actions recieved in the app into an implementations with redirections to the folder structure logic
 */
export class ActionController {
  constructor(private structureController: StructureController) {}

  private mapFunctions: Map<ActionEnum, ActionFunction> = new Map([
    [
      ActionEnum.CREATE,
      (action: ActionInterface) => {
        return this.structureController.create(action.argument!)
      },
    ],
    [
      ActionEnum.LIST,
      (action: ActionInterface) => {
        return this.structureController.list()
      },
    ],
    [
      ActionEnum.MOVE,
      (action: ActionInterface) => {
        return this.structureController.move(action.argument!)
      },
    ],
    [
      ActionEnum.DELETE,
      (action: ActionInterface) => {
        return this.structureController.delete(action.argument!)
      },
    ],
  ])

  processActions(actions: ActionInterface[]): String[] {
    return actions.map(action => {
      if (action.messageError) {
        return action.messageError
      } else {
        const actionFunction = this.mapFunctions.get(action.name)
        if (!actionFunction) {
          throw Error(`Command ${action.name} without implementation`)
        }
        return actionFunction(action)
      }
    })
  }
}
