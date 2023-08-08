import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStore } from '../../store';

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {

    const collectionState = useSelector((state: RootStore) => state.services.collections)

    return <>
        <Link to='/categories'>Категории</Link>
        <Link to='/feedback'>Отзывы</Link>
        <Link to='/articles'>Статьи и обзоры</Link>
        <div className='collections-navigation-container'>
            <Link to='/collections'>Подборки</Link>
            <div className='collections-navigation-dropdown'>
                <ul className='collections-navigation-dropdown-content'>
                    {collectionState.map(c => {
                        return <li key={c.id}>
                            <Link to={'/collection/' + c.id}>{c.title}</Link>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>;
};

export default Navigation;
