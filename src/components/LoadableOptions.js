import Loadable from 'react-loadable';
import Loading from './Loading';

export default opts => {
    return Loadable(Object.assign({
        loading: Loading,
        delay: 500, // Display the loading component only after 0.5s. Default is 0.2s. Loading component must be a function to enable.
        timeout: 10000 // After 10s set the Loading component's timedOut prop to true.
    }, opts));
};
