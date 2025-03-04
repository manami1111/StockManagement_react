
import React from 'react';
import axios from 'axios';
import './DeleteProduct.css';

const DeleteProduct = ({ productId }) => {


  const handleDelete = () => {
    // 確認ダイアログの表示
    const isConfirmed = window.confirm("削除しますか？");

    // OKの場合
    if (isConfirmed) {
      axios.delete(
       import.meta.env.VITE_API_URL+`/api/products/${productId}`)
        .then(response => {
          alert('商品が削除されました！');
        })
        .catch(error => {
          console.error('商品削除に失敗しました:', error);
        });
    } else {
      console.log("削除がキャンセルされました");
    }
  };
  // {productId}はprops
  // axios.deleteでLaravel APIにDELETEリクエストを送信
  // ${productId}で商品情報を指定

  return (
    <button className="delete-button" onClick={handleDelete}>削除</button>
  );
  // onClick →ボタンをクリックしたらhandleDelete関数を呼び出す
};

export default DeleteProduct;
