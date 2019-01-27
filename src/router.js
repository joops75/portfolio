import React from "react";
// Generally speaking, you should use a <BrowserRouter> if you have a server that responds to requests
// and a <HashRouter> if you are using a static file server.
import { HashRouter, Route } from "react-router-dom";
import HeaderNav from './components/HeaderNav';
import {
    Home,
    NoughtsAndCrosses,
    SimonGame,
    DrumMachine,
    DungeonCrawler,
    ChoroplethMap,
    ForceDirectedGraph,
    Treemap
} from "./components/LoadableComponents";

const AppRouter = () => (
    <HashRouter>
        <div>
            <HeaderNav />
            <Route path="/" exact component={Home} />
            <Route path="/noughtsandcrosses/" component={NoughtsAndCrosses} />
            <Route path="/simongame/" exact component={SimonGame} />
            <Route path="/drummachine/" component={DrumMachine} />
            <Route path="/dungeoncrawler/" component={DungeonCrawler} />
            <Route path="/choroplethmap/" component={ChoroplethMap} />
            <Route path="/forcedirectedgraph/" component={ForceDirectedGraph} />
            <Route path="/treemap/" component={Treemap} />
        </div>
    </HashRouter>
);

export default AppRouter;
