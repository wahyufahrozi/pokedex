import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import HeaderComponents from "../layout/Header";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
export default class PokemonList extends Component {
  constructor() {
    super();
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon",
      pokemon: "",
      types: []
    };
  }
  fetchMoreData = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");

    const next = response.data.next;
    let url = await axios.get(next);

    setTimeout(() => {
      this.setState({
        pokemon: [...this.state.pokemon, ...url.data.results]
      });
    }, 1500);
  };
  async componentDidMount() {
    const pokemonType = `https://pokeapi.co/api/v2/type/`;
    const responsepokemonType = await axios.get(pokemonType);
    // console.log("dad", responsepokemonType);

    const types = responsepokemonType.data.results;

    const response = await axios.get(this.state.url);

    this.setState({
      pokemon: response.data.results,
      types
    });
  }

  render() {
    const { pokemon } = this.state;

    // console.log("results", results);

    return (
      <>
        <HeaderComponents />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <label>Type</label>
              <select className="form-control form-control-sm">
                {this.state.types.map((content, index) => {
                  return (
                    <option key={index}>
                      {content.name
                        .toLowerCase()
                        .split(" ")
                        .map(
                          Categoryname =>
                            Categoryname.charAt(0).toUpperCase() +
                            Categoryname.substring(1)
                        )
                        .join(" ")}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          {pokemon ? (
            <InfiniteScroll
              dataLength={pokemon.length}
              next={this.fetchMoreData}
              hasMore={true}
              loader={<h4>Loading ...</h4>}
            >
              <div className="row">
                {pokemon.map(pokemon => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div class="d-flex justify-content-center">
              <div class="spinner-grow text-dark" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
