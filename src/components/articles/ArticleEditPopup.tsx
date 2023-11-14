import * as React from 'react';
import { TArticlesData } from '../../actions/articles/types';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { useOnPopup } from '../utils/HandleOnPopup';
import { useDispatch } from 'react-redux';
import { articlesCreatePost, articlesUpdatePost } from '../../actions/articles/articles';

interface IArticleEditPopupProps {
    article: TArticlesData,
    onClose: () => void,
    add?: boolean
}

const ArticleEditPopup: React.FunctionComponent<IArticleEditPopupProps> = (props) => {

    const [title, setTitle] = useState(props.article.title)
    const [content, setContent] = useState(props.article.content)

    const dispatch = useDispatch()

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    useOnPopup()

    return <>
        <div className='backdrop' />
        <div className='popup-container' ref={ref}>
            <h2>{props.add ? 'Добавить статью' : 'Редактировать статью'}</h2>
            <div className='article-edit-popup-info'>
                <p>Заголовок:</p>
                <input type='text' placeholder='Заголовок статьи' value={title} onChange={e => setTitle(e.target.value)} required />
                <p>Содержание:</p>
                <textarea placeholder='Содержание статьи' value={content} onChange={e => setContent(e.target.value)} required />
            </div>
            <div className='article-edit-popup-submit'>
                <button
                    className='blue-shadow-button'
                    onClick={() => {
                        if (props.add) {
                            dispatch(articlesCreatePost({ ...props.article, title, content }))
                        } else {
                            dispatch(articlesUpdatePost({ ...props.article, title, content }))
                        }
                        props.onClose()
                    }}
                >
                    {props.add ? 'Добавить статью' : 'Сохранить изменения'}
                </button>
            </div>
            <button className='popup-close-button' onClick={() => props.onClose()}><i className='fas fa-times' /></button>
        </div>
    </>;
};

export default ArticleEditPopup;
