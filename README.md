

### 質問グループごとに質問を表示 
  http://localhost:5173/

  それぞれのQ＆Aについて、削除ボタン、編集ボタンがついている。削除ボタンを押すとその質問を削除、編集ボタンを押すと編集ページにとぶ。

<img src="image.png" alt="alt text" style="border: 2px solid #000;">


### 質問を新規投稿
  http://localhost:5173/posts

<img src="image-3.png" alt="alt text" style="border: 2px solid #000;">

### 質問の編集ページ
http://localhost:5173/update/(指定した質問の質問
ID)

質問本文と回答本文を修正

<img src="image-4.png" alt="alt text" style="border: 2px solid #000;">

### ユーザーIDを選択
http://localhost:5173/users

送信ボタンを押すと、それぞれのユーザーの質問一覧画面にとぶ

<img src="image-1.png" alt="alt text" style="border: 2px solid #000;">

### 指定したユーザーの質問一覧画面
  http://localhost:5173/users/(指定したユーザーのID)

「このユーザーの投稿をすべて削除」ボタンを押すと、指定したユーザーの投稿がすべて削除される。

<img src="image-2.png" alt="alt text" style="border: 2px solid #000;">




# create-svelte
Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
