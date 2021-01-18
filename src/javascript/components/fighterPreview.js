import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {
    const figterImage = createFighterImage(fighter);
    const fighterInfo = createDetailsCard(figter);
    fighterElement.append(fighterImage, fighterInfo);
  }
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name,
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

function createDetailsCard(fighter) {
  const info = createElement({
    tagName: 'div',
    className: 'fighter-preview___info',
  });

  const { source, _id, ...fighterDetails } = fighter;
  for (let property in fighterDetails) {
    const element = createElement({ tagName: 'p', className: `fighter-preview__${property}` });
    element.innerText = property + ' ' + fighterDetails[property];
    info.append(element);
  }

  return info;
}
