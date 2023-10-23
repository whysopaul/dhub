import * as React from 'react';

interface IServiceCardMockupProps {
    qty: number
}

const ServiceCardMockup: React.FunctionComponent<IServiceCardMockupProps> = (props) => {

    const MockupCard = () => {
        return <>
            <div className='service-card-mockup-container'>
                <div className='service-card-mockup-header'>
                    <div className='service-card-mockup-logo' />
                    <div className='service-card-mockup-rating' />
                </div>
                <div>
                    <div className='service-card-mockup-name' />
                    <div className='service-card-mockup-description'>
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </div>
        </>;
    }
    return <>
        {new Array(props.qty).fill('').map((_, idx) => {
            return <MockupCard key={idx} />
        })}
    </>;
};

export default ServiceCardMockup;
