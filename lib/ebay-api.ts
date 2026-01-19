// eBay Browse API integration for baseball card images

const EBAY_API_URL = "https://api.ebay.com";
const EBAY_AUTH_URL = "https://api.ebay.com/identity/v1/oauth2/token";
const SPORTS_CARDS_CATEGORY = "212"; // eBay category for Sports Trading Cards

// Token cache
let cachedToken: { token: string; expiresAt: number } | null = null;

interface EbayTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface EbayImage {
  imageUrl: string;
  height?: number;
  width?: number;
}

interface EbayItemSummary {
  itemId: string;
  title: string;
  image?: EbayImage;
  additionalImages?: EbayImage[];
  thumbnailImages?: EbayImage[];
  price?: {
    value: string;
    currency: string;
  };
  itemWebUrl?: string;
  condition?: string;
  conditionId?: string;
}

interface EbaySearchResponse {
  total: number;
  limit: number;
  offset: number;
  itemSummaries?: EbayItemSummary[];
}

export interface BaseballCardResult {
  imageUrl: string;
  title: string;
  price?: string;
  currency?: string;
  itemUrl?: string;
  condition?: string;
}

/**
 * Get OAuth access token using client credentials flow
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 300000) {
    return cachedToken.token;
  }

  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("eBay API credentials not configured");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(EBAY_AUTH_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`eBay auth failed: ${error}`);
  }

  const data: EbayTokenResponse = await response.json();

  // Cache the token
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

/**
 * Search for baseball cards by player name
 */
export async function searchBaseballCard(
  playerName: string,
  options: { limit?: number; vintage?: boolean } = {}
): Promise<BaseballCardResult | null> {
  try {
    const token = await getAccessToken();
    const { limit = 1, vintage = false } = options;

    // Build search query
    let query = `${playerName} baseball card`;
    if (vintage) {
      query += " vintage";
    }

    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      filter: `categoryIds:{${SPORTS_CARDS_CATEGORY}}`,
      sort: "newlyListed", // Get fresh listings with good images
    });

    const response = await fetch(
      `${EBAY_API_URL}/buy/browse/v1/item_summary/search?${params}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`eBay search failed: ${error}`);
    }

    const data: EbaySearchResponse = await response.json();

    if (!data.itemSummaries || data.itemSummaries.length === 0) {
      return null;
    }

    const item = data.itemSummaries[0];

    if (!item.image?.imageUrl) {
      return null;
    }

    return {
      imageUrl: item.image.imageUrl,
      title: item.title,
      price: item.price?.value,
      currency: item.price?.currency,
      itemUrl: item.itemWebUrl,
      condition: item.condition,
    };
  } catch (error) {
    console.error("Error searching for baseball card:", error);
    throw error;
  }
}

/**
 * Search for multiple baseball cards (e.g., for a gallery)
 */
export async function searchBaseballCards(
  playerName: string,
  limit: number = 5
): Promise<BaseballCardResult[]> {
  try {
    const token = await getAccessToken();

    const params = new URLSearchParams({
      q: `${playerName} baseball card`,
      limit: limit.toString(),
      filter: `categoryIds:{${SPORTS_CARDS_CATEGORY}}`,
      sort: "newlyListed",
    });

    const response = await fetch(
      `${EBAY_API_URL}/buy/browse/v1/item_summary/search?${params}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`eBay search failed: ${error}`);
    }

    const data: EbaySearchResponse = await response.json();

    if (!data.itemSummaries) {
      return [];
    }

    return data.itemSummaries
      .filter((item) => item.image?.imageUrl)
      .map((item) => ({
        imageUrl: item.image!.imageUrl,
        title: item.title,
        price: item.price?.value,
        currency: item.price?.currency,
        itemUrl: item.itemWebUrl,
        condition: item.condition,
      }));
  } catch (error) {
    console.error("Error searching for baseball cards:", error);
    throw error;
  }
}

/**
 * Check if eBay API is configured
 */
export function isEbayConfigured(): boolean {
  return !!(process.env.EBAY_CLIENT_ID && process.env.EBAY_CLIENT_SECRET);
}
