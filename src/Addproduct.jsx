import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  // 入力フォームの状態を管理
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  // const [num, setNum] = useState()
  // numは状態を持った変数、setNumはそれを更新する関数
  // useState()の()は初期値

  // フォーム送信時に呼ばれる関数
  const handleSubmit = (e) => {
    e.preventDefault();  // デフォルトのフォーム送信を防止
    // eはイベントオブジェクト（イベントが発生した時にブラウザが自動的に生成するオブジェクト）を指す
    // どのフォームで送信が起きたかや、フォームがどのように送信されたか（例えば、ボタンがクリックされたなど）が含まれる
    // preventDefault()はそのイベントに対するデフォルトの動作をキャンセルするために使う
    // 具体的には、フォームが送信されたときのページのリロード（再読み込み）を防ぐために使う


    // 新しい商品データを作成
    const newProduct = {
      name,
      price,
      quantity,
      expiration_date: expirationDate,
    };
    // expiration_date(API側の名前,Lalavel側の変数名)
    // expirationDate(Reactの変数名)
    // Reactはキャメルケース、Laravelはスネークケースで命名される
    // expiration_date: expirationDate と書くことで、状態変数expirationDateの値を、新しいオブジェクトのexpiration_dateというプロパティに割り当てる


    // Laravel APIにPOSTリクエストを送信
    axios.post('http://localhost:8000/api/products', newProduct)
      .then(response => {
        alert('商品が追加されました！');
        // フォーム送信後、状態をリセット
        setName('');
        setPrice('');
        setQuantity('');
        setExpirationDate('');
      })
      .catch(error => {
        console.error('商品追加に失敗しました:', error);
      });
  };
  // axios.post → Larvel APIにPOSTリクエストを送信(サーバにデータを送る非同期操作)
  // .then → 成功した場合
  // response → サーバから返ってきた情報
  // setName('') → フォームの入力値を初期値と同じ空文字にセットしなおしてる
  // .catch → 失敗した場合
  // 最初の error は、catch() に渡されるエラーオブジェクトそのもの
  // console.error() の中の error は、エラーメッセージを表示するために使われる変数（実際のエラーオブジェクト）
  // 結果として表示される内容 は、「商品追加に失敗しました:」というメッセージとそのエラーオブジェクトの中身（例えば、エラーコードやエラーメッセージ）がコンソールに表示される

  return (
    <div className='add-product-form'>
      <h2>新しい商品を追加</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>商品名:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}  // 入力を状態に反映
            required
          />
        </div>
        <div>
          <label>価格:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}  // 入力を状態に反映
            required
          />
        </div>
        <div>
          <label>在庫数:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}  // 入力を状態に反映
            required
          />
        </div>
        <div>
          <label>消費期限:</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}  // 入力を状態に反映
            required
          />
        </div>
        <button type="submit">商品を追加</button>
      </form>
    </div>
  );
};
// onSubmit = {handleSubmit} →フォームが送信されるときにhandleSubmitという関数を呼び出す
// value = {name}やvalue = {price} →value属性を使って、入力フォームに表示される値をReactの状態（state）から取り込み、この状態変数（例：name, price）にユーザーが入力した値が入る
// onChange →ユーザーが入力フィールドに何かを入力したときに発生するイベント
// (e) は イベントオブジェクト
// ユーザーが入力したとき、ボタンをクリックしたとき、フォームが送信されたとき等イベントが発生すると、そのイベントに関する情報が 「イベントオブジェクト（e）」 として関数に渡される
// どの入力フィールドでイベントが発生したか（e.target）
// そのフィールドに入力されている値（e.target.value）
// マウスの位置、クリックされた座標など、クリックイベントに関する詳細な情報（e.clientX, e.clientY など）
// e.target.value で入力された値を取り出し、setName() 関数を使ってその値を React の状態（name）にセット
// handleSubmit 関数 は、フォームが送信されたときに実行され、サーバーにデータを送信したり、入力内容をリセットする

export default AddProduct;
