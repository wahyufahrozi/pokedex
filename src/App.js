import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Contents from "./Components/layout/Contents";
import PokemonDetail from "./Components/Pokemon/PokemonDetail";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Contents} />
          <Route
            exact
            path="/pokemondetail/:PokemonId"
            component={PokemonDetail}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
