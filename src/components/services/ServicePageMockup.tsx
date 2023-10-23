import * as React from 'react';

interface IServicePageMockupProps {
}

const ServicePageMockup: React.FunctionComponent<IServicePageMockupProps> = (props) => {
    return <>
        <div className='service-main-container'>
            <div>
                <div className='service-page-mockup-header'>
                    <div className='service-page-mockup-header-title' />
                    {/* <div>
                    <div />
                    <div />
                    <div />
                </div> */}
                </div>
                <hr />
                <div className='service-page-mockup-description' />
                <hr />
                <div className='service-page-mockup-details'>
                    {new Array(7).fill('').map((_, idx) => {
                        return <React.Fragment key={idx}>
                            <div />
                            <div />
                        </React.Fragment>
                    })}
                </div>
            </div>
            <div className='service-page-mockup-images'>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    </>;
};

export default ServicePageMockup;
