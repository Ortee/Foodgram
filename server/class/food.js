module.exports =
  class Food {
    constructor(id, uuid, username, login, description, hashtags, photo, likes, dislikes, created_at, updated_at) {
      this.id = id;
      this.uuid = uuid;
      this.username = username;
      this.login = login;
      this.description = description;
      this.hashtags = hashtags;
      this.photo = photo;
      this.likes = likes;
      this.dislikes = dislikes;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
    getId() {
      return this.id;
    }
    getUuid() {
      return this.uuid;
    }
    getUsername() {
      return this.username;
    }
    getDescription() {
      return this.description;
    }
    getHashtags() {
      return this.hashtags;
    }
    getPhoto() {
      return this.photo;
    }
    getLikes() {
      return this.likes;
    }
    getDislikes() {
      return this.dislikes;
    }
    getCreatedAt() {
      return this.created_at;
    }
    getUpdatedAt() {
      return this.updated_at;
    }
  };
