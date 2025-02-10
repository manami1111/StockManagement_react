import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NearExpiryList.css";

const NearExpiryList = () => {
    const [expiredProducts, setExpiredProducts] = useState([]);
    const [nearExpiryProducts, setNearExpiryProducts] = useState([]);
    // const [num, setNum] = useState();
    // numは状態を格納、setNumはその状態を更新するための関数
    // expiredProducts(消費期限が過ぎた商品)とnearExpiryProducts(消費期限が近い商品)

    useEffect(() => {
        // 商品データをAPIから取得
        axios.get("http://localhost:8000/api/products")
            .then(response => {
                const currentDate = new Date(); // 現在の日付と時刻
                const thirtyDaysLater = new Date(currentDate);
                thirtyDaysLater.setDate(currentDate.getDate() + 30); // 現在から30日後の日付
                // currentDate を基に、新しい Date オブジェクト（thirtyDaysLater）を作成。これにより、現在の日付がそのまま thirtyDaysLater にコピーされる
                // Date オブジェクトは ミュータブル（変更可能） なため、currentDate を直接変更したくないから、コピーを作って30日後の日付を計算する
                // currentDate を基に30日後の日付を計算したいとき、setDate などのメソッドを使って currentDate をそのまま変更してしまうと、元の日付（現在の日付）も変わってしまう
                // setDate() は、Date オブジェクトの「日」を設定するメソッド
                // currentDate.getDate() は、現在の日付部分


                // 商品データを分ける
                const expired = []; // 消費期限が過ぎた商品を保存するための空の配列
                const nearExpiry = []; // 消費期限が近い商品（30日以内）を保存するための空の配列


                response.data.forEach(product => {
                    const expiryDate = new Date(product.expiration_date);

                    if (expiryDate < currentDate) { // (消費期限 < 現在の日付) →消費期限が過ぎた商品
                        expired.push(product); // その商品をexpired配列に追加
                    } else if (expiryDate <= thirtyDaysLater) {  // (消費期限 < 30日後の日付) →消費期限から30日以内の商品
                        nearExpiry.push(product); // その商品をnearExpiry配列に追加
                    }
                });

                setExpiredProducts(expired); // setExpiredProductsでexpiredProductsの状態を更新(expired配列=消費期限が過ぎた商品の配列)
                setNearExpiryProducts(nearExpiry); // setNearExpiredProductsでnearExpiredProductsの状態を更新(nearExpired配列=消費期限が近い商品の配列)
            })
            .catch(error => {
                console.error("エラー", error);
            });
    }, []);
    // forEach() メソッドは、そのリスト内の各商品に対して繰り返し処理を行う
    // 具体的には、product という変数に1つずつ商品が入って、その商品の消費期限をチェック
    // product.expiration_date は、商品ごとに設定された消費期限の日付
    // このデータは通常、文字列（例えば "2024-12-25"）として渡されるので、それをnew Date()を使って Date オブジェクトに変換

    return (
        <div className="near-expiry-list">
            <h2>🚨消費期限が過ぎた商品</h2>
            <table>
                <thead>
                    <tr>
                        <th>商品名</th>
                        <th>消費期限</th>
                    </tr>
                </thead>
                <tbody>
                    {expiredProducts.length > 0 ? ( // もしexpiredProducts配列(消費期限が過ぎた商品)が1件以上あれば、map()を使って各商品をテーブルの行(<tr>)として表示
                        expiredProducts.map((product) => (
                            <tr key={product.id}> 
                                <td>{product.name}</td>
                                <td>{new Date(product.expiration_date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">消費期限が過ぎた商品はありません</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            {/* 条件式（expiredProducts.length > 0）がtrueならば「?の後」の部分が実行され、falseならば「:の後」の部分が実行される */}
            {/* **expiredProducts**は消費期限が過ぎた商品のリスト（配列）
                **map()**はその配列を1つずつ取り出して処理を行うためのメソッド
                map()は、配列の各要素を新しい配列に変換することができる
                productは、expiredProducts配列の中の1つの商品を指します。つまり、map()が繰り返し処理を行い、productには1つずつ商品のデータが格納される */}
            {/* key属性はUIには表示されない */}
            {/* new Date(product.expiration_date): product.expiration_dateは商品ごとの消費期限を表す文字列（例: "2024-12-31"）
                これをnew Date()でDateオブジェクトに変換。Dateオブジェクトに変換することで、JavaScriptの標準日付操作ができるようになる
                .toLocaleDateString(): Dateオブジェクトをローカルの日付形式に変換します。例えば、"2024-12-31"が日本の日付形式（"2024年12月31日"）に変換されます。 */}


            <h2>🔔消費期限が近い商品（30日以内）</h2>
            <table>
                <thead>
                    <tr>
                        <th>商品名</th>
                        <th>消費期限</th>
                    </tr>
                </thead>
                <tbody>
                    {nearExpiryProducts.length > 0 ? (
                        nearExpiryProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{new Date(product.expiration_date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">消費期限が近い商品はありません</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
// 

export default NearExpiryList;
