'use strict';

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({
  endpoint: process.env.SPLITFLAP_IOT_ENDPOINT,
});

module.exports.publishDisableMotors = async (event) => {
  const params = {
      topic: "splitFlap1/disableMotors",
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
