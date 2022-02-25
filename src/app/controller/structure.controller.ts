import { FolderInterface } from '../model/folder'

/**
 * Class with recursive methods to iterate the folder structure
 */
export class StructureController {
  private initFolder: FolderInterface = {
    name: 'init',
    folders: [],
  }

  constructor() {}

  list(): string {
    return this.printFolders(this.initFolder.folders, 0, 'LIST')
  }

  create(actionArgument: String): String {
    const names = actionArgument.split('/')
    const wasCreated = this.createSubFolder(
      actionArgument,
      names,
      this.initFolder
    )
    return wasCreated === true ? 'CREATE ' + actionArgument : String(wasCreated)
  }

  delete(actionArgument: String): String {
    const names = actionArgument.split('/')
    const wasDeleted: FolderInterface | String = this.deleteFolder(
      actionArgument,
      names,
      this.initFolder
    )
    return (wasDeleted as FolderInterface)?.name !== undefined
      ? 'DELETE ' + actionArgument
      : String(wasDeleted)
  }

  move(actionArgument: String): String {
    const groupArguments = actionArgument.split(' ')
    const argumentToDelete = groupArguments[0]
    const namesToDelete = groupArguments[0].split('/')
    const itemToDelete = this.deleteFolder(
      argumentToDelete,
      namesToDelete,
      this.initFolder
    )
    if (!itemToDelete) {
      return String(itemToDelete)
    }
    const argumentsToCreate = groupArguments[1]
    const namesToCreate = argumentsToCreate.split('/')
    const wasMoved = this.moveFolder(
      actionArgument,
      namesToCreate,
      this.initFolder,
      0,
      itemToDelete as FolderInterface
    )
    if (!wasMoved) {
      return String(wasMoved)
    }
    return `MOVE ${actionArgument}`
  }

  /**
   * Recursive method to print the structure
   * It orders alphabetically the name of the folders
   * @param folders List of folders to iterate
   * @param level Actual index by recursivity
   * @param response String response
   * @returns
   */
  private printFolders(
    folders: FolderInterface[],
    level: number = 0,
    response: string = ''
  ): string {
    if (folders?.length === 0) {
      return response
    }
    folders
      .sort((fa, fb) => fa.name.localeCompare(String(fb.name)))
      .forEach(f => {
        response = response.concat(`\n${'\t'.repeat(level)}${f.name}`)
        response = this.printFolders(f.folders, level + 1, response)
      })
    return response
  }

  /**
   * Resursive method to delete a folder of a parent folder.
   * Could return an error or the instace of the item deleted
   * @param actionArgument Arguments of action
   * @param names Names in argument ex: fruits apples
   * @param parentFolder
   * @param index Actual index by recursivity
   * @returns
   */
  private deleteFolder(
    actionArgument: String,
    names: String[],
    parentFolder: FolderInterface,
    index: number = 0
  ): FolderInterface | String {
    if (index === names.length) {
      return `Cannot delete ${names.length}. It doesnt exist`
    }
    if (index === names.length - 1) {
      const folderToDelete: FolderInterface = parentFolder.folders.find(
        f => f.name === names[index]
      )!
      parentFolder.folders = parentFolder.folders.filter(
        f => f.name !== names[index]
      )
      return folderToDelete
    }
    const childFound = parentFolder.folders.find(
      folder => folder.name === names[index]
    )
    if (!childFound) {
      return (
        'Cannot delete ' +
        actionArgument +
        ' - ' +
        names[index] +
        ' does not exist'
      )
    }
    return this.deleteFolder(actionArgument, names, childFound, index + 1)
  }

  /**
   * Recursive method to move an instance folder to another folder
   * @param actionArgument
   * @param names Ex [fruits orange]
   * @param parentFolder
   * @param index  Actual index by recursivity
   * @param folderToMove Instance of the folder to move to another folder
   * @returns
   */
  private moveFolder(
    actionArgument: String,
    names: String[],
    parentFolder: FolderInterface,
    index: number = 0,
    folderToMove: FolderInterface
  ): Boolean | String {
    if (index === names.length) {
      parentFolder.folders.push(folderToMove)
      return true
    }
    const childFound = parentFolder.folders.find(
      folder => folder.name === names[index]
    )
    if (!childFound) {
      return (
        'Cannot create ' +
        actionArgument +
        ' - ' +
        names[index] +
        ' does not exist'
      )
    }
    return this.moveFolder(
      actionArgument,
      names,
      childFound,
      index + 1,
      folderToMove
    )
  }

  /**
   * Recursive method to iterate the structure to create a new folder
   * @param actionArgument
   * @param names Ex [fruits orange]
   * @param parentFolder
   * @param index  Actual index by recursivity
   * @returns
   */
  private createSubFolder(
    actionArgument: String,
    names: String[],
    parentFolder: FolderInterface,
    index: number = 0
  ): Boolean | String {
    if (index === names.length - 1) {
      return this.createSingleFolder(names[index], parentFolder)
    }
    const childFound = parentFolder.folders.find(
      folder => folder.name === names[index]
    )
    if (!childFound) {
      return (
        'Cannot create ' +
        actionArgument +
        ' - ' +
        names[index] +
        ' does not exist'
      )
    }
    return this.createSubFolder(actionArgument, names, childFound, index + 1)
  }

  /**
   * Method to create a new folder inside in another folder
   * @param name
   * @param parentFolder
   * @returns
   */
  private createSingleFolder(
    name: String,
    parentFolder: FolderInterface
  ): Boolean | String {
    let response = ''
    const folderFound = parentFolder.folders.find(
      folder => folder.name === name
    )
    if (folderFound) {
      return (response =
        'Cannot create ' + name + '. ' + name + ' already exists')
    } else {
      parentFolder.folders.push({
        name,
        folders: [],
      })
    }
    return true
  }
}
