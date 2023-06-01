import * as React from 'react';
import { TArticlesData } from '../../actions/articles/types';
import ArticleCardComponent from '../articles/ArticleCardComponent';
import { useState } from 'react';

interface IHomeArticlesComponentProps {
    data: TArticlesData[]
}

const HomeArticlesComponent: React.FunctionComponent<IHomeArticlesComponentProps> = (props) => {

    const [sliceStart, setSliceStart] = useState(0)
    const [sliceEnd, setSliceEnd] = useState(4)

    const listBack = () => {
        if (sliceStart - 1 < 0) {
            setSliceStart(4)
            setSliceEnd(8)
        } else {
            setSliceStart(sliceStart - 1)
            setSliceEnd(sliceEnd - 1)
        }
    }

    const listForward = () => {
        if (sliceEnd + 1 > 8) {
            setSliceStart(0)
            setSliceEnd(4)
        } else {
            setSliceStart(sliceStart + 1)
            setSliceEnd(sliceEnd + 1)
        }
    }

    return <>
        <div className='home-section-common-container'>
            {/* <hr /> */}
            {/* <div className='home-articles-section'> */}
            <div className='home-section-title'>
                <h2>Статьи и обзоры</h2>
            </div>
            <div className='home-articles-buttons'>
                <button onClick={() => listBack()}><i className='fas fa-chevron-left' /></button>
                <button onClick={() => listForward()}><i className='fas fa-chevron-right' /></button>
            </div>
            <div className='home-articles-cards'>
                {props.data.slice(sliceStart, sliceEnd).map(i => {
                    return <ArticleCardComponent article={i} key={i.id} />
                })}
            </div>
            {/* </div> */}
            {/* <hr /> */}
        </div>
    </>;
};

export default HomeArticlesComponent;
