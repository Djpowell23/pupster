import React, { Component } from "react";
import styled from "styled-components";
import API from "../utils/API";

const ImageGallery = styled.section`
  text-align: center;
  h3 {
    margin: 1.25rem auto;
  }
  img {
    height: 300px;
  }
`;

const Item = styled.li`
  border: ${props => (props.isActive ? "2px dashed #28a745" : null)};
`;

class Search extends Component {
  state = {
    breedList: [],
    breedImages: [],
    selectedBreed: "",
    searchedBreed: "",
    selectedImage: ""
  };

  componentDidMount() {
    API.getBreeds()
      .then(res => this.setState({ breedList: res.data.message }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    console.log(event.target);
    const value = event.target.value;
    this.setState({ selectedBreed: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getBreedImages(this.state.selectedBreed)
      .then(res =>
        this.setState({
          breedImages: res.data.message.slice(0, 20),
          searchedBreed: this.state.selectedBreed
        })
      )
      .catch(err => console.log(err));
  };

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
            value={this.state.selectedBreed}
            onChange={this.handleInputChange}
          />
          <datalist id="breeds">
            ​
            {this.state.breedList.map(breed => (
              <option value={breed} key={breed} />
            ))}
          </datalist>
          <button
            type="submit"
            className="btn btn-success btn-block mt-2"
            onClick={this.handleFormSubmit}
          >
            Search
          </button>
        </form>
        <ImageGallery>
          {this.state.searchedBreed ? (
            <h3>
              Images of{" "}
              {this.state.searchedBreed[0].toUpperCase() +
                this.state.searchedBreed.substring(1)}{" "}
              Dogs
            </h3>
          ) : (
            <h3>Search a breed to see images </h3>
          )}
          <ul className="list-group">
            {this.state.breedImages.map(image => (
              <Item
                className="list-group-item"
                key={image}
                onClick={() => this.setState({ selectedImage: image })}
                isActive={image === this.state.selectedImage}
              >
                <img src={image} alt="breed-image" />
              </Item>
            ))}
          </ul>
        </ImageGallery>
      </>
    );
  }
}

export default Search;

// {this.state.breedImages.map(image => (
//     <img src={image} alt="breed-image" key={image} />
//   ))}
