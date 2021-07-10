export function avatar(id?: string, hash?: string) {
  return `https://cdn.discordapp.com/avatars/${id}/${hash}.png`;
}

export function guildIcon(id?: string, hash?: string) {
  return `https://cdn.discordapp.com/icons/${id}/${hash}.jpg`;
}
