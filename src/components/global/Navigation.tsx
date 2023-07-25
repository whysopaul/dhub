import * as React from 'react';
import { Link } from 'react-router-dom';

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
    return <>
        <Link to='/categories'>Категории</Link>
        <Link to='/feedback'>Отзывы</Link>
        <Link to='/articles'>Статьи и обзоры</Link>
        <Link to='/collections'>Подборки</Link>
    </>;
};

export default Navigation;
