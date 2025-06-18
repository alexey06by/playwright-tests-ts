import { test, expect } from '@playwright/test';

test('Should upload file', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.setInputFiles('#file-upload', 'tests/test-browser-actions/test.txt');
    await page.click('#file-submit');

    await expect(page.locator('#uploaded-files')).toHaveText('test.txt');
})
