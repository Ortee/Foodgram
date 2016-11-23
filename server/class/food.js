module.exports =
  class Food {
    constructor(login) {
      this.login = login;
    }

    id(id) {
      this.id = id;
      return this;
    }

    uuid(uuid) {
      this.uuid = uuid;
      return this;
    }

    username(username) {
      this.username = username;
      return this;
    }

    description(description) {
      this.description = description;
      return this;
    }

    hashtags(hashtags) {
      this.hashtags = hashtags;
      return this;
    }

    photo(photo) {
      this.photo = photo;
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

    created_at(created_at) {
      this.created_at = created_at;
      return this;
    }

    updated_at(updated_at) {
      this.updated_at = updated_at;
      return this;
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
