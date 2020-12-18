import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import Routes from "./Routes";

const App = () => {
    const {user} = useSelector(state => state.users);
  return (
    <Routes user={user} />
  );
}

export default App;
