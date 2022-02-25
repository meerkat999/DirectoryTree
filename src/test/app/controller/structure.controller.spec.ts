import { expect } from 'chai'
import { StructureController } from '../../../app/controller/structure.controller'

describe('Structure test', () => {
  describe('Test structure', () => {
    const structureController = new StructureController()

    it('Must create the initial structure', async () => {
      const result = structureController.list()
      expect(result).to.be.equal('LIST')
    })

    it('Must create a folder', async () => {
      const result = structureController.create('crisman')
      expect(result).to.be.equal('CREATE crisman')

      const resultList = structureController.list()
      expect(resultList).to.be.equal('LIST\ncrisman')
    })

    it('Must create a subfolder', async () => {
      const result = structureController.create('crisman/carmona')
      expect(result).to.be.equal('CREATE crisman/carmona')

      const resultList = structureController.list()
      expect(resultList).to.be.equal('LIST\ncrisman\n\tcarmona')
    })

    it('Must create a secondfolder', async () => {
      const result = structureController.create('crisman2')
      expect(result).to.be.equal('CREATE crisman2')

      const resultList = structureController.list()
      expect(resultList).to.be.equal('LIST\ncrisman\n\tcarmona\ncrisman2')
    })

    it('Must delete a folder', async () => {
      const result = structureController.delete('crisman/carmona')
      expect(result).to.be.equal('DELETE crisman/carmona')

      const resultList = structureController.list()
      expect(resultList).to.be.equal('LIST\ncrisman\ncrisman2')
    })

    it('Must move a folder', async () => {
      const result = structureController.move('crisman crisman2')
      expect(result).to.be.equal('MOVE crisman crisman2')

      const resultList = structureController.list()
      expect(resultList).to.be.equal('LIST\ncrisman2\n\tcrisman')
    })

    it('Must not create a folder that exists', async () => {
      const result = structureController.create('crisman2/crisman')
      expect(result).to.be.equal(
        'Cannot create crisman. crisman already exists'
      )

      const resultList = structureController.list()
      expect(resultList).to.be.equal('LIST\ncrisman2\n\tcrisman')
    })
  })
})
