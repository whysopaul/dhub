import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';

interface ILoadingProps {
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {

    const serviceState = useSelector((state: RootStore) => state.services)

    return <>
        {serviceState.is_loading && <>
            <div className='backdrop-no-blur'></div>
            <div className='loader'></div>
        </>}
    </>;
};

export default Loading;
