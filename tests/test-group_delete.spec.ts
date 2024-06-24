import { test, expect, request } from '@playwright/test';


//質問グループの削除を行う
test('group_delete', async ({ page }) => {
  const context = await request.newContext();

  //使用する予定のテストデータが存在しないことを確認
  await context.delete("http://localhost:8000/faq/groups/5000000",{
    headers: {
      Accept : 'application/json',
    },
  });

  //APIを直接叩いてテストデータを作成
  await context.post("http://localhost:8000/faq",{
    headers: {
      Accept : 'application/json',
    },
    data:   {
      "question_text": "グループ削除確認質問",
      "answer_text": "グループ削除確認回答",
      "user_id": 500,
      "question_group_id": 5000000,
      "question_group_text": "グループ削除確認グループ",
    }
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: '質問グループの削除' }).click();
  await page.getByRole('combobox').selectOption('5000000');
  //await page.getByRole('combobox').selectOption('5000000');
  await page.screenshot({ path: 'check_screenshot_text_5_1.png' })
  await page.getByRole('button', { name: '送信' }).click();
   //ダイアログの確認
   page.on('dialog', (dialog) => {
    expect(dialog.message()).toContain('5000000番の質問グループの削除が成功しました')
    dialog.accept()
  })

  //削除されていることを確認
  await expect(page.locator('li').filter({ hasText: 'グループ削除確認グループ User ID: 500' })).not.toBeVisible();
  //使用したテストデータを削除
  await context.delete("http://localhost:8000/faq/groups/5000000",{
    headers: {
      Accept : 'application/json',
    },
  });
});
