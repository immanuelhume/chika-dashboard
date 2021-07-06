import { CommandCategory, SimpleCommandFragment } from '../graphql/generated';

export function splitCommands(commands: SimpleCommandFragment[]) {
  return commands.reduce((acc, com) => {
    const { category: cat } = com;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(com);
    return acc;
  }, {} as Record<CommandCategory, SimpleCommandFragment[]>);
}
