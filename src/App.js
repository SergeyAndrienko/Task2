
import './App.css';
import Search from "./Components/search/Search";
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

function App() {
  return (
    <div className="App">
        <MuiThemeProvider>
        <Search/>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
