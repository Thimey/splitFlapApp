'use strict';

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({
  endpoint: process.env.SPLITFLAP_IOT_ENDPOINT,
});

module.exports.publishDisplays = async (event) => {
  console.info(JSON.stringify(event));
  const { characterDisplays, stepDelay } = JSON.parse(event.body);

  const params = {
      topic: "splitFlap1/display",
      payload: JSON.stringify({
        characterDisplays,
        stepDelay,
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
        characterDisplays,
        stepDelay,
      }),
  }
};
