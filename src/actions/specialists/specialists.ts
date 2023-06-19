import { TSpecialist } from "./types";
import MockSpecialistProfilePhoto from '../../static/images/feedback_user_mock_photo.webp';

export const mockSpecialists: TSpecialist[] = new Array(3).fill({}).map((_, idx) => { return { id: idx + 1, profile: { name: 'Олег', photo: MockSpecialistProfilePhoto, about: 'Директор по клиентским коммуникациям Туту, соучредитель PR-агентства Loft, автор лучшей деловой книги 2016 "Бизнес как игра", сумасброд.' } } })