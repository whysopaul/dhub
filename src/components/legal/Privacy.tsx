import * as React from 'react';
import Header from '../global/Header';

interface IPrivacyProps {
}

const Privacy: React.FunctionComponent<IPrivacyProps> = (props) => {
    return <>
        <Header root />
        <div className='page-main-container'>
            <div className='legal-container'>
                <h1>Политика конфиденциальности</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore non fuga nulla id, neque nihil distinctio magni. Vero numquam enim ullam beatae. Autem mollitia dicta ullam rerum omnis accusantium tempore, ut nisi sed, fugit culpa. Quo quae delectus ut rem a sint earum asperiores, explicabo quod repellendus numquam debitis corrupti natus reiciendis accusantium voluptas aperiam, incidunt tenetur repellat. At ipsa reprehenderit culpa! Soluta debitis ut rerum! Numquam provident natus ut quis eaque sed dolorum accusantium consectetur, cum consequuntur, soluta id magni reiciendis qui quibusdam similique reprehenderit, facere unde optio fuga nihil! Nihil vero harum, repellat quod necessitatibus cum repellendus aliquid.</p>
            </div>
        </div>
    </>;
};

export default Privacy;
