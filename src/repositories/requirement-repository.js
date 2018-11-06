const dbProvider = require('../providers/database-provider')
const uuid = require('uuid/v4')

module.exports.createClanRequirement = async function(requirement) {
  const db = dbProvider.getInstance()

  requirementId = uuid()
  requirement.id = requirementId

  const query = {
    TableName: process.env.REQUIREMENTS_TABLE,
    Item: {
      clanId: requirement.clanId,
      id: requirementId,
      requirement
    }
  }

  await db.put(query).promise()

  return requirement
}

module.exports.getRequirementsByClanId = async function(clanId) {
  const db = dbProvider.getInstance()
  const query = {
    TableName: process.env.REQUIREMENTS_TABLE,
    KeyConditionExpression: 'clanId = :c',
    ExpressionAttributeValues: {
      ':c': clanId
    }
  }

  const results = await db.query(query).promise()

  return results.Items.map(item => item.requirement)
}
