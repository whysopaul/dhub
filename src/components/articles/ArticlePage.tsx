import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TArticlesData } from '../../actions/articles/types';
import { mockArtData } from '../../actions/articles/articles';

interface IArticlePageProps {
}

const ArticlePage: React.FunctionComponent<IArticlePageProps> = (props) => {

    const { articleId } = useParams()
    const [currentArticle, setCurrentArticle] = useState<TArticlesData>(mockArtData.find(article => article.id === parseInt(articleId)))

    return <>
        <div className='article-page-container'>
            <div className='article-page-content'>
                <span className='article-page-category'>{currentArticle.category}</span>
                <h2 className='section-main-title'>{currentArticle.title}</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, similique! Dolorum cum qui ducimus nesciunt sunt perspiciatis modi corrupti minus corporis quos tempora, vitae architecto, sed autem quod perferendis? Obcaecati?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum ratione non pariatur unde odit sint praesentium eum itaque numquam. Nam est culpa voluptas commodi quae suscipit debitis, ut iste quos.</p>
                <img src={currentArticle.previewImage} alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci tempora dolorum error enim impedit consequatur ea vel quidem, iure quam excepturi quos quibusdam temporibus est nostrum voluptas quo aliquid sint?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, molestiae. Animi, aliquid eligendi sed commodi unde expedita ipsam, labore magnam sequi aspernatur ad, maxime aliquam in! Aperiam molestias magnam laudantium!</p>
            </div>
            <div>
                <div className='article-page-sharing'>
                    <span>Поделиться этой статьёй</span>
                    <div className='article-page-sharing-buttons'>
                        <button><i className='fab fa-vk' /></button>
                        <button><i className='fab fa-telegram-plane' /></button>
                        <button><i className='fab fa-whatsapp' /></button>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default ArticlePage;
