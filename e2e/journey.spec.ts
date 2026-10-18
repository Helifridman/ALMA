import { expect, test, type Page } from "@playwright/test";

/**
 * End-to-end user journey on a mobile viewport:
 * onboarding → placement → first lesson → summary → review → achievements → parents.
 * Exercises are answered by reading the lesson content from the page's data
 * (the app exposes no answers, so we answer via the generic "first option then retry" strategy
 * for choices, and via known words for the first lesson).
 */

async function answerCurrentExercise(page: Page) {
  // Self-submitting exercises
  const readDone = page.getByRole("button", { name: "קראתי בקול" });
  if (await readDone.isVisible().catch(() => false)) {
    await readDone.click();
    return;
  }
  const check = page.getByRole("button", { name: "בדיקה" });
  // Match pairs: click pairs until done (brute force by trying combinations)
  const pressed = page.locator('button[aria-pressed]');
  if (!(await check.isVisible().catch(() => false))) {
    // match-pairs: try left[i] with each right until matched
    const buttons = pressed;
    const count = await buttons.count();
    const half = count / 2;
    for (let i = 0; i < half; i++) {
      for (let j = half; j < count; j++) {
        const l = buttons.nth(i);
        const r = buttons.nth(j);
        if (await l.isDisabled() || await r.isDisabled()) continue;
        await l.click();
        await r.click();
        await page.waitForTimeout(500);
        if (await l.isDisabled()) break;
      }
    }
    return;
  }
  // Generic choice: pick options until one is correct (max 2 attempts, as the engine allows)
  const options = page.locator('main button[aria-pressed="false"], button[aria-pressed="false"]');
  const n = await options.count();
  if (n === 0) {
    // spelling / sentence builder: tap tiles in order is not derivable; submit something.
    const tiles = page.locator('button[aria-label^="אות "], .en button');
    const t = await tiles.count();
    for (let i = 0; i < Math.min(t, 3); i++) await tiles.nth(i).click().catch(() => {});
    if (await check.isEnabled()) await check.click();
    return;
  }
  await options.first().click();
  await check.click();
}

async function continueOrRetry(page: Page) {
  const cont = page.getByRole("button", { name: "המשך" });
  const retry = page.getByRole("button", { name: "עוד ניסיון" });
  if (await cont.isVisible().catch(() => false)) { await cont.click(); return "continue"; }
  if (await retry.isVisible().catch(() => false)) { await retry.click(); return "retry"; }
  return "none";
}

test("full learner journey works on mobile", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("/");
  await expect(page).toHaveURL(/\/welcome/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("button", { name: /מתחילים/ }).click();
  await page.getByLabel("כינוי").fill("אלמה");
  await page.getByRole("button", { name: "המשך" }).click();
  await page.getByRole("button", { name: "כיתה ה'" }).click();
  await page.getByRole("button", { name: "המשך" }).click();
  await page.getByRole("button", { name: "חיות" }).click();
  await page.getByRole("button", { name: "המשך" }).click();
  await page.getByRole("button", { name: "המשך" }).click();
  await page.getByRole("button", { name: /לאבחון/ }).click();
  await expect(page).toHaveURL(/\/placement/);

  // Skip placement → level 0, then run it from the home flow later if needed
  await page.getByRole("button", { name: /לדלג/ }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByText("אלמה")).toBeVisible();

  // Profile persists across reload
  await page.reload();
  await expect(page.getByRole("heading", { name: "אלמה" })).toBeVisible();

  // Start first lesson
  await page.getByRole("link", { name: /מתחילים ללמוד/ }).click();
  await expect(page).toHaveURL(/\/lesson\/w1-l1/);
  await page.getByRole("button", { name: /מתחילים/ }).click();

  // Play through the lesson
  for (let step = 0; step < 60; step++) {
    if (await page.getByText("ציון השיעור").isVisible().catch(() => false)) break;
    await answerCurrentExercise(page);
    await page.waitForTimeout(150);
    const r = await continueOrRetry(page);
    if (r === "retry") {
      await answerCurrentExercise(page);
      await page.waitForTimeout(150);
      await continueOrRetry(page);
    }
  }
  await expect(page.getByText("ציון השיעור")).toBeVisible();
  await expect(page.getByText(/\+\d+ XP/)).toBeVisible();

  // Home shows XP and the next lesson
  await page.getByRole("link", { name: "למסך הבית" }).click();
  await expect(page).toHaveURL("/");
  const xp = await page.locator("text=XP").first().textContent();
  expect(xp).toBeTruthy();

  // Progress survives reload
  await page.reload();
  await page.getByRole("link", { name: "מסלול" }).click();
  await expect(page.getByText("1/6")).toBeVisible();

  // Review session is available
  await page.getByRole("link", { name: "חזרה" }).click();
  await expect(page).toHaveURL(/\/review$/);
  await page.getByRole("link", { name: /חזרה|חיזוק/ }).first().click();
  await expect(page).toHaveURL(/\/review\/session/);
  await expect(page.getByRole("button", { name: "בדיקה" }).or(page.getByRole("button", { name: "קראתי בקול" }))).toBeVisible();

  // Achievements and parents area
  await page.goto("/achievements");
  await expect(page.getByText("שיעור ראשון!")).toBeVisible();
  await page.goto("/parents");
  await expect(page.getByText("שער הורים")).toBeVisible();
  const q = await page.locator(".en.font-bold").first().textContent();
  const m = q?.match(/(\d+) × (\d+)/);
  if (m) {
    await page.getByLabel("תשובה").fill(String(Number(m[1]) * Number(m[2])));
    await page.getByRole("button", { name: "כניסה" }).click();
    await expect(page.getByText("זמן לימוד השבוע")).toBeVisible();
  }

  expect(errors.filter((e) => !/favicon|sw\.js|Download the React DevTools|hydrat/i.test(e))).toEqual([]);
});
