
  <script lang="ts">
    const apiUrl = import.meta.env.VITE_API_URL;
    export let data;
    interface Post {
      user_id: number;
      question_id: number;
      question_text: string;
      answer_text: string;
      question_group_text: string;
      question_group_id: number;
    }

  interface GroupedPosts {
    [key: number]: Post[];
  }
    // data.postsをquestion_group_idに基づいてグループ化する
    let groupedPosts: GroupedPosts = {}; //groupedPostsはkeyがint,valueが配列のオブジェクト 
    data.posts.forEach(post => {
      if (!groupedPosts[post.question_group_id]) {
        groupedPosts[post.question_group_id] = [];
      }
      groupedPosts[post.question_group_id].push(post);
    });

  async function deletePost(post_id) {
    try {
      const response = await fetch(`${apiUrl}/faq/${post_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok) {
        alert('削除が成功しました');
        location.reload();
      } else {
      throw new Error('サーバーエラーが発生しました');
      }
    }
    catch (error: any) {
    alert(`削除に失敗しました: ${error.message}`);
    } 
  }

  function updatePost(post_id) {
    location.href = `/update/${post_id}`;
  }


  </script>

  <h1 style="color:#7B68EE">よくある質問</h1>
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
            <button on:click={() => deletePost(post.question_id)}>削除</button>
            <button on:click={() => updatePost(post.question_id)}>編集</button>
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
  