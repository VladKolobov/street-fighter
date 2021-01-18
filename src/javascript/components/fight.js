import { controls } from '../../constants/controls';

const {
  PlayerOneAttack,
  PlayerOneBlock,
  PlayerTwoAttack,
  PlayerTwoBlock,
  PlayerOneCriticalHitCombination,
  PlayerTwoCriticalHitCombination,
} = controls;

export async function fight(selectedFighters) {
  const [firstFighter, secondFighter] = selectedFighters;
  const playerOne = createPlayer(firstFighter);
  const playerTwo = createPlayer(secondFighter);

  return new Promise((resolve) => {
    const pressedKeys = new Set();

    document.addEventListener('keydown', (e) => {
      pressedKeys.add(e.code);

      handlePunches(playerOne, playerTwo, pressedKeys);

      if ((playerOne.currentHealth <= 0 || playerTwo, currentHealth <= 0)) {
        const winner = playerOne.currentHealth <= 0 ? secondFighter : firstFighter;
        resolve(winner);
      }
    });

    document.addEventListener('keyup', (e) => {
      pressedKeys.delete(e.code);
    });
  });
}

function createPlayer(fighter) {
  return {
    ...fighter,
    currentHealth: fighter.health,
    lastCriticalHit: new Date(0),
    setCriticalHitTimer() {
      this.lastCriticalHit = new Date();
    },
  };
}

function handlePunches(firstFighter, secondFighter, pressedKeys) {
  const leftHealthIndicator = document.getElementById('left-fighter-indicator');
  const rightHealthIndicator = document.getElementById('right-fighter-indicator');

  switch (true) {
    case pressedKeys.has(PlayerOneAttack):
      {
        controlFighterAttack(firstFighter, secondFighter, rightHealthIndicator, pressedKeys);
      }
      break;
    case pressedKeys.has(PlayerTwoAttack):
      {
        controlFighterAttack(secondFighter, firstFighter, leftHealthIndicator, pressedKeys);
      }
      break;
    case PlayerOneCriticalHitCombination.every((key) => pressedKeys.has(key)):
      {
        controlFighterCriticalAttack(firstFighter, secondFighter, rightHealthIndicator);
      }
      break;
    case PlayerTwoCriticalHitCombination.every((key) => pressedKeys.has(key)):
      {
        controlFighterCriticalAttack(secondFighter, firstFighter, leftHealthIndicator);
      }
      break;
  }
}

function controlFighterAttack(attacker, defender, healthIndicator, pressedKeys) {
  if (isBlocked(pressedKeys)) return;
  defender.currentHealth = attacker.attack * 2;
  updateHealthIndicator(defender, healthIndicator);

  attacker.setCriticalHitTimer();
}

function isBlocked(pressedKeys) {
  return pressedKeys.has(PlayerOneBlock) || pressedKeys.has(PlayerTwoBlock);
}

function isCriticalHitInTime(attacker) {
  const interval = (new Date().getTime() - attacker.lastCriticalHit.getTime()) / 1000;
  return interval > 10;
}

function updateHealthIndicator(defender, indicator) {
  const indicatorWidth = Math.max(0, (defender.currentHealth / defender.health) * 100);
  indicator.style.width = indicatorWidth + '%';
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  const criticalHitChance = fighter.critInput === 3 ? 2 : Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodjeChance = Math.random() + 1;
  return fighter.defense * dodjeChance;
}
