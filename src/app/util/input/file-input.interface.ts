export interface FileInputInterface {
  readFile(path: string): Promise<String>
}
