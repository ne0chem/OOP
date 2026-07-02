import { useEffect, useState } from "react";
import { fetchSocials } from "../api/socials.js";
import { asset } from "../utils/asset.js";
import { mediaUrl, normalizeUrl } from "../utils/mediaUrl.js";

const fallbackSocials = [
  { id: "vk", name: "VK Видео", url: "", icon: asset("/vk.svg") },
  { id: "rutube", name: "Rutube", url: "", icon: asset("/rutube.svg") },
  { id: "dzen", name: "Дзен", url: "", icon: asset("/dzen.svg") },
  { id: "telegram", name: "Telegram", url: "", icon: asset("/un.svg") },
  { id: "clip", name: "Клип", url: "", icon: asset("/clip.svg") },
  { id: "th", name: "TenChat", url: "", icon: asset("/th.svg") },
  { id: "tench", name: "TenChat", url: "", icon: asset("/tench.svg") },
  { id: "max", name: "MAX", url: "", icon: asset("/max.svg") },
];

function mapSocialToCard(social) {
  return {
    id: social.id,
    name: social.name || "",
    url: normalizeUrl(social.url),
    icon: mediaUrl(social.icon),
  };
}

export function useSocials({ fallbackOnError = true } = {}) {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const items = await fetchSocials();
        if (cancelled) return;

        if (items.length > 0) {
          setSocials(items.map(mapSocialToCard));
        } else {
          setSocials([]);
        }
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err);
        if (fallbackOnError) {
          setSocials(fallbackSocials);
        } else {
          setSocials([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [fallbackOnError]);

  return { socials, loading, error };
}
