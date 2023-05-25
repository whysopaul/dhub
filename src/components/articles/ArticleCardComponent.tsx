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
                <Link to={'/article/' + props.article.id}><img src={props.article.previewImage} alt="" /></Link>
                <span>{props.article.category}</span>
            </div>
            <h3 className='article-card-title'><Link to={'/article/' + props.article.id}>{props.article.title}</Link></h3>
            <p>{props.article.description}</p>
            <Link to={'/article/' + props.article.id} className='arrow-right-link'>
                <span>Подробнее</span>
                <i className='fas fa-long-arrow-alt-right' />
            </Link>
        </div>
    </>;
};

export default ArticleCardComponent;
