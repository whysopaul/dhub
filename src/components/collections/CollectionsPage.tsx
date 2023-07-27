import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { Link } from 'react-router-dom';

interface ICollectionsPageProps {
}

const CollectionsPage: React.FunctionComponent<ICollectionsPageProps> = (props) => {

    const serviceState = useSelector((state: RootStore) => state.services)

    return <>
        <div>
            <h2 className='section-main-title'>Подборки</h2>
        </div>
        <div className='collections-list-container'>
            {serviceState.collections.map(c => {
                return <Link to={'/collection/' + c.id} className='collections-list-link' key={c.id}>{c.title}</Link>
            })}
        </div>
    </>;
};

export default CollectionsPage;
