module.exports =
  class Restaurant {
    constructor(id, rest_name, address, login, password, avatar, description, created_at, updated_at) {
      this.id = id;
      this.rest_name = rest_name;
      this.address = address;
      this.login = login;
      this.password = password;
      this.avatar = avatar;
      this.description = description;
      this.created_at = created_at;
      this.updated_at = updated_at;
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
    getCreatedAt() {
      return this.created_at;
    }
    getUpdatedAt() {
      return this.updated_at;
    }
  };
