<script lang="ts">
  export let data;
  const apiUrl = import.meta.env.VITE_API_URL;
  // key: question_group_id
  // value: question_group_text 
  let group_map = new Map();
    data.posts.forEach(post => {
        if (!group_map.has(post.question_group_id)) {
            group_map.set(post.question_group_id, post.question_group_text);
        }
    });


  let selected_question_group_id = '';

  async function eraseQuestionGroup() {
    //セレクトボタンが選択されていない場合、警告を表示
    if(selected_question_group_id === '') {
      alert('削除する質問グループを選択してください。');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/faq/groups/${selected_question_group_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok) {
        alert(`${selected_question_group_id}番の質問グループの削除が成功しました`);
        location.reload();
        window.location.href = "/";
      } else {
        throw new Error('サーバーエラーが発生しました');
      }
    }
    catch (error: any) {
      alert(`削除に失敗しました: ${error.message}`);
    }
    
  }
</script>


<h2>質問グループの削除(関連するQ＆Aもすべて削除されます)</h2>



<form on:submit|preventDefault={eraseQuestionGroup}>
<select bind:value={selected_question_group_id}>
    <option value="">削除する質問グループを選択してください</option>
    {#each Array.from(group_map.entries()) as question_group}
        
        <option value={question_group[0]}>{question_group[0]}:{question_group[1]}</option>
    {/each}
</select>
<button type="submit">送信</button>

</form>

