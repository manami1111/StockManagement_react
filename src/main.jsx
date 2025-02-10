// main.jsx: アプリケーション全体を描画するためのエントリーポイント。ReactDOMにアプリを表示する役割

import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18の書き方
import App from './App';  // Appコンポーネントをインポート

// アプリケーションをroot要素にレンダリング
const root = ReactDOM.createRoot(document.getElementById('root'));
// getElementById('root')で、Reactアプリケーションを表示する場所（HTMLの中の要素）を取得

root.render(<App />);

