import * as React from 'react';
import { Link } from 'react-router-dom';

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
    return <>
        <Link to='/'>Сервисы</Link>
        <Link to='/'>Отзывы</Link>
        <Link to='/'>Статьи и обзоры</Link>
    </>;
};

export default Navigation;
