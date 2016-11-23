module.exports =
  class Restaurant {
    constructor(rest_name) {
      this.rest_name = rest_name;
    }

    id(id) {
      this.id = id;
      return this;
    }

    address(address) {
      this.address = address;
      return this;
    }

    login(login) {
      this.login = login;
      return this;
    }

    password(password) {
      this.password = password;
      return this;
    }

    avatar(avatar) {
      this.avatar = avatar;
      return this;
    }

    description(description) {
      this.description = description;
      return this;
    }

    foods(foods) {
      this.foods = foods;
      return this;
    }

    likes(likes) {
      this.likes = likes;
      return this;
    }

    dislikes(dislikes) {
      this.dislikes = dislikes;
      return this;
    }

    getId() {
      return this.id;
    }

    getRestName() {
      return this.rest_name;
    }

    getAddress() {
      return this.address;
    }

    getLogin() {
      return this.login;
    }

    getPassword() {
      return this.password;
    }

    getavatar() {
      return this.avatar;
    }

    getDescription() {
      return this.description;
    }

    getFoods() {
      return this.foods;
    }

  };
