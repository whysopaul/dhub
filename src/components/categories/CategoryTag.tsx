import * as React from 'react';
import '../../static/css/categories.less'

interface ICategoryTagProps {
    name: string,
    qty: number,
    onClick?: () => void,
    checked?: boolean
}

const CategoryTag: React.FunctionComponent<ICategoryTagProps> = (props) => {
    return <>
        <li>
            <button
                type='button'
                className={props.checked ? 'category-tag-button active' : 'category-tag-button'}
                onClick={() => props.onClick ? props.onClick() : null}
            >
                <span className='category-tag-name'>{props.name}</span>
                <div className='category-tag-qty'>
                    <span>{props.qty}</span>
                </div>
            </button>
        </li>
    </>;
};

export default CategoryTag;
