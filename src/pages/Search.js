import React, { Component } from "react";
import API from "../utils/API";

class Search extends Component {
  state = {
    breedList: [],
    breedImages: [],
    selectedBreed: "",
    searchedBreed: ""
  };

  componentDidMount() {
    API.getBreeds()
      .then(res => this.setState({ breedList: res.data.message }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h2>Search a Breed!</h2>
        <form>
          <label htmlFor="breed-choice">Breed name:</label>
          <input
            list="breeds"
            id="breed-choice"
            name="breed-choice"
            className="form-control"
            placeholder="Choose a Breed"
          />
          <datalist id="breeds">
            ​
            {this.state.breedList.map(breed => (
              <option value={breed} key={breed} />
            ))}
          </datalist>
          <button type="submit" className="btn btn-success btn-block mt-2">
            Search
          </button>
        </form>
      </>
    );
  }
}

export default Search;
