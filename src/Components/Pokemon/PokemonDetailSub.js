import React from "react";

export const PokemonDetailSub = props => {
  const {
    hp,
    speed,
    attack,
    specialAttack,
    defense,
    specialDefense,
    imageUrl,
    description
  } = props;
  return (
    <div>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img
              src={imageUrl}
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
                      width: `${hp}%`
                    }}
                  >
                    <small>{hp}%</small>
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
                      width: `${speed}%`
                    }}
                  >
                    <small>{speed}%</small>
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
                      width: `${attack}%`
                    }}
                  >
                    <small>{attack}%</small>
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
                      width: `${specialAttack}%`
                    }}
                  >
                    <small>{specialAttack}%</small>
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
                      width: `${defense}%`
                    }}
                  >
                    <small>{defense}%</small>
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
                      width: `${specialDefense}%`
                    }}
                  >
                    <small>{specialDefense}%</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 ml-5">
            <div className="col">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
