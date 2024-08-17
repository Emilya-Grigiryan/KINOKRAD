const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    console.log("(Kinokrad: Starting navigation)");
    await page.goto("https://kinokrad.ac/");
});

test("Login and then Logout", async ({ page }) => {
    // Click on the "Login" link
    const loginLink = page.locator('a[title="Вход"]');
    await loginLink.click();

    // Login with the same account
    const LoginField = page.locator('input[name="login_name"]');
    const PasswordField = page.locator('input[name="login_password"]');
    const LoginBtn = page.locator('button[title="Вход"]');

    await LoginField.fill("lkjhgfd2024");
    await PasswordField.fill("NewPassw0rd!");
    await LoginBtn.click();

    // Verify that Login was successful
    const profileLink = page.locator('a[href="https://kinokrad.ac/index.php?do=pm"]');
    await page.waitForLoadState('networkidle');
    await expect(profileLink).toBeVisible();

    console.log("Login completed successfully!!!...");

    // Logout from the account
    const logoutBtn = page.locator('a[href="https://kinokrad.ac/index.php?action=logout"]');
    await logoutBtn.click();

    // Wait for the "Login" link to be visible again
    await loginLink.waitFor({ state: 'visible' });
    await expect(loginLink).toBeVisible();

    console.log("Logout completed successfully!!!...");
});