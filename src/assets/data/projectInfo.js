import { FRONTEND, FULLSTACK } from './projectTypes';

export default [
    {
        src: require('../images/noughtsandcrosses.png'),
        href: '/noughtsandcrosses',
        title: 'Noughts and Crosses',
        type: FRONTEND,
        description: 'Play against an unbeatable CPU! The CPU analyses a maximum of three possible moves for each player and plays the optimum one. Try not to lose! Also known as tic-tac-toe.',
        tech: 'jQuery, Bootstrap',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/NoughtsAndCrosses'
    },
    {
        src: require('../images/simongame.png'),
        href: '/simongame',
        title: 'Simon Game',
        type: FRONTEND,
        description: 'Successfully repeat a CPU-lead random sequence of 20 flashes to win! Play in strict mode to allow no mistakes. Based on the 1970s electronic game.',
        tech: 'jQuery',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/SimonGame'
    },
    {
        src: require('../images/drummachine.png'),
        href: '/drummachine',
        title: 'Drum Machine',
        type: FRONTEND,
        description: 'Play a variety of sounds by via mouse clicks or keyboard presses. Change the sounds assigned to each button by using the ‘set’ switch or ‘o’ key. Alter the volume via the slider control or arrow keys. The names of any actions will appear in the display. Remember to power-up the ‘device’ first via the ‘pow’ switch or ‘p’ key!',
        tech: 'React, Redux, Sass',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/DrumMachine'
    },
    {
        src: require('../images/dungeoncrawler.png'),
        href: '/dungeoncrawler',
        title: 'Dungeon Crawler',
        type: FRONTEND,
        description: 'Progress through 4 randomly generated dungeons and defeat the boss to win! Walk into enemies to attack and level-up by defeating them. Damage is dealt according to level, weapon and dungeon.',
        tech: 'React, jQuery',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/DungeonCrawler'
    },
    {
        src: require('../images/forcedirectedgraph.png'),
        href: '/forcedirectedgraph',
        title: 'Force Directed Graph',
        type: FRONTEND,
        description: 'An interactive graph showing national contiguity. Countries which are neighbours have their flags joined by a line. Mouse over a flag to reveal its country’s name and click and drag it to reposition.',
        tech: 'D3',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/ForceDirectedGraph'
    },
    {
        src: require('../images/choroplethmap.png'),
        href: '/choroplethmap',
        title: 'Choropleth Map',
        type: FRONTEND,
        description: 'View a map of the US displaying the population % with a bachelors degree or higher for each state. Mouse over a state to view a popup for more information.',
        tech: 'D3, TopoJSON',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/ChoroplethMap'
    },
    {
        src: require('../images/treemap.png'),
        href: '/treemap',
        title: 'Treemap Diagram',
        type: FRONTEND,
        description: 'View a diagram using proportionally-accurate rectangles displaying the top video games sales, movie sales or Kickstarter pledges. Mouse over a rectangle to view a popup for more information.',
        tech: 'D3',
        code: 'https://github.com/joops75/portfolio/tree/master/src/screens/Treemap'
    },
    {
        src: require('../images/barcoordin8er.png'),
        href: 'https://bar-coordin8er.herokuapp.com/',
        title: 'Bar Coordin8er',
        type: FULLSTACK,
        description: 'Search for food and drink businesses in any location worldwide via the Yelp Fusion API. Login via GitHub and declare/cancel attendance for a venue on the current day.',
        tech: 'Node, Express, jQuery, Bootstrap, MongoDB,  Mongoose, React, Passport',
        code: 'https://github.com/joops75/bar-coordin8er'
    },
    {
        src: require('../images/stockcharter.png'),
        href: 'https://joops75-stock-charter.herokuapp.com/',
        title: 'Stock Charter',
        type: FULLSTACK,
        description: 'Search for a stock with the Alpha Vantage API by entering its ticker symbol (e.g. MSFT for Microsoft) and see its recent price data added to a chart. Re-plot a stock by re-entering its symbol and delete it by clicking on the cross next to its symbol. Watch the chart as it updates when other users edit it!',
        tech: 'Node, Express, jQuery, MongoDB, React, D3, Socket.IO',
        code: 'https://github.com/joops75/stock-charter'
    },
    {
        src: require('../images/booktrader.png'),
        href: 'https://joopsbooktrader.herokuapp.com/',
        title: 'Book Trader',
        type: FULLSTACK,
        description: 'An app that facilitates the borrowing and lending of books between users. Login and add your own books with the Open Library Books API by entering their ISBNs. Search for other users’ books available for loan by location and request to borrow them. Accept or decline borrowing requests. Get access to another user’s email when a borrow request is accepted to arrange the transaction.',
        tech: 'Node, Express, Sass, jQuery, Bootstrap, EJS, MongoDB, Mongoose, React, Passport',
        code: 'https://github.com/joops75/booktrader'
    },
    {
        src: require('../images/magnet-izer.png'),
        href: 'https://magnet-izer.herokuapp.com/',
        title: 'Magnet-izer',
        type: FULLSTACK,
        description: 'View Pinterest-style ‘magnets’ with images and text. Login via password or Twitter to create your own magnets and appraise those of others. Only one ‘like’ or ‘dislike’ per user per magnet possible! Edit a magnet but beware that appraisal data will be reset. Merge local and Twitter-based accounts.',
        tech: 'Node, Express, Sass, jQuery, Bootstrap, EJS, MongoDB, Mongoose, React, Passport, Masonry, Gulp, Browserify, Babelify, Watchify',
        code: 'https://github.com/joops75/magnet-izer'
    }
];
