// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UpdateProduct.css';

// const UpdateProduct = ({ productId, setName }) => {
//   const [name, setNameLocal] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [expirationDate, setExpirationDate] = useState('');
//   // const [num, setNum] = useState()
//   // numは状態を持った変数、setNumはそれを更新する関数、()は初期値
//   // {productId}はprops

//   // コンポーネントが初めて表示された時に、指定された商品IDの商品情報をAPIから取得
//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/products/${productId}`)
//       .then(response => {
//         const product = response.data;
//         setNameLocal(product.name);
//         setPrice(product.price);
//         setQuantity(product.quantity);
//         setExpirationDate(product.expiration_date);
//       })
//       .catch(error => {
//         console.error('商品情報の取得に失敗しました:', error);
//       });
//   }, [productId, setName]);

//   // axios.get →Laravel APIにGETリクエスト
//   // ${productId}で商品情報を取得
//   // .then →成功したとき
//   // const product = response.data →返ってきたデータをproductという名前で取り出す
//   // setName(product.name) →取り出したデータをreactにセット
//   // .catch →失敗したとき
//   // useEffect(実行する関数,[依存する値])
//   // 実行する関数はアロー関数で記述、依存する値は必ず配列で指定
//   // []を設定すると初回のみ実行
//   // 今回は[productId]なのでproductIdが変更されるたび処理される

//   // フォーム送信時の処理
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     // eはイベントオブジェクト（イベントが発生した時にブラウザが自動的に生成するオブジェクト）を指す
//     // どのフォームで送信が起きたかや、フォームがどのように送信されたか（例えば、ボタンがクリックされたなど）が含まれる
//     // preventDefault()はそのイベントに対するデフォルトの動作をキャンセルするために使う
//     // 具体的には、フォームが送信されたときのページのリロード（再読み込み）を防ぐために使う

//     const updatedProduct = {
//       name,
//       price,
//       quantity,
//       expiration_date: expirationDate,
//     };
//     // フォームに入力された内容
//     // expiration_date(API側の名前,Lalavel側の変数名)
//     // expirationDate(Reactの変数名)
//     // Reactはキャメルケース、Laravelはスネークケースで命名される
//     // expiration_date: expirationDate と書くことで、状態変数expirationDateの値を、新しいオブジェクトのexpiration_dateというプロパティに割り当てる

//     // 更新した商品情報をAPIに送信
//     axios.put(`http://localhost:8000/api/products/${productId}`, updatedProduct)
//       .then(response => {
//         alert('商品が更新されました！');
//       })
//       .catch(error => {
//         console.error('商品更新に失敗しました:', error);
//       });
//     // 第一引数: 更新したい商品情報のURL (http://localhost:8000/api/products/${productId})
//     // ${productId} は、親コンポーネントから渡された商品ID
//     // 第二引数: 更新する商品情報を含むオブジェクト (updatedProduct)
//   };


//   return (
//     <div className='update-product-form'>
//       <h2>🛍️商品情報を更新</h2>
//       <form onSubmit={handleUpdate}>
//         <div>
//           <label>商品名:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setNameLocal(e.target.value)}
//             required
//             placeholder='商品名を更新'
//           />
//         </div>
//         <div>
//           <label>価格:</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             placeholder='価格を更新'
//           />
//         </div>
//         <div>
//           <label>在庫数:</label>
//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//             placeholder='在庫数を更新'
//           />
//         </div>
//         <div>
//           <label>消費期限:</label>
//           <input
//             type="date"
//             value={expirationDate}
//             onChange={(e) => setExpirationDate(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">商品を更新</button>
//       </form>
//     </div>
//   );
// };
// // onSubmit = {handleSubmit} →フォームが送信されるときにhandleSubmitという関数を呼び出す
// // value = {name}やvalue = {price} →value属性を使って、入力フォームに表示される値をReactの状態（state）から取り込み、この状態変数（例：name, price）にユーザーが入力した値が入る
// // onChange →ユーザーが入力フィールドに何かを入力したときに発生するイベント
// // (e) は イベントオブジェクト
// // ユーザーが入力したとき、ボタンをクリックしたとき、フォームが送信されたとき等イベントが発生すると、そのイベントに関する情報が 「イベントオブジェクト（e）」 として関数に渡される
// // どの入力フィールドでイベントが発生したか（e.target）
// // そのフィールドに入力されている値（e.target.value）
// // マウスの位置、クリックされた座標など、クリックイベントに関する詳細な情報（e.clientX, e.clientY など）
// // e.target.value で入力された値を取り出し、setName() 関数を使ってその値を React の状態（name）にセット
// // ↓実際の動き方↓
// // ユーザーがフォームに入力（商品名、価格、在庫数、消費期限）
// // ユーザーが「商品を更新」ボタンをクリックすると、handleUpdate 関数が呼び出される
// // フォームの入力内容が updatedProduct というオブジェクトにまとめられる
// // axios.put() を使って、サーバーに PUT リクエストが送られます。リクエストのURLには、商品IDが含まれているので、サーバーはその商品IDに対応する商品の情報を更新
// // サーバーが正常に応答すると、「商品が更新されました！」というアラートが表示され、商品情報が更新される




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './UpdateProduct.css';

const UpdateProduct = () => {
  const { id: productId } = useParams(); // URLパラメータから productId を取得

  const [name, setNameLocal] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    // // CSRFトークンを取得してaxiosのデフォルトヘッダーに設定
    // const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    console.log('Fetching product data for ID:', productId); // デバッグ用ログ
    axios.get(`http://localhost:8000/api/products/${productId}`)
      .then(response => {
        const product = response.data;
        console.log('Product data fetched:', product); // デバッグ用ログ
        setNameLocal(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setExpirationDate(product.expiration_date);
      })
      .catch(error => {
        console.error('商品情報の取得に失敗しました:', error);
      });
  }, [productId]);

  const handleUpdate = (e) => {
    console.log('handleUpdate が呼ばれました'); // デバッグログ

    e.preventDefault();
    console.log('Update button clicked'); // デバッグ用ログ

    const updatedProduct = {
      name,
      price,
      quantity,
      expiration_date: expirationDate,
    };

    console.log('Sending update request:', updatedProduct); // デバッグ用ログ


    axios.put(`http://localhost:8000/api/products/${productId}`, updatedProduct)
      .then(response => {
        alert('商品が更新されました！');
      })
      .catch(error => {
        console.error('商品更新に失敗しました:', error);
      });
  };

  return (
    <div className='update-product-form'>
      <h2>🛍️商品情報を更新</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUpdate(e);
      }}>
        <div>
          <label>商品名:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setNameLocal(e.target.value)}
            required
            placeholder='商品名を更新'
          />
        </div>
        <div>
          <label>価格:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder='価格を更新'
          />
        </div>
        <div>
          <label>在庫数:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            placeholder='在庫数を更新'
          />
        </div>
        <div>
          <label>消費期限:</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">商品を更新</button>
      </form>
    </div>
  );
};

export default UpdateProduct;


