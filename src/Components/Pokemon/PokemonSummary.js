import React from "react";

export const PokemonSummary = props => {
  const {
    height,
    weight,
    catchRate,
    eggGroup,
    hatchsteps,
    abilities,
    evs
  } = props;
  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Height :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{height}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Weight :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{weight}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Catch Rate :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{catchRate}%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Egg Group :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{eggGroup}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Hatch Steps :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{hatchsteps}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Abilities :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{abilities}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="float-right">Evs :</h6>
            </div>
            <div className="col-md-6">
              <h6 className="float-left">{evs}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
