import React from 'react';
import ReactDOM from 'react-dom/client';

import Menu from "./components/Menu/index"
import Star from "./components/Star"

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
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
