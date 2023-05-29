import * as React from 'react';

interface ISortSelectionProps {
}

const SortSelection: React.FunctionComponent<ISortSelectionProps> = (props) => {
    return <>
        <div className='sort-selection'>
            <span>Сортировать:</span>
            <select className='color-blue'>
                <option value="">по умолчанию</option>
            </select>
        </div>
    </>;
};

export default SortSelection;
