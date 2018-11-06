require('dotenv').config({ path: './test/integration/.integration.env' })

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })

const databaseProvider = require('../../src/providers/database-provider')
const db = databaseProvider.getInstance()
const query = {
  TableName: 'dcm_requirements_test',
  KeyConditionExpression: 'clanId = :c',
  ExpressionAttributeValues: {
    ':c': 'clan-id'
  }
}

db.query(query)
  .promise()
  .then(async results => {
    for (let result of results.Items) {
      const deleteQuery = {
        TableName: 'dcm_requirements_test',
        Key: {
          clanId: 'clan-id',
          id: result.id
        }
      }

      await db.delete(deleteQuery).promise()
    }

    console.log('test environment restored')
  })
