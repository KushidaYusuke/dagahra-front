import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const apiUrl = process.env.VITE_API_URL;
test.beforeEach(async ({ page }) => {
  const context = await request.newContext();
  
  await context.delete(`${apiUrl}/faq/groups/4000000`,{
    headers: {
      Accept : 'application/json',
    },
  });

  //APIを直接叩いてテストデータを作成
  await context.post(`${apiUrl}/faq`,{
    headers: {
      Accept : 'application/json',
    },
    data:   {
      "question_text": "編集確認質問",
      "answer_text": "編集確認回答",
      "user_id": 400,
      "question_group_id": 4000000,
      "question_group_text": "編集確認グループ",
    }
  });
});

//編集ボタンから質問の編集ができることを確認
test('update_faq', async ({ page }) => {
  const context = await request.newContext();
  //テストスタート
  await page.goto('http://localhost:5173/');
  //編集ボタンをクリック
  
  await page.waitForLoadState('networkidle');
  await page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' }).getByRole('button').nth(1).click();
  //await page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' }).getByRole('button').nth(1).click();

  //await expect(page).toHaveURL(/http:\/\/localhost:5173\/update\/.*/);
  await page.screenshot({ path: 'check_screenshot_text_4_1.png' });
  await page.getByLabel('質問:').click();
  await page.getByLabel('質問:').fill('質問を修正');
  await page.locator('#content').click();
  await page.locator('#content').fill('回答を修正');


  await page.getByRole('button', { name: '更新' }).click();
  //await page.screenshot({ path: 'check_screenshot_text_4_2.png' })
  //更新されていることを確認
  page.on('dialog', (dialog) => {
    expect(dialog.message()).toContain('更新が完了しました')
    dialog.accept()
  })

  await page.waitForLoadState('networkidle', { timeout: 15000 });
  //ページの遷移がうまくいかない場合がある
  await expect(page).toHaveURL("http://localhost:5173/");

  await expect(page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' })).toContainText('質問を修正'); //toContainTextは部分一致を判定する
  await expect(page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' })).toContainText('回答を修正');

});

//編集時に空欄の場合、エラーメッセージが表示されることを確認
test('update_faq_error', async ({ page }) => {
  //テストスタート
  await page.goto('http://localhost:5173/');
  //編集ボタンをクリック

  //この部分でflakyになる(というか基本的に失敗する)
  //https://stackoverflow.com/questions/74301319/playwright-click-button-does-not-work-reliably-flaky を参考に修正してみる
  
  // const update_button = await page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' }).getByRole('button').nth(1);
  // expect(await update_button.evaluate(node => node.isConnected)).toBe(true);
  await page.waitForLoadState('networkidle');
  await page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' }).getByRole('button').nth(1).waitFor();
  await page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' }).getByRole('button').nth(1).click();
  
  //await page.locator('li').filter({ hasText: '編集確認グループ User ID: 400' }).getByRole('button').nth(1).click();
  //await page.waitForURL(/http:\/\/localhost:5173\/update\/.*/);
  await expect(page).toHaveURL(/http:\/\/localhost:5173\/update\/.*/);
  await page.getByLabel('質問:').click();
  await page.getByLabel('質問:').fill('');
  await page.locator('#content').click();
  await page.locator('#content').fill('');
  await page.getByRole('button', { name: '更新' }).click();
  //エラーメッセージが表示されていることを確認

});

//後処理:使用したテストデータを削除
test.afterEach(async ({ page }) => {
  const context = await request.newContext();
  await context.delete(`${apiUrl}/faq/groups/4000000`,{
    headers: {
      Accept : 'application/json',
    },
  });
});


