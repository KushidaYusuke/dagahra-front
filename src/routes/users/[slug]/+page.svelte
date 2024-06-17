<script>
    export let data;
    let selected_user_id = data.selected_user_posts[0].user_id;
</script>




<h2 style="color:#7B68EE">ユーザーID{selected_user_id}のQ＆A一覧</h2>
<ul class="post-list">
    {#each data.selected_user_posts as post}
    <div class="post">
        <div class="meta">Question ID: {post.question_id}</div>
        <div class="question">Q: {post.question_text}</div>
        <div class="question">A: {post.answer_text}</div>
    </div>
    {/each}
</ul>

<button onclick="location.href='/users'">戻る</button>
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

