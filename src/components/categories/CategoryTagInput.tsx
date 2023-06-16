import * as React from 'react';
import '../../static/css/categories.less';
import { TCategory } from '../../actions/categories/types';

interface ICategoryTagInputProps {
    category: TCategory,
    qty: number
}

const CategoryTagInput: React.FunctionComponent<ICategoryTagInputProps> = (props) => {
    return <>
        <li>
            <input type='checkbox' className='category-tag-input' id={'category-' + props.category.id} name='category' value={props.category.id} onChange={() => console.log(props.category)} />
            <label htmlFor={'category-' + props.category.id}>
                {props.category.name}
                <span>
                    {props.qty}
                </span>
            </label>
        </li>
    </>;
};

export default CategoryTagInput;
