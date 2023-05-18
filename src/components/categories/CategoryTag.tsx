import * as React from 'react';
// import '../../static/css/categories.css'
import '../../static/css/categories.less'

interface ICategoryTagProps {
    name: string,
    qty: number
}

const CategoryTag: React.FunctionComponent<ICategoryTagProps> = (props) => {
    return <>
        <li>
            <button type='button' className='category-tag-button'>
                <span className='category-tag-name'>{props.name}</span>
                <div className='category-tag-qty'>
                    <span>{props.qty}</span>
                </div>
            </button>
        </li>
    </>;
};

export default CategoryTag;
