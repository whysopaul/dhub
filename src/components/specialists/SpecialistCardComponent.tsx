import * as React from 'react';
import { TSpecialist } from '../../actions/specialists/types';
import '../../static/css/specialists.css';

interface ISpecialistCardComponentProps {
    specialist: TSpecialist
}

const SpecialistCardComponent: React.FunctionComponent<ISpecialistCardComponentProps> = (props) => {
    return <>
        <div className='specialist-card-container'>
            <div className='specialist-card-photo'>
                <img src={props.specialist.profile.photo} alt="" />
            </div>
            <div className='specialist-card-info'>
                <p>{props.specialist.profile.name}</p>
                <span>{props.specialist.profile.about}</span>
            </div>
            <button className='arrow-right-button color-blue'>
                <span>Выбрать специалиста</span>
                <i className='fas fa-long-arrow-alt-right' />
            </button>
        </div>
    </>;
};

export default SpecialistCardComponent;
