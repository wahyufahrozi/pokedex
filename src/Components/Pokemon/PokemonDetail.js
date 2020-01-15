import React, { Component } from "react";
import axios from "axios";
import typecolor from "../../Styles/Colors";
import { Link } from "react-router-dom";
import { PokemonDetailSub } from "./PokemonDetailSub";
import { PokemonSummary } from "./PokemonSummary";
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
    const {
      hp,
      speed,
      attack,
      specialAttack,
      defense,
      specialDefense
    } = this.state.stats;
    const {
      height,
      weight,
      catchRate,
      eggGroup,
      hatchsteps,
      abilities,
      evs
    } = this.state;
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
            <PokemonDetailSub
              imageUrl={this.state.imageUrl}
              hp={hp}
              speed={speed}
              attack={attack}
              specialAttack={specialAttack}
              defense={defense}
              specialDefense={specialDefense}
              description={this.state.description}
            />
            <hr />
            <div className="card-body">
              <div className="card-tilte text-center">Summary</div>
              <PokemonSummary
                height={height}
                weight={weight}
                catchRate={catchRate}
                eggGroup={eggGroup}
                hatchsteps={hatchsteps}
                abilities={abilities}
                evs={evs}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
