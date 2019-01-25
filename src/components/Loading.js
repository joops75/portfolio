import React from "react";
import Spinner from '../screens/Spinner/components/Main';

// Must use a function to enable the delay and timing out of loading component.
// Props are passed in from Loadable function in './LoadableOptions'.
export default props => {
    if (props.error) {
        return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.pastDelay) {
        return <Spinner />;
    } else {
        return null;
    }
}
