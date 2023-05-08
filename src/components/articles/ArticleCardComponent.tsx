import * as React from 'react';
import { TArticlesData } from '../../actions/articles/types';
import { Link } from 'react-router-dom';

interface IArticleCardComponentProps {
    article: TArticlesData
}

const ArticleCardComponent: React.FunctionComponent<IArticleCardComponentProps> = (props) => {
    return <>
        <div>
            <div>
                <img src={props.article.previewImage} alt="" width='402px' height='250px' />
                <span>{props.article.category}</span>
            </div>
            <h3>{props.article.title}</h3>
            <p>{props.article.description}</p>
            <Link to='/'>
                <span>Подробнее</span>
                <i className='fas fa-long-arrow-alt-right' />
            </Link>
        </div>
    </>;
};

export default ArticleCardComponent;
