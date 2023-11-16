import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TArticlesData } from '../../actions/articles/types';
import { articlesDeletePost, articlesGetPost } from '../../actions/articles/articles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import ConfirmDeletePopup from '../global/ConfirmDeletePopup';
import ArticleEditPopup from './ArticleEditPopup';
import { Helmet } from 'react-helmet-async';
import { URL } from '../utils';

interface IArticlePageProps {
}

const ArticlePage: React.FunctionComponent<IArticlePageProps> = (props) => {

    const { articleId } = useParams()
    const [currentArticle, setCurrentArticle] = useState<TArticlesData>(null)

    const userState = useSelector((state: RootStore) => state.auth.user)
    const articleState = useSelector((state: RootStore) => state.articles)

    const [showEditArticlePopup, setShowEditArticlePopup] = useState(false)
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(articlesGetPost(parseInt(articleId)))
    }, [])

    useEffect(() => {
        if (articleState.currentArticle?.id === parseInt(articleId)) {
            setCurrentArticle(articleState.currentArticle)
        }
    }, [, articleState.currentArticle])

    const ARTICLE_URL = encodeURIComponent(URL + '/article/' + currentArticle?.id)

    return <>

        {showEditArticlePopup && <ArticleEditPopup article={currentArticle} onClose={() => setShowEditArticlePopup(false)} />}
        {showConfirmDeletePopup && <ConfirmDeletePopup title='Вы уверены, что хотите удалить данную статью?' onConfirm={() => dispatch(articlesDeletePost(currentArticle?.id))} onClose={() => setShowConfirmDeletePopup(false)} />}

        {currentArticle && <>
            <Helmet>
                <title>{currentArticle?.title + ' | digital hub'}</title>
                <meta property='og:title' content={currentArticle?.title + ' | digital hub'} />
                <meta name='description' content={currentArticle?.description} />
                <meta property='og:description' content={currentArticle?.description} />
            </Helmet>

            <div className='article-page-container'>
                <div className='article-page-content'>
                    <span className='article-page-category'>{currentArticle.category}</span>
                    <h1 className='section-main-title'>{currentArticle.title}</h1>
                    {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, similique! Dolorum cum qui ducimus nesciunt sunt perspiciatis modi corrupti minus corporis quos tempora, vitae architecto, sed autem quod perferendis? Obcaecati?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum ratione non pariatur unde odit sint praesentium eum itaque numquam. Nam est culpa voluptas commodi quae suscipit debitis, ut iste quos.</p>
                <img src={currentArticle.previewImage} alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci tempora dolorum error enim impedit consequatur ea vel quidem, iure quam excepturi quos quibusdam temporibus est nostrum voluptas quo aliquid sint?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, molestiae. Animi, aliquid eligendi sed commodi unde expedita ipsam, labore magnam sequi aspernatur ad, maxime aliquam in! Aperiam molestias magnam laudantium!</p> */}
                    <article className='article-page-content-main-container'>
                        {parse(DOMPurify.sanitize(currentArticle.content, { FORBID_ATTR: ['class', 'style', 'id'] }))}
                    </article>
                </div>
                <div className='article-page-side-container'>
                    {userState?.is_admin && <>
                        <button className='article-page-admin-button' id='edit-article' onClick={() => setShowEditArticlePopup(true)}>
                            <i className='fas fa-edit' />
                            <span>Редактировать</span>
                        </button>
                        <button className='article-page-admin-button' id='delete-article' onClick={() => setShowConfirmDeletePopup(true)}>
                            <i className='fas fa-trash' />
                            <span>Удалить</span>
                        </button>
                    </>}
                    <div className='article-page-sharing'>
                        <span>Поделиться этой статьёй</span>
                        <div className='article-page-sharing-buttons'>
                            <a href={'https://vk.com/share.php?url=' + ARTICLE_URL} rel='noopener noreferrer' target='_blank'><i className='fab fa-vk' /></a>
                            <a href={'https://t.me/share/url?url=' + ARTICLE_URL} rel='noopener noreferrer' target='_blank'><i className='fab fa-telegram-plane' /></a>
                            <a href={'whatsapp://send?text=' + ARTICLE_URL} rel='noopener noreferrer' target='_blank'><i className='fab fa-whatsapp' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>;
};

export default ArticlePage;
