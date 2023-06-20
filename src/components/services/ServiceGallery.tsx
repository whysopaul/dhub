import * as React from 'react';
import { TServiceScreenshot, TServicesData } from '../../actions/services/types';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleClickOutside';
import { getScreen } from '../utils';

interface IServiceGalleryProps {
    service: TServicesData,
    source: string,
    onClose: () => void
}

const ServiceGallery: React.FunctionComponent<IServiceGalleryProps> = (props) => {

    const [currentImage, setCurrentImage] = useState<number>(0)

    useEffect(() => {
        const currentImageIndex = props.service.images.screenshots.findIndex(i => getScreen(i.link) === props.source)
        setCurrentImage(currentImageIndex)
    }, [])

    const ref = useRef(null)
    useOnClickOutside(ref, () => props.onClose())

    const listBack = (images: TServiceScreenshot[], index: number) => {
        if (index - 1 < 0) {
            return images.length - 1
        }
        return index - 1
    }

    const listForward = (images: TServiceScreenshot[], index: number) => {
        if (index + 1 >= images.length) {
            return 0
        }
        return index + 1
    }

    const screenshots: TServiceScreenshot[] = props.service.images.screenshots

    return <>
        <div className='backdrop'></div>
        <div className='service-gallery-container' ref={ref}>
            <button onClick={() => setCurrentImage(listBack(screenshots, currentImage))}><i className='fas fa-chevron-left' /></button>
            <img src={getScreen(props.service.images?.screenshots[currentImage]?.link)} alt="" />
            <button onClick={() => setCurrentImage(listForward(screenshots, currentImage))}><i className='fas fa-chevron-right' /></button>
        </div>
        <span className='service-gallery-counter'>{currentImage + 1 + ' / ' + screenshots.length}</span>
    </>;
};

export default ServiceGallery;
