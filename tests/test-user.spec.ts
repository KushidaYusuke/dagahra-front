import { test, expect, request } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const context = await request.newContext();
  
  await context.delete("${apiUrl}/faq/groups/3000000",{
    headers: {
      Accept : 'application/json',
    },
  });

  //APIを直接叩いてテストデータを作成
  await context.post("${apiUrl}/faq",{
    headers: {
      Accept : 'application/json',
    },
    data:   {
      "question_text": "ユーザー確認質問",
      "answer_text": "ユーザー確認回答",
      "user_id": 300,
      "question_group_id": 3000000,
      "question_group_text": "ユーザー確認グループ",
    }
  });
});

test('user_page', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'ユーザーごとに質問を取得' }).click();
    await page.reload()	
    await page.getByRole('combobox', {name: 'select user'}).selectOption('300');
    await page.getByRole('button', { name: '送信' }).click();
    await page.getByRole('button', { name: 'このユーザーを削除' }).click();
});

test.afterEach(async ({ page }) => {
    const context = await request.newContext();
    
    await context.delete("${apiUrl}/faq/groups/3000000",{
        headers: {
        Accept : 'application/json',
        },
    });
});

