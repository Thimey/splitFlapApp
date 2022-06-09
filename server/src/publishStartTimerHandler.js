'use strict';

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({
  endpoint: process.env.SPLITFLAP_IOT_ENDPOINT,
});

module.exports.publishStartTimer = async (event) => {
  const { seconds } = JSON.parse(event.body);

  const params = {
      topic: "splitFlap1/startTimer",
      payload: JSON.stringify({
        seconds
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
  }
};
