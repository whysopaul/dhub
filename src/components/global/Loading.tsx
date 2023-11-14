import * as React from 'react';

interface ILoadingProps {
    height: string | number
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
    return <>
        <div className='loader-container' style={{ height: props.height }}>
            <div className='loader'></div>
        </div>
    </>;
};

export default Loading;
