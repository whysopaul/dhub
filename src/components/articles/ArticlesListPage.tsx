import * as React from 'react';
import { articlesGetPosts, mockArtData } from '../../actions/articles/articles';
import CategoryTag from '../categories/CategoryTag';
import ArticleCardComponent from './ArticleCardComponent';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ArticleEditPopup from './ArticleEditPopup';

interface IArticlesListPageProps {
}

const ArticlesListPage: React.FunctionComponent<IArticlesListPageProps> = (props) => {

    const userState = useSelector((state: RootStore) => state.auth.user)
    const articleState = useSelector((state: RootStore) => state.articles.articles)

    const [showAddArticlePopup, setShowAddArticlePopup] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(articlesGetPosts())
    }, [])

    return <>

        {showAddArticlePopup && <ArticleEditPopup article={{ id: -1, title: '', content: '' }} onClose={() => setShowAddArticlePopup(false)} add />}

        <div className='categories-section articles-list-page'>
            <p>Категории статей и обзоров:</p>
            <div>
                <ul className='categories-list'>
                    {mockArtData.map(i => {
                        return <CategoryTag name={i.category} qty={i.id} key={i.id} />
                    })}
                </ul>
            </div>
        </div>
        <div className='section-header-container articles-list-page'>
            <h3 className='section-main-title'>Новости, статьи и обзоры</h3>
            {userState?.is_admin && <button className='articles-add-article-button' onClick={() => setShowAddArticlePopup(true)}>
                <i className='fas fa-plus' />
                <span>Добавить статью</span>
            </button>}
            <div className='sort-selection'>
                <span>Сортировать:</span>
                <select className='color-blue'>
                    <option value="">по умолчанию</option>
                </select>
            </div>
        </div>
        <div className='articles-cards'>
            {articleState.map(i => {
                return <ArticleCardComponent article={i} key={i.id} />
            })}
        </div>
    </>;
};

export default ArticlesListPage;
