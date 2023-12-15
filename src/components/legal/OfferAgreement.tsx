import * as React from 'react';
import Header from '../global/Header';

interface IOfferAgreementProps {
}

const OfferAgreement: React.FunctionComponent<IOfferAgreementProps> = (props) => {
    return <>
        <Header root />
        <div className='page-main-container'>
            <div className='legal-container'>
                <h1>Договор оферты</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, totam blanditiis porro maxime ad facere veniam aliquid beatae accusantium dolores, sint perferendis! Quaerat ut aliquid nobis corrupti, non harum iure vero atque sit rem, eaque ad voluptates nostrum impedit, cumque repellendus! Accusantium necessitatibus alias iusto animi dolore odit, nesciunt laudantium provident esse tenetur quod ducimus quam corrupti labore? Dolore consectetur ratione molestiae quos reprehenderit quae, numquam asperiores! Ratione eius, magni animi sed ducimus quisquam fugit ad doloremque similique, aliquid officia soluta quod perspiciatis pariatur ab dolorum assumenda fuga eaque explicabo deserunt dolore harum aut? Quaerat expedita saepe illo iure aspernatur.</p>
            </div>
        </div>
    </>;
};

export default OfferAgreement;
