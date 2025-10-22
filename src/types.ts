export type Rarity = "common" | "rare" | "epic" | "legendary" | "mythic" | "unknown";


export interface Skin {
    id: string;
    name: string;
    rarity: Rarity;
    image_url: string | null;
}

export interface Hero {
    id: string;
    name: string;
    role: "support" | "damage" | "tank";
    portrait_url: string | null;
    skins: Skin[];
}