const requirementRepository = require('../repositories/requirement-repository')

module.exports.addRequirementForClan = async function(requirement) {
  return await requirementRepository.createClanRequirement(requirement)
}

module.exports.getClanRequirements = async function(clanId) {
  return await requirementRepository.getRequirementsByClanId(clanId)
}
