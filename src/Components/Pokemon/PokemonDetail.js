import React, { Component } from "react";
import axios from "axios";
import typecolor from "../../Styles/Colors";
import { Link } from "react-router-dom";
export default class PokemonDetail extends Component {
  state = {
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    types: [],
    name: "",
    PokemonId: "",
    imageUrl: "",
    description: "",
    height: "",
    weight: "",
    eggGroup: "",
    abilities: "",
    genderratioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchsteps: ""
  };
  async componentDidMount() {
    const { PokemonId } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${PokemonId}/`;
    const pokemonSpeciesAPI = `https://pokeapi.co/api/v2/pokemon-species/${PokemonId}/`;

    const pokemonResponse = await axios.get(pokemonUrl);

    const name = pokemonResponse.data.name;
    const imageUrl = pokemonResponse.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonResponse.data.stats.map(stats => {
      switch (stats.stat.name) {
        case "hp":
          hp = stats["base_stat"];
          break;
        case "attack":
          attack = stats["base_stat"];
          break;
        case "defense":
          defense = stats["base_stat"];
          break;
        case "speed":
          speed = stats["base_stat"];
          break;
        case "special-attack":
          specialAttack = stats["base_stat"];
          break;
        case "special-defense":
          specialDefense = stats["base_stat"];
          break;

        default:
      }
    });
    const height = pokemonResponse.data.height;
    const weight = pokemonResponse.data.weight;
    const types = pokemonResponse.data.types.map(types => types.type.name);
    const abilities = pokemonResponse.data.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map(abs => abs.charAt(0).toUpperCase() + abs.substring(1))
          .join(" ");
      })
      .join(", ");

    const evs = pokemonResponse.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map(es => es.charAt(0).toUpperCase() + es.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    await axios.get(pokemonSpeciesAPI).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return true;
        }
      });
      const femaleRate = res.data.gender_rate;
      const genderRatioFemale = 12.5 * femaleRate;
      const genderratioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data.capture_rate);

      const eggGroup = res.data.egg_groups
        .map(group => {
          return group.name
            .split("-")
            .map(abs => abs.charAt(0).toUpperCase() + abs.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchsteps = 255 * (res.data.hatch_counter + 1);

      this.setState({
        description,
        genderratioMale,
        genderRatioFemale,
        eggGroup,
        hatchsteps,
        catchRate
      });
    });
    this.setState({
      speed,
      imageUrl,
      PokemonId,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      evs,
      height,
      weight,
      abilities
    });
  }
  render() {
    return (
      <>
        <Link to="/">
          <i
            className="fa fa-arrow-left"
            style={{
              fontSize: "30px",
              marginLeft: "10px",
              marginTop: "10px",
              color: "black"
            }}
          />
        </Link>
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-8">
                  <h5 className="mx-auto">
                    {this.state.name
                      .toLowerCase()
                      .split(" ")
                      .map(nm => nm.charAt(0).toUpperCase() + nm.substring(1))
                      .join(" ")}
                  </h5>
                </div>
                <div className="col-4">
                  <div className="float-right">
                    {this.state.types.map(type => (
                      <span
                        style={{
                          backgroundColor: `#${typecolor[type]}`,
                          color: "white"
                        }}
                        key={type}
                        className="badge  badge-pill mr-2"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img
                    src={this.state.imageUrl}
                    className="card-img-top rounded mx-auto mt-2"
                    style={{
                      width: "200px"
                    }}
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${this.state.stats.hp}%`
                          }}
                        >
                          <small>{this.state.stats.hp}%</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Speed</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${this.state.stats.speed}%`
                          }}
                        >
                          <small>{this.state.stats.speed}%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${this.state.stats.attack}%`
                          }}
                        >
                          <small>{this.state.stats.attack}%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${this.state.stats.specialAttack}%`
                          }}
                        >
                          <small>{this.state.stats.specialAttack}%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${this.state.stats.defense}%`
                          }}
                        >
                          <small>{this.state.stats.defense}%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${this.state.stats.specialDefense}%`
                          }}
                        >
                          <small>{this.state.stats.specialDefense}%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3 ml-5">
                  <div className="col">
                    <p>{this.state.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <div className="card-tilte text-center">Summary</div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Height :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.height}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Weight :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.weight}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Catch Rate :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.catchRate}%</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Egg Group :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.eggGroup}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Hatch Steps :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.hatchsteps}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Abilities :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.abilities}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="float-right">Evs :</h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="float-left">{this.state.evs}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
