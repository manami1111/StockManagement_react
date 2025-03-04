import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import DeleteProduct from './DeleteProduct';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ setSelectedProductId }) => {
    const [products, setProducts] = useState([]);  // 商品の状態を保持
    const navigate = useNavigate();
    // const [num, setNum] = useState();
    // 初期値に空の配列[]
    // numは状態を持った変数、setNumはそれを更新する関数


    // コンポーネント(部品)が初めてレンダリングされた時にAPIから商品を取得
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL+'/api/products')  // LaravelのAPIにGETリクエスト
            .then(response => {
                setProducts(response.data);  // APIから取得したデータを状態に保存
            })
            .catch(error => {
                console.error("エラー:", error);
            }); //データを受け取れなかったらエラー
    }, []);  // 空配列なので初回のレンダリング時にだけ実行

    //useEffect(実行する関数,[依存する値]);
    // 第一引数はアロー関数で処理を記述、第二引数は配列で指定
    // 第二引数に[]を指定→コンポーネントを表示した初回のみ処理を実行する 
    // axios.get('http://localhost:8000/api/products')は、GETリクエストをLaravel API（localhost:8000/api/products）に送って、商品データを取得
    // axiosを使ってAPIからデータを取得するとresponseオブジェクトが返される
    // response.data：サーバーから返ってきたデータ。これが通常、APIから取得した実際の情報
    // response.status：HTTPステータスコード。リクエストが成功したかどうか（例: 200は成功）
    // response.headers：レスポンスのヘッダー情報（例えば、サーバー情報など）
    // response.config：リクエストの設定情報（リクエストの方法やURLなど）

    const formatDate = (date) => {
        // 日付が無効な場合
        if (!date || isNaN(new Date(date))) {
            return '未設定';
        }

        // 日付を日本のローカル形式にフォーマット
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ja-JP', options);
    };

    const handleUpdateClick = (productId) => {
        console.log(`Selected Product ID: ${productId}`); 
        navigate(`/update/${productId}`);
        // if (setSelectedProductId) {
        //     setSelectedProductId(productId); // 選択された商品IDを設定
        //     console.log(`Selected Product ID: ${productId}`); // 確認のためにログ出力
        // } else {
        //     console.error('setSelectedProductId is not defined');
        // }
    };


    return (
        <div className="product-list">
            <h1>📦在庫一覧📦</h1>
            <ul>
                {products.map(product => {

                    return (
                        <li key={product.id} className='product-item'>
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">¥{product.price}</p>
                            <p className="product-quantity">在庫: {product.quantity}</p>
                            <p className="product-expiry-date">消費期限: {formatDate(product.expiration_date)}</p>
                            <button className='update-button' onClick={() => handleUpdateClick(product.id)}>更新</button>
                                <DeleteProduct productId={product.id} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// APIから取得して、productsに保存されたデータをmapで一つずつ取り出してproductで表示
// 1つ目のデータ→<li>に入れて表示→２つ目のデータ→<li>に入れて表示…
// key={product.id}は、Reactがリストアイテムを一意に識別するためのもの
// setSelectedProductId を props として受け取り、ユーザーが商品を選択した時にその商品IDを selectedProductId にセット
// 商品名、価格、在庫数に加えて「更新」ボタンと「削除」ボタンを表示し、それぞれのボタンをクリックすると、選択した商品のIDを setSelectedProductId に渡す


export default ProductList;

