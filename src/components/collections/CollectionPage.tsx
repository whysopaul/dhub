import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCollection } from '../../actions/services/services';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import Loading from '../global/Loading';
import ServiceCardComponent from '../services/ServiceCardComponent';
import '../../static/css/collections.less';

interface ICollectionPageProps {
}

const CollectionPage: React.FunctionComponent<ICollectionPageProps> = (props) => {

    const { collectionId } = useParams()

    const serviceState = useSelector((state: RootStore) => state.services)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollection(parseInt(collectionId)))
    }, [])

    return <>
        {/* <h2>{serviceState.currentCollection?.title}</h2> */}

        {/* TEMP */}

        <h2 className='section-main-title'>{serviceState.collections?.find(c => c.id === parseInt(collectionId))?.title}</h2>

        {serviceState.blocks.length === 0 ? <Loading height={310} /> : <div className='collection-blocks-container'>
            {serviceState.blocks?.filter(b => b.collection === parseInt(collectionId)).map(b => {
                return <>
                    <div className='home-section-common-container' key={b.id}>
                        <div className='home-section-title'>
                            <h2>{b.title}</h2>
                        </div>
                        <div className='home-services-cards'>
                            {serviceState.services.filter(s => b.service_ids.includes(s.id)).map(s => {
                                return <ServiceCardComponent service={s} key={s.id} />
                            })}
                        </div>
                        <div className='home-section-link'>
                            <Link to='#' className='arrow-right-link'>
                                <span>{'Показать все ' + b.title}</span>
                                <i className='fas fa-long-arrow-alt-right' />
                            </Link>
                        </div>
                    </div>
                </>
            })}
        </div>}
    </>;
};

export default CollectionPage;
