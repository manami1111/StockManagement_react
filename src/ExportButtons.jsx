import React from "react";
import axios from "axios";
// React:ボタンを作成
// Axios:サーバーにリクエストを送る
// Blob:ダウンロードファイルのデータ形式

function ExportButtons() { //Reactのコンポーネント。この中でボタンを作り、クリックしたときの動作を定義する
  // Excelエクスポート処理
  const handleExportExcel = async () => { //async:非同期処理。サーバーから応答を待つ
    try {
      // tryブロック内に記述されたコードは、エラーが発生する可能性のあるコード。もしその中でエラーが発生した場合、catchブロックが実行
      const response = await axios.get(import.meta.env.VITE_API_URL+"/api/products/export", { //axios.get:データをAPIから取得
        responseType: "blob", //普通のテキストデータとは違って、画像や動画は「バイナリ形式」で送られてくるので、この設定を使うことで正しく扱える
      });

      // ステータスコードが200でない場合、エラーを表示
      if (response.status !== 200) { // 200:成功 404:サーバーが見つからない 500:サーバー内部エラーなど
        console.error(`Error: ${response.status}`);
        alert(`エクスポートに失敗しました。ステータスコード: ${response.status}`);
        return;
      }

      // Blobデータがエクスポートされるべき形式か確認
      if (response.data instanceof Blob) { // instanceof:「response.dataがBlobであるか」を確認するためのJavaScriptの構文
        // MIMEタイプを確認してExcelファイルかどうか確認
        const contentType = response.headers["content-type"];
        // response.headers: サーバーから送られてきたデータに付随する「情報」
        // ヘッダーには、データの種類やサーバーの応答状態などの詳細が含まれる

        // content-type
        // ヘッダーの中の一つで、「データの種類」を示す
        // Excelファイル: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // CSVファイル: text/csv
        // HTML（エラーページなど）: text/html
        if (contentType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          const link = document.createElement("a"); //HTMLの<a>タグ（リンク）を新しく作成。このリンクを使ってファイルをダウンロード
          link.href = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
          // window.URL.createObjectURL:サーバーから受け取ったBlob形式のデータを、ブラウザが認識できる一時的なURLに変換
          // new Blob([...]):ファイルデータを「Blob形式」に変換
          // response.data:サーバーから送られてきたファイルのデータ
          // type: contentType:ファイルの種類（MIMEタイプ）を指定
          link.download = "products.xlsx"; //link.download:この属性にファイル名を指定すると、ダウンロード時にその名前で保存される
          link.click();
          // link.click():JavaScriptを使って、プログラムから「このリンクをクリックした」という動作を行います。
          // なぜ自動でクリックする？
          // 作成したリンクをユーザーが手動でクリックする必要がないようにするため。この方法でユーザーはボタンを押すだけでファイルをダウンロードできる。
        } else {
          // 予期しないレスポンス（HTMLエラーページなど）の場合
          response.data.text().then(text => { 
            //response.data.text():サーバーから送られてきたデータ（response.data）をテキスト形式に変換
            // then:非同期処理が成功した場合に、その結果を利用して次の処理を行う
            // この場合、テキストに変換されたデータがtextという引数に渡される
            console.log('HTMLエラーページだよ:', text);  // エラーページの内容を表示
            alert("エクスポートに失敗しました。エラーメッセージを確認してください。");
          });
        }
      }
    } catch (error) {
      if (error.response) {
        // サーバーから返されたエラーレスポンス
        console.log("Export failed with status:", error.response.status); // status→HTTPステータスコード(200:成功,404:見つからない,500:サーバーエラー)
        console.log("Error details:", error.response.data); // data→サーバーから返された「レスポンスデータ」そのもの(エラーメッセージやエラー詳細が含まれる)
      } else {
        // リクエスト自体が失敗した場合
        console.error("Excel export failed", error.message); //JavaScriptのエラーオブジェクトが持つエラーメッセージ（通常はネットワークエラーやサーバーへの接続失敗時に表示される）
      }
    }
  };

  // CSVエクスポート処理
  const handleExportCsv = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL+'/api/products/export-csv', {
        responseType: 'blob', 
      });

      if (response.status === 200 && response.data instanceof Blob) { // ステータスコードが200 かつ レスポンスのデータがBlob型
        const contentType = response.headers["content-type"];
        // response.headers["content-type"]
        // HTTPレスポンスのヘッダー(サーバーからブラウザへの返答の一部)に含まれるContent-Typeを取得
        // これにより、サーバーから返されるデータが何の種類のファイルか（例えば、CSV、Excel、JSONなど）を知ることができる
        if (contentType && contentType.includes("text/csv")) {
          // 左側の contentType が「真（存在する）」であれば、右側の contentType.includes("text/csv") を評価する
          // contentType が null や undefined だった場合（例えば、サーバーが Content-Type ヘッダーを返さなかった場合）、その時点で後ろの contentType.includes(...) は評価されず、falseになる
          // contentType.includes("text/csv")だけだと、もしcontentType が null や undefined だと、エラーが発生する
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
          link.download = "products.csv";
          link.click();
        } else {
          console.error('Unexpected content type:', contentType);
          alert("エクスポートに失敗しました。");
        }
      } else {
        console.error('Unexpected response:', response);
        alert("エクスポートに失敗しました。");
      }
    } catch (error) {
      console.error("CSV export failed:", error);
      alert("エクスポート中にエラーが発生しました。");
    }
  };

  return (
    <div>
      <button onClick={handleExportExcel}>Excelエクスポート</button> 
      <button onClick={handleExportCsv}>CSVエクスポート</button>
      {/* クリックするとhandleExceportExcel handleExportCsvが実行されるボタン */}
    </div>
  );
};


export default ExportButtons;
