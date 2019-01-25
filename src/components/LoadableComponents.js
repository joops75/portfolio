import LoadableOptions from './LoadableOptions';

export const Home = LoadableOptions({ loader: () => import('../screens/Home/components/Main') });

export const NoughtsAndCrosses = LoadableOptions({ loader: () => import('../screens/NoughtsAndCrosses/components/Main') });

export const SimonGame = LoadableOptions({ loader: () => import('../screens/SimonGame/components/Main') });

export const DrumMachine = LoadableOptions({ loader: () => import('../screens/DrumMachine/Main') });

export const DungeonCrawler = LoadableOptions({ loader: () => import('../screens/DungeonCrawler/components/Main') });

export const ChoroplethMap = LoadableOptions({ loader: () => import('../screens/ChoroplethMap/components/Main') });

export const ForceDirectedGraph = LoadableOptions({ loader: () => import('../screens/ForceDirectedGraph/components/Main') });

export const Treemap = LoadableOptions({ loader: () => import('../screens/Treemap/components/Main') });
