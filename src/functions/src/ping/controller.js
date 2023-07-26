exports.ping = async (req, res) => {
  res.status(200).send({
    message: 'pong!',
  });
};
