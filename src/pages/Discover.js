import React, { Component } from "react";
import styled from "styled-components";
import API from "../utils/API";

const ImageWrapper = styled.section`
  text-align: center;
  img {
    height: 400px;
  }
  p {
    margin-top: 2rem;
  }
`;

class Discover extends Component {
  state = {
    randomDog: "",
    friendCount: 0,
    friendMatched: false
  };

  componentDidMount() {
    //   Returns a promise object
    this.getRandomDog();
  }

  getRandomDog = () => {
    API.getRandomDog()
      .then(res => this.setState({ randomDog: res.data.message }))
      .catch(err => console.log(err));
  };

  handleLikeDislike = event => {
    const type = event.target.getAttribute("data-type"); // like or dislike
    const newState = { ...this.state }; // copy of what's in state

    // make changes in state
    if (type === "like") {
      const randomNum = Math.floor(Math.random() * 5) + 1;
      newState.friendMatched = randomNum === 3; // true or false
      // Ternary to determine if friend matched, add one to friends count.
      newState.friendCount = newState.friendMatched
        ? newState.friendCount + 1
        : newState.friendCount;
    } else {
      newState.friendMatched = false;
    }
    this.setState(newState, () => this.getRandomDog());
    // load new dog image
  };

  render() {
    return (
      <>
        <h2>Discover</h2>
        <h3>Pupper Friend Count: {this.state.friendCount}</h3>
        <ImageWrapper>
          {this.state.randomDog ? (
            <img src={this.state.randomDog} alt="random dog" />
          ) : (
            <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true" />
          )}
          <p>
            <button
              type="button"
              className="btn btn-primary mr-2"
              data-type="like"
              onClick={this.handleLikeDislike}
            >
              Like
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-type="dislike"
              onClick={this.handleLikeDislike}
            >
              Dislike
            </button>
          </p>
        </ImageWrapper>

        <div
          className={`alert alert-${
            this.state.friendMatched ? "success" : "danger"
          }`}
          role="alert"
        >
          {this.state.friendMatched
            ? "Yay! That doggo liked you!"
            : "That doggo didn't like you"}
        </div>
      </>
    );
  }
}

export default Discover;
