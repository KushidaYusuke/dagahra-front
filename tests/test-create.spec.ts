import { test, expect, request } from '@playwright/test';


//前処理:使用するテストグループのデータを削除
test.beforeEach(async ({ page }) => {
  const context = await request.newContext();
  
  await context.delete("http://localhost:8000/faq/groups/1000000",{
    headers: {
      Accept : 'application/json',
    },
  });
});

//質問の新規作成
test('create_question', async ({ page }) => {
  
  const context = await request.newContext();
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Q＆Aの新規投稿' }).click();
  await page.getByLabel('ユーザーID:').click();
  await page.getByLabel('ユーザーID:').fill('100');
  await page.getByLabel('質問グループID:').click();
  await page.getByLabel('質問グループID:').fill('1000000');
  await page.getByLabel('質問グループ名:').click();
  await page.getByLabel('質問グループ名:').fill('テストの新規作成用グループ');
  await page.getByLabel('質問:').click();
  await page.getByLabel('質問:').fill('新規作成テスト質問');
  await page.locator('#content').click();
  await page.locator('#content').fill('新規作成テスト回答');
  await page.getByRole('button', { name: '投稿' }).click();
  //ダイアログの確認
  page.on('dialog', (dialog) => {
    expect(dialog.message()).toContain('投稿が成功しました')
    dialog.accept()
  })

  await page.screenshot({ path: 'check_screenshot_text_1.png', fullPage: true  });
  await page.getByRole('link', { name: 'Home' }).click();

});

//誤ったデータを入力した場合の確認(ユーザーID, 質問グループIDが不正)
test('create_wrong_question', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Q＆Aの新規投稿' }).click();
  await page.getByLabel('ユーザーID:').click();
  await page.getByLabel('ユーザーID:').fill('bad_user_id');
  await page.getByLabel('質問グループID:').click();
  await page.getByLabel('質問グループID:').fill('bad_group_id');
  await page.getByLabel('質問グループ名:').click();
  await page.getByLabel('質問グループ名:').fill('テストの新規作成用グループ');
  await page.getByLabel('質問:').click();
  await page.getByLabel('質問:').fill('新規作成テスト質問');
  await page.locator('#content').click();
  await page.locator('#content').fill('新規作成テスト回答');
  await page.getByRole('button', { name: '投稿' }).click();
  //ダイアログの確認
  page.on('dialog', (dialog) => {
    expect(dialog.message()).toContain('投稿に失敗しました: サーバーエラーが発生しました')
    dialog.accept()
  })
});

//誤ったデータを入力した場合の確認(文字列が空白)
test('create_empty_question', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Q＆Aの新規投稿' }).click();
  await page.getByLabel('ユーザーID:').click();
  await page.getByLabel('ユーザーID:').fill('bad_user_id');
  await page.getByLabel('質問グループID:').click();
  await page.getByLabel('質問グループID:').fill('bad_group_id');
  await page.getByLabel('質問グループ名:').click();
  await page.getByLabel('質問グループ名:').fill('');
  await page.getByLabel('質問:').click();
  await page.getByLabel('質問:').fill('');
  await page.locator('#content').click();
  await page.locator('#content').fill('');
  await page.getByRole('button', { name: '投稿' }).click();
  //ダイアログの確認
  page.on('dialog', (dialog) => {
    expect(dialog.message()).toContain('投稿に失敗しました: サーバーエラーが発生しました')
    dialog.accept()
  })
});

//後処理:使用したテストグループのデータを削除
test.afterEach(async ({ page }) => {
  const context = await request.newContext();
  await context.delete("http://localhost:8000/faq/groups/1000000",{
    headers: {
      Accept : 'application/json',
    },
  });
});
