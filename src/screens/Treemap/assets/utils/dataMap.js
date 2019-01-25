import videoGameSales from '../data/videoGameSales.json';
import movieSales from '../data/movieSales.json';
import kickstarterPledges from '../data/kickstarterPledges.json';

export const dataMap = {
    videoGameSales: [videoGameSales, 'Video Game Sales', 'Top 100'],
    movieSales: [movieSales, 'Movie Sales', 'Top 95'],
    kickstarterPledges: [kickstarterPledges, 'Kickstarter Pledges', 'Top 100']
}
