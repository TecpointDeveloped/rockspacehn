export const SITE = {
  name: "Rock Space Honduras",
  shortName: "ROCKSPACEHN",
  url: "https://rockspacehn.com",
  instagram: "https://www.instagram.com/rockspacehn/",
  instagramHandle: "@rockspacehn",
  salesWhatsappNumber: "50494659287",
  supportWhatsappNumber: "50498191003",
};

export function whatsappUrlFor(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function salesWhatsappUrl(message: string) {
  return whatsappUrlFor(SITE.salesWhatsappNumber, message);
}

export function supportWhatsappUrl(message: string) {
  return whatsappUrlFor(SITE.supportWhatsappNumber, message);
}

/** Commercial alias kept for existing callers. */
export const whatsappUrl = salesWhatsappUrl;
