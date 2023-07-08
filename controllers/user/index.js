import User from "../../model/users/index.js";

export async function getUserData(req, res) {
  try {
    const user = await User.findById({ _id: req.user.userId });
    if (!user) {
      res.status(400).json({ message: "Пользователь не найден" });
    }
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: "Can't get user data" });
  }
}
export async function changeUserData(req, res) {
  try {
    const { email, firstName, lastName, age, gender, phone } = req.body;
    console.log(req.body);
    const user = await User.findById({ _id: req.user.userId });
    console.log(user);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.gender = gender;
    user.phone = phone;
    await user.save();
    res.json({ user, message: "Информация сохранена" });
  } catch (e) {
    res.status(500).json({ message: "Can't update user data" });
  }
}
