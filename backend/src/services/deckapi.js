// backend/src/services/deckapi.js
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer";

const URL = "https://royaleapi.com/decks/popular";
const CACHE_PATH = path.resolve("data/decks.json");

// helpers pra pegar texto sem travar o scraper
async function safeText(page, selector) {
    try {
        await page.waitForSelector(selector, { timeout: 1000 });
        return await page.$eval(selector, el => el.innerText.trim());
    } catch {
        return null;
    }
}

// mesma coisa mas pegando atributo
async function safeAttr(page, selector, attr) {
    try {
        await page.waitForSelector(selector, { timeout: 1000 });
        return await page.$eval(selector, el => el.getAttribute(attr));
    } catch {
        return null;
    }
}

// pega tudo do deck (bem grande mesmo)
async function extractDeckData(page, deck) {
    const data = {};

    data.deck_id = await page.evaluate(el => el.id, deck);
    data.data_name = await page.evaluate(el => el.getAttribute("data-name"), deck);

    data.name_desktop = await page.evaluate(el => {
        const n = el.querySelector(".deck_human_name-desktop");
        return n ? n.innerText.trim() : null;
    }, deck);

    data.name_mobile = await page.evaluate(el => {
        const n = el.querySelector(".deck_human_name-mobile");
        return n ? n.innerText.trim() : null;
    }, deck);

    data.cards = await page.evaluate(el => {
        return [...el.querySelectorAll("img.deck_card")].map(card => ({
            alt: card.getAttribute("alt"),
            card_key: card.getAttribute("data-card-key"),
            image: card.getAttribute("src")
        }));
    }, deck);

    data.copy_link = await page.evaluate(el => {
        const a = el.querySelector("a[href*='copyDeck']");
        return a ? a.getAttribute("href") : null;
    }, deck);

    data.qr_code = await page.evaluate(el => {
        const qr = el.querySelector(".qrcode_button");
        return qr ? qr.getAttribute("data-qrcode") : null;
    }, deck);

    data.follow_button = await page.evaluate(el => {
        const b = el.querySelector(".follow_button");
        return b
            ? {
                  action: b.getAttribute("data-action"),
                  category: b.getAttribute("data-category"),
                  name: b.getAttribute("data-name")
              }
            : null;
    }, deck);

    data.usage_percent_label = await page.evaluate(el => {
        const badge = el.querySelector(".ui.black.label");
        if (!badge) return null;
        return badge.innerText.trim().split("\n")[0];
    }, deck);

    data.usage_absolute_label = await page.evaluate(el => {
        const badge = el.querySelector(".ui.black.label .detail");
        return badge ? badge.innerText.trim() : null;
    }, deck);

    data.avg_elixir = await page.evaluate(el => {
        const items = [...el.querySelectorAll(".battle_stats .item")];
        for (const i of items) {
            if (i.getAttribute("data-content") === "Avg Elixir") {
                return i.querySelector(".value")?.innerText.trim() || null;
            }
        }
        return null;
    }, deck);

    data.four_card_cycle = await page.evaluate(el => {
        const items = [...el.querySelectorAll(".battle_stats .item")];
        for (const i of items) {
            const label = i.getAttribute("data-content");
            if (label === "4-Card Cycle" || label === "Shortest Cycle") {
                return i.querySelector(".value")?.innerText.trim() || null;
            }
        }
        return null;
    }, deck);

    data.mobile_table = await page.evaluate(el => {
        try {
            const table = el.querySelector(".mobile-show table");
            const row = table.querySelectorAll("tr")[1];
            const cols = row.querySelectorAll("td");
            return {
                rating: cols[0].innerText.trim(),
                usage_absolute: cols[1].innerText.trim(),
                wins_percent: cols[2].innerText.trim(),
                draw_percent: cols[3].innerText.trim(),
                loss_percent: cols[4].innerText.trim()
            };
        } catch {
            return null;
        }
    }, deck);

    data.desktop_table = await page.evaluate(el => {
        try {
            const table = el.querySelector(".mobile-hide table");
            const rows = table.querySelectorAll("tr");
            const r1 = rows[1].querySelectorAll("td");
            const r2 = rows[2].querySelectorAll("td");

            return {
                rating: r1[0].innerText.trim(),
                usage_percent: r1[1].innerText.trim(),
                wins_percent: r1[2].innerText.trim(),
                draw_percent: r1[3].innerText.trim(),
                loss_percent: r1[4].innerText.trim(),
                usage_absolute: r2[1].innerText.trim(),
                wins_absolute: r2[2].innerText.trim(),
                draw_absolute: r2[3].innerText.trim(),
                loss_absolute: r2[4].innerText.trim()
            };
        } catch {
            return null;
        }
    }, deck);

    data.win_rate_bars = await page.evaluate(el => {
        try {
            const wins = el.querySelector(".bar.wins")?.className ?? "";
            const loss = el.querySelector(".bar.losses")?.className ?? "";
            return {
                wins_pc: wins.split("pc-")[1],
                loss_pc: loss.split("pc-")[1]
            };
        } catch {
            return null;
        }
    }, deck);

    data.top_player = await page.evaluate(el => {
        try {
            const link = el.querySelector(".deck_search_results__highest_trophy_link");
            return {
                player_name: link.querySelector(".player").innerText.trim(),
                trophies: link.querySelector(".item:nth-child(2)").innerText.trim(),
                profile_url: link.getAttribute("href")
            };
        } catch {
            return null;
        }
    }, deck);

    return data;
}

// abre navegador, pega o deck e fecha, padrãozinho
async function fetchDeck() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: "networkidle2" });
    await page.waitForSelector(".deck_segment");

    const deckEl = (await page.$$(".deck_segment"))[0];
    const data = await extractDeckData(page, deckEl);

    await browser.close();
    return data;
}

// pega só o básico pra mandar no frontend
function getBestDeck(deck) {
    return {
        name: deck.name_desktop || deck.name_mobile,
        winrate: deck.desktop_table?.wins_percent || null,
        usage: deck.desktop_table?.usage_percent || null,
        cards: deck.cards
    };
}

// cachezinho diário pra não fritar o puppeteer todo dia
export async function getDailyDeck() {
    await fs.ensureDir(path.dirname(CACHE_PATH));
    await fs.ensureFile(CACHE_PATH);

    let file = {};
    try {
        file = await fs.readJSON(CACHE_PATH);
    } catch {}

    const today = new Date().toISOString().split("T")[0];

    // se já raspou hoje, só devolve
    if (file.date === today && file.deck) {
        return { fromCache: true, deck: file.deck, best: getBestDeck(file.deck) };
    }

    // senão raspa de novo
    const deck = await fetchDeck();

    await fs.writeJSON(CACHE_PATH, { date: today, deck }, { spaces: 4 });

    return { fromCache: false, deck, best: getBestDeck(deck) };
}
