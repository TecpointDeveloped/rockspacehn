export const SITE = {
  name: "Rock Space Honduras",
  shortName: "ROCKSPACEHN",
  url: "https://rockspacehn.com",
  instagram: "https://www.instagram.com/rockspacehn/",
  instagramHandle: "@rockspacehn",
  whatsappNumber: "50494659287",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
