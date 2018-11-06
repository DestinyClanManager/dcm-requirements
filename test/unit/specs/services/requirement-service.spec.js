describe('requirement service', () => {
  let subject, requirementRepository

  beforeEach(() => {
    requirementRepository = td.replace('../../../../src/repositories/requirement-repository')
    subject = require('../../../../src/services/requirement-service')
  })

  describe('addRequirementForClan', () => {
    let actual

    beforeEach(async () => {
      td.when(requirementRepository.createClanRequirement('the-requirement')).thenResolve('created-requirement')
      actual = await subject.addRequirementForClan('the-requirement')
    })

    it('returns the created requirement', () => {
      expect(actual).toEqual('created-requirement')
    })
  })

  describe('getClanRequirements', () => {
    let actual

    beforeEach(async () => {
      td.when(requirementRepository.getRequirementsByClanId('clan-id')).thenResolve('clan-requirements')
      actual = await subject.getClanRequirements('clan-id')
    })

    it('returns the clans requirements', () => {
      expect(actual).toEqual('clan-requirements')
    })
  })
})
