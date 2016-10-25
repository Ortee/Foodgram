module.exports =
  class Food {
    constructor(user, description, hashtags, photo, likes, dislikes, created_at) {
      this.user = user;
      this.description = description;
      this.hashtags = hashtags;
      this.photo = photo;
      this.likes = likes;
      this.dislikes = dislikes;
    }
    getUser(){
      return this.user;
    }
    getDescription(){
      return this.description;
    }
    getHashtags(){
      return this.hashtags;
    }
    getPhoto(){
      return this.photo;
    }
    getLikes(){
      return this.likes;
    }
    getDislikes(){
      return this.dislikes;
    }
  }
