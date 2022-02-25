import { ErrorInterface } from './error'

export enum ActionEnum {
  CREATE = 'CREATE',
  LIST = 'LIST',
  MOVE = 'MOVE',
  DELETE = 'DELETE',
}

export interface ActionInterface extends ErrorInterface {
  name: ActionEnum
  argument: String | undefined
}
