module.exports =
  class Restaurant {
    constructor(id, rest_name, address, login, password, avatar, description, foods) {
      this.id = id;
      this.rest_name = rest_name;
      this.address = address;
      this.login = login;
      this.password = password;
      this.avatar = avatar;
      this.description = description;
      this.foods = foods;
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
