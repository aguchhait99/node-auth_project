const { hashPassword } = require("../../helper/commonHelper");
const UserModel = require("../../model/user");

class AuthController {
  async userRegistration(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          message: "Email already exists.",
        });
      }
      const hashedPassword = await hashPassword(password);
      const user = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
      if (req.file) {
        user.image = req.file.path;
      }
      const data = await user.save();
      if (data) {
        res.status(201).json({
          message: "User has been registered successfully.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthController();
