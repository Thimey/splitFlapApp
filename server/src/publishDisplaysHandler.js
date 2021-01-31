'use strict';

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({
  endpoint: 'a1inih3er5l0sk-ats.iot.ap-southeast-2.amazonaws.com',
});

module.exports.publishDisplays = async (event) => {
  console.info(JSON.stringify(event));
  const { characterDisplays } = JSON.parse(event.body);

  const params = {
      topic: "splitFlap1/display",
      payload: JSON.stringify({
        characterDisplays,
      }),
      qos: 0
  };



  await iotData.publish(params).promise();

  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        characterDisplays
      }),
  }
};
