import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Screenshot from '../../../screenshot.png';
import { URL } from '../utils';

interface IHeadProps {
}

const Head: React.FunctionComponent<IHeadProps> = (props) => {

    const { pathname } = useLocation()

    return <>
        <Helmet>
            <title>digital hub — Агрегатор сервисов для вашей продуктивности</title>
            <meta property='og:title' content='digital hub — Агрегатор сервисов для вашей продуктивности' />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={URL + pathname} />
            <meta name='description' content='Агрегатор сервисов для вашей продуктивности. Рейтинги, обзоры, отзывы, минусы и плюсы сервисов для бизнеса в одном месте. Сравнивайте и внедряйте. И конечно, используйте промокоды на скидку.' />
            <meta property='og:description' content='Агрегатор сервисов для вашей продуктивности. Рейтинги, обзоры, отзывы, минусы и плюсы сервисов для бизнеса в одном месте. Сравнивайте и внедряйте. И конечно, используйте промокоды на скидку.' />
            <meta property='og:image' content={Screenshot} />
            <link rel='canonical' href={URL + pathname} />
        </Helmet>
    </>;
};

export default Head;
