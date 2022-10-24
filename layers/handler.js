const { v4: uuidv4 } = require('uuid');

module.exports.uuid = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        uuidv4: uuidv4(),
      },
      null,
      2
    ),
  };
};
