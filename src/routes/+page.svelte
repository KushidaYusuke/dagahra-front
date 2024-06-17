
  <script lang="ts">
    export let data;

    // data.postsをquestion_group_idに基づいてグループ化する
    let groupedPosts = {}; //groupedPostsはkeyがint,valueが配列のオブジェクト 
    data.posts.forEach(post => {
      if (!groupedPosts[post.question_group_id]) {
        groupedPosts[post.question_group_id] = [];
      }
      groupedPosts[post.question_group_id].push(post);
    });
  </script>

  <h2 style="color:#7B68EE">よくある質問</h2>
  <ul class="post-list">
    <!-- Object.entries()はオブジェクトのキーと値のペアを配列として返す -->
    {#each Object.entries(groupedPosts) as [groupId, posts]} 
      <li>
        <h2>{posts[0].question_group_text}</h2>
        <!-- <h2>Question Group ID: {groupId}</h2> -->
        {#each posts as post}
          <div class="post">
            <div class="meta">User ID: {post.user_id}</div>
            <div class="meta">Question ID: {post.question_id}</div>
            <div class="question">Q: {post.question_text}</div>
            <div class="question">A: {post.answer_text}</div>
          </div>
        {/each}
      </li>
    {/each}
  </ul>
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
  