const contacts = [
  {
    _id: "6081bff46009a91588e2deae",
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-6685",
    favorite: false,
  },
  {
    _id: "6081bff46009a91588e2deaf",
    name: "Kennedy Lane",
    email: "mattis.Cras@nonenimMauris.net",
    phone: "(542) 451-7038",
  },
];

const newContacts = {
  name: "New",
  email: "New email",
  phone: "111111111",
  favorite: false,
};

const User = {
  name: "Guest",
  subscription: "starter",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGMyYTg5NGRkZDExMjAzY2Q1Zjc0YiIsImlhdCI6MTYyMDQ5MjUwMywiZXhwIjoxNjIwNTM1NzAzfQ.I1x1ZYtHwqS3H8Oh_kUYcPqfNqV87y7wBzYU7nDKjnk",
  idImg: null,
  _id: "604780b0a33f593b5866d70d",
  id: "604780b0a33f593b5866d70d",
  email: "tes111@test.com",
  password: "$2a$08$ebkI0zFk0IBoStiDDhyzr.9y0BqToGXPtrcTqcMErEuk4JHHF3K8O",
  updatedAt: "2021-03-10T00:05:44.937Z",
  avatar:
    "https://s.gravatar.com/avatar/c8a063704eb496eed52d9e3d54261181?s=250",
};
const users = [];
users[0] = User;

const newUser = { email: "test1@test.com", password: "123456" };

module.exports = { contacts, newContacts, User, users, newUser };
