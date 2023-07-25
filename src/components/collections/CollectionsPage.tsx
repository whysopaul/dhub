import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';

interface ICollectionsPageProps {
}

const CollectionsPage: React.FunctionComponent<ICollectionsPageProps> = (props) => {

    const serviceState = useSelector((state: RootStore) => state.services)

    return <>
        <div>
            <h2 className='section-main-title'>Подборки</h2>
        </div>
        <div>
            {serviceState.collections.map(c => {
                return <p>{c.title}</p>
            })}
        </div>
    </>;
};

export default CollectionsPage;
