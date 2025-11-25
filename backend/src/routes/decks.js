// backend/src/routes/decks.js
import { Router } from "express";
import axios from "axios";
import { getDailyDeck } from "../services/deckapi.js";

const router = Router();

// Debug global
const GLOBAL_DEBUG = 0;

// API Clash Royale
const API_BASE = "https://api.clashroyale.com/v1";
const TOKEN = process.env.API_KEY;

// Tag padrão
const FALLBACK_TAG = "JGCUU99V2";

// Função debug
function dlog(...msg) {
    if (GLOBAL_DEBUG === 1) console.log("[DEBUG]", ...msg);
}

/* ============================================================
   FORMATAÇÃO — DEIXAR O DECK IGUAL AO PADRÃO DO FRONTEND
   ============================================================ */
function formatDeckForFrontend(bestDeck) {
    return [
        {
            cards: bestDeck.cards.map(c => ({
                name: c.alt,
                elixir: null,    // scraper não tem elixir, então deixamos null
                icon: c.image
            })),
            usage: bestDeck.usage
                ? Number(String(bestDeck.usage).replace("%", ""))
                : 100
        }
    ];
}

/* ============================================================
   ROTA: /decks/popular — RETORNA O MELHOR DECK DO SCRAPER
   ============================================================ */
router.get("/popular", async (req, res) => {
    try {
        dlog("Rota: /popular");

        const { fromCache, deck, best } = await getDailyDeck();

        dlog("Deck obtido:", best);

        const formatted = formatDeckForFrontend(best);

        return res.json(formatted);

    } catch (e) {
        console.log("Erro ao buscar melhor deck:", e);
        return res.status(500).json({ error: "Erro ao obter o deck do dia" });
    }
});

/* ============================================================
   ROTA: /current-player — DECK REAL DO JOGADOR
   ============================================================ */
async function buscarDeck(tag) {
    const PLAYER_TAG = tag.replace("#", "").toUpperCase();

    dlog("Buscando deck do jogador:", PLAYER_TAG);

    const resp = await axios.get(
        `${API_BASE}/players/%23${PLAYER_TAG}`,
        { headers: { Authorization: `Bearer ${TOKEN}` } }
    );

    const deck = resp.data.currentDeck || [];

    return [
        {
            cards: deck.map((c) => ({
                name: c.name,
                elixir: c.elixirCost,
                icon: c.iconUrls.medium
            })),
            usage: 100
        }
    ];
}

router.get("/current-player", async (req, res) => {
    try {
        const { tag = FALLBACK_TAG } = req.query;

        dlog("Rota: /current-player");
        dlog("Tag utilizada:", tag);

        const formatted = await buscarDeck(tag);
        res.json(formatted);

    } catch (e) {
        console.log("Erro na API:", e.response?.data || e.message);
        res.status(500).json({ error: "Erro ao buscar deck do jogador" });
    }
});

/* ============================================================
   ROTA CURTA: /current — MESMO QUE /current-player
   ============================================================ */
router.get("/current", async (req, res) => {
    try {
        const { tag = FALLBACK_TAG } = req.query;

        dlog("Rota: /current");
        dlog("Tag utilizada:", tag);

        const formatted = await buscarDeck(tag);
        res.json(formatted);

    } catch (e) {
        console.log("Erro na API:", e.response?.data || e.message);
        res.status(500).json({ error: "Erro ao buscar deck do jogador" });
    }
});

export default router;
