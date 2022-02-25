import { expect } from 'chai'
import { initProcess } from '../../app/main'
import fs from 'fs'

describe('Main test', () => {
  it('Must test all the app', async () => {
    const responseOutput = fs.readFileSync(__dirname + '/output.txt', 'utf8')
    let response = await initProcess(__dirname + '/input.txt')
    const responseItems: string[] = []
    response.forEach(r => responseItems.push(...r.split('\n'))) as any
    const localFileItems = responseOutput.split('\r\n')
    expect(responseItems.length).to.be.equal(localFileItems.length)
    for (let index = 0; index < responseItems.length; index++) {
      const responseItem = responseItems[index]
      const localItem = localFileItems[index]
      expect(responseItem.trim()).to.be.equal(localItem.trim())
    }
  })
})
