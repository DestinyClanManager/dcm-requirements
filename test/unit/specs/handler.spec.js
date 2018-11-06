describe('handler', () => {
  let callback, subject, requirementService

  beforeEach(() => {
    callback = td.func()
    requirementService = td.replace('../../../src/services/requirement-service')
    subject = require('../../../src/handler')
  })

  describe('createClanRequirement', () => {
    describe('when everything goes well', () => {
      beforeEach(() => {
        const requirement = {
          clanId: 'clan-id',
          type: 'platform',
          value: 'xbox'
        }
        const event = {
          body: JSON.stringify(requirement)
        }

        td.when(requirementService.addRequirementForClan(requirement)).thenResolve('created-requirement')

        subject.createClanRequirement(event, null, callback)
      })

      it('sends a created response', () => {
        const expectedResponse = {
          statusCode: 201,
          body: JSON.stringify('created-requirement')
        }
        td.verify(callback(null, expectedResponse))
      })
    })

    describe('when something goes amiss', () => {
      let error

      beforeEach(() => {
        const requirement = {
          clanId: 'clan-id',
          type: 'platform',
          value: 'xbox'
        }
        const event = {
          body: JSON.stringify(requirement)
        }

        error = new Error('the error')
        td.when(requirementService.addRequirementForClan(requirement)).thenReject(error)

        subject.createClanRequirement(event, null, callback)
      })

      it('sends an error response', () => {
        const expectedResponse = {
          statusCode: 500,
          body: JSON.stringify(error)
        }
        td.verify(callback(error, expectedResponse))
      })
    })
  })

  describe('getClanRequirements', () => {
    describe('when everything goes well', () => {
      beforeEach(async () => {
        td.when(requirementService.getClanRequirements('clan-id')).thenResolve('clan-requirements')

        const event = {
          queryStringParameters: {
            clanId: 'clan-id'
          }
        }

        await subject.getClanRequirements(event, null, callback)
      })

      it('Responds with the clan requirements', () => {
        const expectedResponse = {
          statusCode: 200,
          body: JSON.stringify('clan-requirements')
        }
        td.verify(callback(null, expectedResponse))
      })
    })

    describe('when something goes amiss', () => {
      let error

      beforeEach(async () => {
        error = new Error('the error')
        td.when(requirementService.getClanRequirements('clan-id')).thenReject(error)

        const event = {
          queryStringParameters: {
            clanId: 'clan-id'
          }
        }

        await subject.getClanRequirements(event, null, callback)
      })

      it('sends an error response', () => {
        const errorResponse = {
          statusCode: 500,
          body: JSON.stringify(error)
        }
        td.verify(callback(error, errorResponse))
      })
    })
  })
})
