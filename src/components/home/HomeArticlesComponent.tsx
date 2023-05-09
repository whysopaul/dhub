import * as React from 'react';
import { TArticlesData } from '../../actions/articles/types';
import ArticleCardComponent from '../articles/ArticleCardComponent';

interface IHomeArticlesComponentProps {
    data: TArticlesData[]
}

const HomeArticlesComponent: React.FunctionComponent<IHomeArticlesComponentProps> = (props) => {
    return <>
        <div className='home-section-common-container'>
            <hr />
            <div className='home-section-header'>
                <h2>Статьи и обзоры</h2>
                <div>
                    <button><i className='fas fa-chevron-left' /></button>
                    <button><i className='fas fa-chevron-right' /></button>
                </div>
            </div>
            <div>
                {props.data.map(i => {
                    return <ArticleCardComponent article={i} />
                })}
            </div>
            <hr />
        </div>
    </>;
};

export default HomeArticlesComponent;
