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
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Antti Laaksonen',
                username: 'alaakson',
                password: 'salasala'
            }
        })
        await page.goto('http://localhost:5173')
    })
    describe('Homepage', () => {
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

    describe('When logged in', async () => {
        beforeEach(async ({ page }) => {
            await page.getByLabel('username').fill('mluukkai')
            await page.getByLabel('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
        })
        test('Blog form works with correct info', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill("This is title")
            await page.getByLabel('author').fill("Author name")
            await page.getByLabel('url').fill("https://url.xyz")
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('Blog created successfully')).toBeVisible()
            await expect(page.getByText('This is title Author name')).toBeVisible()
        })
        test('Blog can be liked multiple times', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill("This is title")
            await page.getByLabel('author').fill("Author name")
            await page.getByLabel('url').fill("https://url.xyz")
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('0')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('1')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('2')).toBeVisible()
        })
        test('Blog can be deleted by the creator', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill("This is title")
            await page.getByLabel('author').fill("Author name")
            await page.getByLabel('url').fill("https://url.xyz")
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText('This is title Author name')).toBeHidden()
        })
        test('Blog can\'t be deleted by others', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill("This is title")
            await page.getByLabel('author').fill("Author name")
            await page.getByLabel('url').fill("https://url.xyz")
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'logout' }).click()

            await page.getByLabel('username').fill('alaakson')
            await page.getByLabel('password').fill('salasala')
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('This is title Author name')).toBeVisible()
            await expect(page.getByText('remove')).toBeHidden()
        })
    })
})