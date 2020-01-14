import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Styles/style.css";
import styled from "styled-components";

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0.12), 0 1px 2px rgba(0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const LinkStyle = styled(Link)`
  color: black;
  &:focus,
  &:hover,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    PokemonId: "",
    LoadingImage: true,
    manyrequest: false
  };
  componentDidMount() {
    const { name, url } = this.props;
    const PokemonId = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${PokemonId}.png?raw=true`;
    this.setState({
      name,
      imageUrl,
      PokemonId
    });
  }
  render() {
    return (
      <div className="col-md-4 col-sm-6 mb-5">
        <LinkStyle to={`pokemondetail/${this.state.PokemonId}`}>
          <Card className="card">
            <h5 className="card-header">
              {this.state.name
                .toLowerCase()
                .split(" ")
                .map(
                  titlecontent =>
                    titlecontent.charAt(0).toUpperCase() +
                    titlecontent.substring(1)
                )
                .join(" ")}
            </h5>
            {this.state.LoadingImage ? (
              <img
                src={require("../../Assets/loading.gif")}
                style={{ width: "5em", height: "5em" }}
                className="card-img-top rounded mx-auto d-block mt-2"
                alt="..."
              />
            ) : null}
            <img
              src={this.state.imageUrl}
              style={{ height: "10em", width: "10em", margin: "0 auto" }}
              className="card-img-top"
              alt={this.state.name}
              onLoad={() =>
                this.setState({
                  LoadingImage: false
                })
              }
              onError={() =>
                this.setState({
                  manyrequest: true
                })
              }
            ></img>
          </Card>
        </LinkStyle>
      </div>
    );
  }
}
