import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default async() => {
    const browser =await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', process.env.PROBLEM_USER_NAME || '');
    await page.fill('#password', process.env.PASSWORD || '');
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({path: 'problem-user-state.json'});
    await browser.close();
}