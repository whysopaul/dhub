import * as React from 'react';
import { TArticlesData } from '../../actions/articles/types';
import { Link } from 'react-router-dom';
import '../../static/css/articles.css';

interface IArticleCardComponentProps {
    article: TArticlesData
}

const ArticleCardComponent: React.FunctionComponent<IArticleCardComponentProps> = (props) => {
    return <>
        <div className='article-card-container'>
            <div className='article-card-image'>
                <img src={props.article.previewImage} alt="" />
                <span>{props.article.category}</span>
            </div>
            <h3>{props.article.title}</h3>
            <p>{props.article.description}</p>
            <Link to='/' className='arrow-right-link'>
                <span>Подробнее</span>
                <i className='fas fa-long-arrow-alt-right' />
            </Link>
        </div>
    </>;
};

export default ArticleCardComponent;
