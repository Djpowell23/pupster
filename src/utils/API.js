import axios from "axios";

export default {
  getRandomDog: function() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },
  getBreeds: function() {
    return axios.get("https://dog.ceo/api/breeds/list");
  },
  getBreedImages: function(breed) {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`);
  }
};
