const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog App e2e', () => {
    beforeEach(async ({ page }) => {
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
})