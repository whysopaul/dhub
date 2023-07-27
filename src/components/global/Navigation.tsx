import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {

    const navigate = useNavigate()

    return <>
        <Link to='/categories'>Категории</Link>
        <Link to='/feedback'>Отзывы</Link>
        <Link to='/articles'>Статьи и обзоры</Link>
        <button
            className='collections-navigation-button'
            onClick={() => navigate('/collections')}
        >
            <span>Подборки</span>
        </button>
    </>;
};

export default Navigation;
