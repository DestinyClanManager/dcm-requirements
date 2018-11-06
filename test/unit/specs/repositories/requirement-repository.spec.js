describe('requirement repository', () => {
  let subject, dbProvider, db

  beforeEach(() => {
    db = {
      query: td.function(),
      get: td.function(),
      put: td.function()
    }
    dbProvider = td.replace('../../../../src/providers/database-provider')

    td.when(dbProvider.getInstance()).thenReturn(db)

    subject = require('../../../../src/repositories/requirement-repository')
  })

  describe('createClanRequirement', () => {
    describe('when the save is successful', () => {
      let actual, requirement

      beforeEach(async () => {
        const promise = td.function()
        td.when(db.put(td.matchers.anything())).thenReturn({ promise })

        requirement = {
          clanId: 'clan-id',
          type: 'platform',
          value: 'xbox'
        }
        actual = await subject.createClanRequirement(requirement)
      })

      it('saves the requirement', () => {
        const expectedQuery = {
          TableName: 'dcm-requirements',
          Item: {
            clanId: 'clan-id',
            requirement,
            id: td.matchers.anything()
          }
        }
        td.verify(db.put(expectedQuery))
      })

      it('returns the requirement with a generated id', () => {
        const idRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
        expect(actual.clanId).toEqual('clan-id')
        expect(actual.type).toEqual('platform')
        expect(actual.value).toEqual('xbox')
        expect(idRegex.test(actual.id)).toEqual(true)
      })
    })

    describe('when the save is NOT successful', () => {
      let actual, requirement

      beforeEach(async () => {
        const promise = td.func()
        td.when(promise()).thenReturn(Promise.reject(new Error('the error')))
        td.when(db.put(td.matchers.anything())).thenReturn({ promise })

        requirement = {
          clanId: 'clan-id',
          type: 'platform',
          value: 'xbox'
        }
        try {
          await subject.createClanRequirement(requirement)
        } catch (error) {
          actual = error
        }
      })

      it('returns the error', () => {
        expect(actual.message).toEqual('the error')
      })
    })
  })

  describe('getRequirementsByClanId', () => {
    describe('when the query is successful', () => {
      let actual

      beforeEach(async () => {
        const promise = td.function()

        const results = {
          Items: [
            {
              requirement: 'requirement-1',
              id: 'requirement-1',
              clanId: 'clan-id'
            },
            {
              requirement: 'requirement-2',
              id: 'requirement-2',
              clanId: 'clan-id'
            }
          ]
        }

        td.when(promise()).thenResolve(results)
        td.when(db.query(td.matchers.anything())).thenReturn({ promise })

        actual = await subject.getRequirementsByClanId('clan-id')
      })

      it('queries for the clans requirements', () => {
        const expectedQuery = {
          TableName: 'dcm-requirements',
          KeyConditionExpression: 'clanId = :c',
          ExpressionAttributeValues: {
            ':c': 'clan-id'
          }
        }
        td.verify(db.query(expectedQuery))
      })

      it('returns the requirements for the give clan', () => {
        expect(actual).toEqual(['requirement-1', 'requirement-2'])
      })
    })

    describe('when the query is NOT successful', () => {
      let actual, requirement

      beforeEach(async () => {
        const promise = td.func()
        td.when(promise()).thenReturn(Promise.reject(new Error('the error')))
        td.when(db.query(td.matchers.anything())).thenReturn({ promise })

        try {
          await subject.getRequirementsByClanId('clan-id')
        } catch (error) {
          actual = error
        }
      })

      it('returns the error', () => {
        expect(actual.message).toEqual('the error')
      })
    })
  })
})
