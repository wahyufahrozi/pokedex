import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import HeaderComponents from "../layout/Header";
import axios from "axios";
export default class PokemonList extends Component {
  constructor() {
    super();
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon",
      pokemon: null,
      search: "",
      handlingInput: ""
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  async componentDidMount() {
    const response = await axios.get(this.state.url);
    this.setState({
      pokemon: response.data.results
    });
  }
  handleChangeSearch(e) {
    e.preventDefault();
    // console.log("COba", e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSearch() {
    if (this.state.search === "") {
      this.setState({
        handlingInput: "Please Input"
      });
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
        .then(response => {
          console.log("respon searc", response);
          this.setState({
            pokemon: response.data.results
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <>
        <HeaderComponents />
        <form
          className="form-inline my-12 my-lg-0 "
          style={{ marginLeft: "75%" }}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder={
              this.state.handlingInput === ""
                ? "input search text"
                : this.state.handlingInput
            }
            aria-label="Search"
            value={this.state.search}
            name="search"
            onChange={this.handleChangeSearch}
            style={{ width: 200 }}
          />
          <button
            className="btn btn-primary my-2 my-sm-0"
            type="submit"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </form>
        <div className="container">
          {this.state.pokemon ? (
            <div className="row">
              {this.state.pokemon.map(pokemon => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))}
            </div>
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
