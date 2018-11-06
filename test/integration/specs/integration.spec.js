const supertest = require('supertest')

describe('Notes API', () => {
  let request

  beforeEach(() => {
    request = supertest(process.env.REQUIREMENTS_BASE_URL)
  })

  describe('createClanRequirement', () => {
    let actual, idRegex

    beforeEach(async () => {
      const requirement = {
        type: 'platform',
        value: 'xbox',
        clanId: 'clan-id'
      }

      idRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

      const response = await request
        .post('/')
        .send(requirement)
        .expect(201)

      actual = response.body
    })

    it('returns the created note', () => {
      expect(idRegex.test(actual.id)).toBe(true)
      expect(actual.type).toEqual('platform')
      expect(actual.value).toEqual('xbox')
      expect(actual.clanId).toEqual('clan-id')
    })
  })

  describe('getClanRequirements', () => {
    let actual

    beforeEach(async () => {
      const response = await request.get('?clanId=clan-id').expect(200)

      actual = response.body
    })

    it('returns the clan requirements', () => {
      expect(actual.length).toEqual(1)
      expect(actual[0].clanId).toEqual('clan-id')
      expect(actual[0].type).toEqual('platform')
      expect(actual[0].value).toEqual('xbox')
    })
  })
})
