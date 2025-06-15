import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

test.describe('Login page', async()=> {
    test('Should login with valid credentials', async ({ page }) => {
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory\.html/);
    });
    test('Should show error when login with invalid credentials', async ({ page }) => {
        await page.goto('');
        await page.fill('#user-name', 'invalid_login');   
        await page.fill('#password', 'invalid_password');
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match any user in this service');        
    });
})