const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog App e2e', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await page.goto('http://localhost:5173')
    })
    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Blog app')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Log in to application')).toBeVisible()
    })
    test('Login form is shown by default', async ({ page }) => {
        const username = page.getByLabel('username')
        const password = page.getByLabel('password')
        await expect(page.getByText('Log in to application')).toBeVisible()
        await expect(username).toBeVisible()
        await expect(username).toBeEditable()
        await expect(password).toBeVisible()
        await expect(password).toBeEditable()
    })

    describe('Login', () => {
        test('login form works with incorrect username', async ({ page }) => {
            await page.getByLabel('username').fill('mluukai')
            await page.getByLabel('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Password or username incorrect')).toBeVisible()
        })
        test('login form works with incorrect password', async ({ page }) => {
            await page.getByLabel('username').fill('mluukkai')
            await page.getByLabel('password').fill('salanen')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Password or username incorrect')).toBeVisible()
        })
        test('login form works with correct info', async ({ page }) => {
            await page.getByLabel('username').fill('mluukkai')
            await page.getByLabel('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('successful login')).toBeVisible()
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })
    })
})