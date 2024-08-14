type TBemNameGeneratorModifier = { [key: string]: number | string | boolean | null };

const getModifiers = (value: TBemNameGeneratorModifier, element: string) => {
  const result = Object.entries(value)
    .filter(([_k, v]) => v !== false && v !== null)
    .reduce((acc, [k, v]) => {
      const modifier = v === true ? k : `${k}_${v}`;
      acc += `${element}_${modifier} `;
      return acc;
    }, '');

  return result.trim();
}

const bemNameGenerator = (block: string) => {
  const func = (...args: Array<TBemNameGeneratorModifier | string>) => {
    if (args.length) {
      const { elements, modifiers} = args.reduce((acc, v) => {
        if (typeof v === 'string') {
          acc.elements.push(v);
        } else if (typeof v === 'object' && !Array.isArray(v)) {
          acc.modifiers.push(v);
        }

        return acc;
      }, { elements: [] as string[], modifiers: [] as TBemNameGeneratorModifier[] });

      if (!elements.length) {
        const blockModifiers = modifiers.map(m => getModifiers(m, block)).join(' ');
        return `${block} ${blockModifiers}`;
      }

      return elements.map(e => {
        const elementName = `${block}__${e}`;
        const modifiersName = modifiers.map(m => getModifiers(m, elementName)).join(' ');
        return `${elementName} ${modifiersName}`.trim();
      }).join(' ');
    }

    return block;
  }

  return func;
}

export {
  bemNameGenerator,
}