// App.jsx: 実際のアプリケーションの内容（UIやロジック）を定義するコンポーネント

import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// ↓コンポーネント
import ProductList from './ProductList';
import AddProduct from './Addproduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import NearExpiryList from './NearExpiryList';
import ExportButtons from './ExportButtons';


const App = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  // const [name, setName] = useState('');
  // // selectProductId →今選択している商品のIDをuseStateで状態を保存している
  // // 初期値はnull

  return (
    <Router>
      <div className="app-container">
        <header className='app-header'>
          {/* ヘッダーとメニュー */}
          <h1 className='app-title'>🗂️ツール管理アプリ</h1>
          <nav>
            <ul>
              <li><Link to="/">在庫一覧</Link></li>
              <li><Link to="/add">商品追加</Link></li>
              <li><Link to="/expiry">消費期限が近い商品</Link></li>
            </ul>
          </nav>
        </header>

        {/* ページの内容 */}
        <Routes>
          <Route path="/" element={<ProductList setSelectedProductId={setSelectedProductId} />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/expiry" element={<NearExpiryList />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/delete/:id" element={<DeleteProduct />} />
        </Routes>
        <br />
        <ExportButtons />

      </div>
    </Router>
  );
};

const UpdateProductWrapper = () => {
  const { id } = useParams();
  return <UpdateProduct productId={id} />;
};

// DeleteProduct コンポーネントのラッパー
const DeleteProductWrapper = () => {
  const { id } = useParams();
  return <DeleteProduct productId={id} />;
};

// {/* 商品一覧 */ }
// <ProductList setSelectedProductId={setSelectedProductId} />
// {/* ProductListコンポーネントにsetSelectProductIdを渡して、商品を選んだ時に商品IDをAppに渡す */ }
// {/* <子コンポーネントの呼び出し 渡したい値 />
//           <Title title="〇○○" /> 親コンポーネントApp.js
//           <Text{this.props.title}</Text>子コンポーネントTitle.js
//           親コンポーネントから渡された値がpropsに入る*/}

// <br />

// {/* 商品更新フォーム */ }
// { selectedProductId && <UpdateProduct productId={selectedProductId} setName={setName} /> }
// {/* $$→両方true
//           selectedProductIdがnull(初期値)ならfalseになる 
//           →nullの場合は<UpdateProduct />は表示されない*/}

// {/* 商品削除ボタン */ }
// { selectedProductId && name && <DeleteProduct productId={selectedProductId} /> }
// {/* $$→両方true
//           selectedProductIdがnull(初期値)ならfalseになる 
//           →nullの場合は<DeletedateProduct />は表示されない*/}



export default App
