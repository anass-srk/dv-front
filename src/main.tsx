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
    </Routes>
  </BrowserRouter>
);
