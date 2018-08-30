const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

function handleError(error, callback) {
  callback(error, {
    statusCode: 500,
    body: JSON.stringify(error)
  })
}

module.exports.createClanRequirement = async function(event, context, callback) {
  const requirement = JSON.parse(event.body)
  const { clanId } = requirement

  const requirementId = uuid()
  requirement.id = requirementId

  const query = {
    TableName: process.env.REQUIREMENTS_TABLE,
    Item: {
      id: requirementId,
      clanId,
      requirement
    }
  }

  try {
    await dynamoDb.put(query).promise()
  } catch (error) {
    console.error(error)
    handleError(error, callback)
  }

  const response = {
    statusCode: 201,
    body: JSON.stringify(requirement)
  }

  callback(null, response)
}

module.exports.getClanRequirements = async function(event, context, callback) {
  const clanId = event.queryStringParameters.clanId

  console.log(clanId)

  const query = {
    TableName: process.env.REQUIREMENTS_TABLE,
    Key: { clanId }
  }

  let result
  try {
    result = await dynamoDb.get(query).promise()
  } catch (error) {
    console.error(error)
    handleError(error, callback)
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(result)
  }

  callback(null, response)
}
