<script lang="ts">
    // 既存のコード
    const apiUrl = import.meta.env.VITE_API_URL;
    let question_text = '';
    let answer_text = '';
    let user_id_str = '';
    let question_group_id_str = '';
    let question_group_text = '';
    async function handleSubmit(event) {
      // 既存のpreventDefaultの呼び出し
  
      try {
        let user_id = parseInt(user_id_str, 10);
        let question_group_id = parseInt(question_group_id_str, 10);
        const response = await fetch(`${apiUrl}/faq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question_text, answer_text, user_id, question_group_id, question_group_text}),
        
        });
  
        if (!response.ok) {
          throw new Error('サーバーエラーが発生しました');
        }
  
        // 送信成功時の処理（例: フォームのリセット）
        
        alert('投稿が成功しました');
        location.reload();
      } catch (error: any) {
        alert(`投稿に失敗しました: ${error.message}`);
      }
    }
</script>
  
  
  <form on:submit|preventDefault={handleSubmit}>
    <div>
        <label for="user_id">ユーザーID:</label>
        <input id="user_id" type="text" bind:value={user_id_str} />
    </div>

    <div>
        <label for="question_group_id">質問グループID:</label>
        <input id="question_group_id" type="text" bind:value={question_group_id_str} />
    </div>

    <div>
        <label for="question_group_text">質問グループ名:</label>
        <input id="question_group_text" type="text" bind:value={question_group_text} />
      </div>  
      
    
  
    <div>
      <label for="question_text">質問:</label>
      <input id="question_text" type="text" bind:value={question_text} />
    </div>
  
    <div>
      <label for="answer_text">答え:</label>
      <textarea id="content" bind:value={answer_text}></textarea>
    </div>

    <button type="submit">投稿</button>
</form>
 

  <style>
    form {
      max-width: 500px;
      margin: auto;
      padding: 20px;
      background: #f4f4f4;
      border-radius: 8px;
    }
    div {
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input[type="text"],
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  </style>