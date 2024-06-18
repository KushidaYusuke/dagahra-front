<script>
    export let data;
    // ユーザーIDを重複を除いて昇順に並べる
    $: user_id_set = new Set(data.posts.map(post => post.user_id));
    $: sorted_user_ids = Array.from(user_id_set).sort(); // SetをArrayに変換してソート
    let selected_user_id = '';
    
    
    function handleSubmit() {
        window.location.href = `/users/${selected_user_id}`;
    }
    
</script>

<h2>指定したユーザーIDを持つユーザーのQ＆A一覧を表示する</h2>



<form on:submit|preventDefault={handleSubmit}>
<select bind:value={selected_user_id}>
    <option value="">ユーザーIDを選択してください</option>
    {#each sorted_user_ids as user_id}
        <option value={user_id}>{user_id}</option>
    {/each}
</select>
<button type="submit">送信</button>
</form>