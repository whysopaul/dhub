import * as React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import App2 from './components/App2';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return <>
        <h1>Hehe</h1>
        {/* <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/2' element={<App2 />} />
            </Routes>
        </BrowserRouter> */}
    </>;
};

export default App;
