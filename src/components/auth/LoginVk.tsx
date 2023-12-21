import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { extractToken } from '../../actions/auth/auth';
import Loading from '../global/Loading';

interface ILoginVkProps {
}

const LoginVk: React.FunctionComponent<ILoginVkProps> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const url = window.location.href
        console.log(url)
        dispatch(extractToken())
    }, [])

    return <>
        <Loading height={'100vh'} />
    </>;
};

export default LoginVk;
