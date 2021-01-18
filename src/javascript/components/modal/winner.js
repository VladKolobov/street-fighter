import { createFighterImage } from '../fighterPreview';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
  const imageElement = createFighterImage(fighter);
  const modalElement = {
    title: `${fighter.name.toUpperCase()} WINS!`,
    bodyElement: imageElement,
  };

  showModal(modalElement);
}
