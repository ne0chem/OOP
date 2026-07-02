import { mediaUrl } from "./mediaUrl.js";

export function mapExpertToCard(expert) {
  return {
    id: expert.id,
    name: expert.name || "",
    role: expert.position || "",
    description: expert.specialization || "",
    photo: mediaUrl(expert.photo),
    buttonText: "Вебинар",
    footerText: expert.organization || "",
  };
}
