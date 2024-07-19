import { test, expect, request} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const apiUrl = process.env.VITE_API_URL;

//削除ボタンで投稿が削除できることを確認
test('delete_faq', async ({ page }) => {
  const context = await request.newContext();
  //テストに使用するユーザーが存在しないことを確認
  await context.delete(`${apiUrl}/faq/users/200`,{
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
      "question_text": "ユーザー削除テスト質問",
      "answer_text": "ユーザー削除テスト回答",
      "user_id": 200,
      "question_group_id": 2000000,
      "question_group_text": "ユーザー確認グループ",
    }
  });

  await page.goto('http://localhost:5173/');

  await page.locator('li').filter({ hasText: 'ユーザー確認グループ User ID: 200' }).getByRole('button').first().scrollIntoViewIfNeeded();
  await page.screenshot({path: 'check_screenshot_text_2_2.png'});
  //削除ボタンをクリック
  await page.locator('li').filter({ hasText: 'ユーザー確認グループ User ID: 200' }).getByRole('button').first().click();
  await page.screenshot({ path: 'check_screenshot_text_2_3.png' });
 
  //ダイアログの確認
  page.on('dialog', (dialog) => {
   expect(dialog.message()).toContain('削除が成功しました')
   dialog.accept()
  })

  //削除されていることを確認
  await expect(page.locator('li').filter({ hasText: 'ユーザー確認グループ User ID: 200' })).not.toBeVisible();

  //使用したテストデータを削除
  await context.delete(`${apiUrl}/faq/users/200`,{
    headers: {
      Accept : 'application/json',
    },
  });
});

