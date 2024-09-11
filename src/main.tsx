import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import "./App.css"
import Signup from './Signup.tsx';
import CastList from './CastList.tsx';
import { Links } from './utils.ts';
import AddCast from './AddCast.tsx';
import MediaList from './MediaList.tsx';
import AddMedia from './AddMedia.tsx';
import MediaSearch from './MediaSearch.tsx';
import MediaPage from './MediaPage.tsx';
import NotFound from './NotFound.tsx';
import EmailVerified from './EmailVerified.tsx';
import ForgotPwd from './ForgotPwd.tsx';
import ChangePwd from './ChangePwd.tsx';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path={Links.auth.login} element={<Login/>} />
      <Route path={Links.auth.signup} element={<Signup/>} />
      <Route path={Links.cast.list} element={<CastList/>} />
      <Route path={Links.cast.add} element={<AddCast/>} />
      <Route path={Links.media.list}>
        <Route path='' element={<MediaList/>} />
        <Route path=':id' element={<MediaPage/>} />
      </Route>
      <Route path={Links.media.add} element={<AddMedia/>} />
      <Route path={Links.media.search} element={<MediaSearch/>}/>
      <Route path={Links.auth.verify} element={<EmailVerified/>}/>
      <Route path={Links.auth.forgot} element={<ForgotPwd/>}/>
      <Route path={Links.auth.change} element={<ChangePwd/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);
