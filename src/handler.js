const requirementService = require('./services/requirement-service')

function handleError(error, callback) {
  if (process.env.LOGGING_ENABLED === 'true') {
    console.error(error)
  }
  callback(error, {
    statusCode: 500,
    body: JSON.stringify(error)
  })
}

module.exports.createClanRequirement = async function(event, context, callback) {
  const requirement = JSON.parse(event.body)

  let createdRequirement
  try {
    createdRequirement = await requirementService.addRequirementForClan(requirement)
  } catch (error) {
    handleError(error, callback)
  }

  const response = {
    statusCode: 201,
    body: JSON.stringify(createdRequirement)
  }

  callback(null, response)
}

module.exports.getClanRequirements = async function(event, context, callback) {
  const clanId = event.queryStringParameters.clanId

  let requirements
  try {
    requirements = await requirementService.getClanRequirements(clanId)
  } catch (error) {
    handleError(error, callback)
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(requirements)
  }

  callback(null, response)
}
