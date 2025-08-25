import React from 'react';
import ReactDOM from 'react-dom/client';

import Menu from "./components/Menu/index"
import Badge from "./components/Badge"

import './style.css'

function App() {
  return (
    <div className="page-container">
      <h1>Component Library</h1>
      <p>This is a React component library and is a project for the Frontend Path from <a href="https://scrimba.com/">Scrimba</a>.</p>
      

      <h2>Menu</h2>
      <Menu>
        <Menu.Button>Sports</Menu.Button>
        <Menu.Dropdown>
          <Menu.Item>Swimming</Menu.Item>
          <Menu.Item>Soccer</Menu.Item>
          <Menu.Item>Baseball</Menu.Item>
          <Menu.Item>Football</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      
      <h2>Badge</h2>
      <h3>Square</h3>
      <div className="badges-row">
        <Badge color="grey">Badge</Badge>
        <Badge color="red">Badge</Badge>
        <Badge color="yellow">Badge</Badge>
        <Badge color="green">Badge</Badge>
        <Badge color="blue">Badge</Badge>
        <Badge color="indigo">Badge</Badge>
        <Badge color="purple">Badge</Badge>
        <Badge color="pink">Badge</Badge>
      </div>
      <h3>Pill</h3>
      <div className="badges-row">
        <Badge color="grey" type="pill">Badge</Badge>
        <Badge color="red" type="pill">Badge</Badge>
        <Badge color="yellow" type="pill">Badge</Badge>
        <Badge color="green" type="pill">Badge</Badge>
        <Badge color="blue" type="pill">Badge</Badge>
        <Badge color="indigo" type="pill">Badge</Badge>
        <Badge color="purple" type="pill">Badge</Badge>
        <Badge color="pink" type="pill">Badge</Badge>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
