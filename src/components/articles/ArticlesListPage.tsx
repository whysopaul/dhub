import * as React from 'react';
import { mockArtData } from '../../actions/articles/articles';
import CategoryTag from '../categories/CategoryTag';
import ArticleCardComponent from './ArticleCardComponent';

interface IArticlesListPageProps {
}

const ArticlesListPage: React.FunctionComponent<IArticlesListPageProps> = (props) => {
    return <>
        <div className='categories-section'>
            <p>Категории статей и обзоров:</p>
            <div>
                <ul className='categories-list'>
                    {mockArtData.map(i => {
                        return <CategoryTag name={i.category} qty={i.id} />
                    })}
                </ul>
            </div>
        </div>
        <div className='section-header-container'>
            <h3 className='section-main-title'>Новости, статьи и обзоры</h3>
            <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue'>
                    <option value="">по умолчанию</option>
                </select>
            </div>
        </div>
        <div className='articles-cards'>
            {mockArtData.map(i => {
                return <ArticleCardComponent article={i} />
            })}
        </div>
    </>;
};

export default ArticlesListPage;
