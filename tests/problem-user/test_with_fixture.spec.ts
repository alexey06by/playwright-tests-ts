import { expect } from '@playwright/test';
import { test } from '../../fixtures/testIdGenerator';
import dotenv from 'dotenv'
dotenv.config()

test.only("Should add random item to cart", async({page, randomItem})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', process.env.USER_NAME || '');   
    await page.fill('#password', process.env.PASSWORD || '');
    await page.click('#login-button');
    await page.click(randomItem);
    await page.click('#add-to-cart');

    const shopping_cart_badge = page.locator('.shopping_cart_badge'); 
    await expect(shopping_cart_badge).toBeVisible();
    await expect(shopping_cart_badge).toContainText('1');    
})
