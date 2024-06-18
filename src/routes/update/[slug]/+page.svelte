<script lang="ts">
    export let data;
    
    let question_text = '';
    let answer_text = '';
    
    async function updateSubmit(event) {
        try {
            const response = await fetch(`http://localhost:8000/faq/${data.slug}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({question_text, answer_text}),
            });
            if(response.ok) {
                alert('更新が完了しました');
                location.href = '/';
            }
            else {
                throw new Error('サーバーエラーが発生しました');
            }
        }
        catch (error: any) {
            alert(`更新に失敗しました: ${error.message}`);
        }
    }

    async function backPage() {
        location.href = '/';
    }


</script>

<h1 style="color:#7B68EE; text-align:center;">Q＆Aの編集</h1>

<form on:submit|preventDefault={updateSubmit}>
    <div>
        <label for="question_text">質問:</label>
        <input id="question_text" type="text" bind:value={question_text} />
    </div>

    <div>
        <label for="answer_text">答え:</label>
        <textarea id="content" bind:value={answer_text}></textarea>
    </div>

    <button type="submit">更新</button>
    
</form>

<button type="submit" on:click={backPage}>戻る</button>

<style>
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    div {
      margin-bottom: 10px;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    input[type="text"],
    textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button[type="submit"] {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button[type="submit"]:hover {
      background-color: #0056b3;
    }
  </style>