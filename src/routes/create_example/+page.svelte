<script lang="ts">
  export let data;
  let group_map = new Map();
 

  // データ削除機能を関数化
  async function deleteAllData() {
    data.posts.forEach(post => {
        if (!group_map.has(post.question_group_id)) {
            group_map.set(post.question_group_id, post.question_group_text);
        }
    });
    for (const [key, value] of group_map.entries()) {
      const response = await fetch(`http://localhost:8000/faq/groups/${key}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  //例となるデータの作成
    async function createExampleData() {
          await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            question_text: 'フォームズとは何ですか?',
            answer_text: 'フォームズは、メールフォームのレンタルサービスを提供しています。',
            user_id: 1,
            question_group_id: 1,
            question_group_text: 'フォームズについて',
            }),
        });
          await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            question_text: 'フォームを修正（ログイン）したい。',
            answer_text: '画面上部メインメニューの「フォームの修正」をクリックしてログインページに移動してください。',
            user_id: 3,
            question_group_id: 2,
            question_group_text: 'フォームについて',
            }),
        });
          await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            question_text: 'フォームの設置の仕方が分からない。',
            answer_text: 'フォームの設置方法については、こちらのページで説明しております。',
            user_id: 3,
            question_group_id: 2,
            question_group_text: 'フォームについて',
            }),
        });
          await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            question_text: 'パソコン宛にメールが届きません。',
            answer_text: 'メールが届かないのは、以下の原因が考えられます。',
            user_id: 5,
            question_group_id: 3,
            question_group_text: 'メールについて',
            }),
        });
          await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            question_text: '携帯電話宛にメールが届きません。（携帯キャリアのメールアドレス）',
            answer_text: '携帯電話のメールアドレス宛てに届かないのであれば、その原因のほとんどは迷惑メール対策によるものです。「なりますましメール拒否」を解除して再度確認してみてください。',
            user_id: 2,
            question_group_id: 3,
            question_group_text: 'メールについて',
            }),
        });
        const response = await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            question_text: '有料サービスの料金を支払ったが更新されていない。',
            answer_text: 'ご不便だとは思いますが、有料サービス料金の入金を行なってもすぐには更新されません。',
            user_id: 1,
            question_group_id: 4,
            question_group_text: '有料サービスについて',
            }),
        });
    }

    // 送信イベントで複数の関数を実行する
    async function handleSubmit() {
      try {
        await deleteAllData(); // 最初に全データを削除
        await createExampleData(); // 次に例となるデータを作成
      }
      catch (error: any) {
        alert(`データの作成に失敗しました: ${error.message}`);
      }
      alert('データの作成が完了しました');
      window.location.href = "/"; 
    }
</script>


<form on:submit|preventDefault={handleSubmit}>
    <button type="submit">例となるデータの作成</button>
    </form>