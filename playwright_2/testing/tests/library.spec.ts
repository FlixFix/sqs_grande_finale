import { test, expect } from '@playwright/test';

test('should show page title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '📚 Library Dashboard' })).toBeVisible();
});