<script lang="ts">
    export let data;
    let selected_user_id = data.selected_user_posts[0].user_id;
    async function deleteAllPosts() {
        try {
            const response = await fetch(`http://localhost:8000/faq/users/${selected_user_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok) {
                alert('削除が成功しました');
                location.reload();
                location.href = '/';
            } else {
                throw new Error('サーバーエラーが発生しました');
            }
        }
        catch (error: any) {
            alert(`削除に失敗しました: ${error.message}`);
        }
    }
    
    function backScreen() {
        location.href = '/users';
    }
</script>




<h2 style="color:#7B68EE">ユーザーID{selected_user_id}のQ＆A一覧</h2>

<h3>「このユーザーを削除」をクリックすると、このユーザーが投稿したすべてのQ＆Aが削除されます。
</h3>
<ul class="post-list">
    {#each data.selected_user_posts as post}
    <div class="post">
        <div class="meta">Question ID: {post.question_id}</div>
        <div class="question">Q: {post.question_text}</div>
        <div class="question">A: {post.answer_text}</div>
    </div>
    {/each}
</ul>

<button on:click={deleteAllPosts}>このユーザーを削除</button>

<button on:click={backScreen}>戻る</button>
<style>
  .post {
    border: 1px solid #dbdada;
    padding: 10px;
    margin-bottom: 10px;
    background: #f0eeee;
  }
  .post .meta {
    font-size: 1em;
    color: #666;
  }
  .post .question {
    font-size: 1.2em;
    font-weight: bold;
  }
</style>

