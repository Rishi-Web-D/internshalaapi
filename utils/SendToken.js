exports.sendtoken = (employee, statusCode, res) => {
  const token = employee.getjwttoken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    secure: true,
    sameSite: 'None',
  };
  res
    .status(statusCode)

    .cookie("token", token, options)
    .json({ sucess: true, id: employee._id, token: token });

  // res.json({ token });
};
