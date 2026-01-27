// Konami Code Game Loader - Pokemon-style JRPG

const konamiGame = {
  konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
  keyPresses: [],
  gameLoaded: false,

  init() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  },

  handleKeyPress(event) {
    this.keyPresses.push(event.code);
    if (this.keyPresses.length > this.konamiCode.length) {
      this.keyPresses.shift();
    }
    if (this.keyPresses.join(',') === this.konamiCode.join(',')) {
      this.activateGame();
      this.keyPresses = [];
    }
  },

  activateGame() {
    if (this.gameLoaded) return;
    this.gameLoaded = true;

    const gameContainer = document.createElement('div');
    gameContainer.id = 'konami-game-container';
    gameContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0a0e27;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      overflow: hidden;
    `;

    document.body.appendChild(gameContainer);
    this.game = new PokemonRPG(gameContainer, () => {
      this.gameLoaded = false;
      this.game = null;
    });
    this.game.start();
  }
};

class PokemonRPG {
  constructor(container, onClose) {
    this.container = container;
    this.onClose = onClose;
    this.running = false;
    
    // Game screen
    this.screenWidth = 540;
    this.screenHeight = 520;
    
    this.gameScreen = document.createElement('div');
    this.gameScreen.style.cssText = `
      position: relative;
      width: ${this.screenWidth}px;
      height: ${this.screenHeight}px;
      background: #0f1729;
      border: 12px solid #1a2332;
      border-radius: 8px;
      box-shadow: 
        0 30px 80px rgba(0,0,0,0.9), 
        inset 0 0 30px rgba(0,0,0,0.7),
        0 0 40px rgba(100, 150, 255, 0.2);
      overflow: hidden;
    `;
    container.appendChild(this.gameScreen);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.screenWidth;
    this.canvas.height = this.screenHeight;
    this.canvas.style.display = 'block';
    this.gameScreen.appendChild(this.canvas);

    // Load background image
    this.bgImage = new Image();
    this.bgImage.src = '/images/dark-background.jpg';

    // Load player image
    this.playerImage = new Image();
    this.playerImage.src = '/images/me.jpg';

    // Game state
    this.gameState = 'menu';
    this.floor = 1;
    this.maxFloor = 8;
    this.currentEnemy = null;
    this.selectedAction = 0;
    
    // Animation states
    this.playerAttackFrame = 0;
    this.enemyAttackFrame = 0;
    this.playerHitFrame = 0;
    this.enemyHitFrame = 0;
    
    // Player
    this.player = {
      hp: 60,
      maxHp: 60,
      mp: 30,
      maxMp: 30,
      atk: 10,
      def: 6,
      level: 1,
      exp: 0,
      gold: 0
    };

    // Abilities
    this.abilities = [
      { name: 'Attack', cost: 0, power: 1.0, type: 'phys' },
      { name: 'Charge', cost: 6, power: 1.6, type: 'phys' },
      { name: 'Magic', cost: 10, power: 1.8, type: 'mag' },
      { name: 'Heal', cost: 12, heal: 28, type: 'heal' }
    ];

    // Enemy templates
    this.enemyTemplates = [
      { name: 'Pip', emoji: '🟤', hp: 28, atk: 7, def: 2 },
      { name: 'Moss', emoji: '🟢', hp: 35, atk: 9, def: 4 },
      { name: 'Ember', emoji: '🔥', hp: 42, atk: 11, def: 5 },
      { name: 'Shadow', emoji: '🌑', hp: 52, atk: 13, def: 6 },
      { name: 'Storm', emoji: '⚡', hp: 65, atk: 15, def: 7 },
      { name: 'Titan', emoji: '💎', hp: 78, atk: 17, def: 9 },
      { name: 'Void', emoji: '💀', hp: 95, atk: 20, def: 11 },
      { name: 'Eternal', emoji: '👑', hp: 120, atk: 23, def: 13 }
    ];

    this.keys = {};
    this.battleLog = [];
    this.selectedAbility = 0;

    // Event listeners
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Escape') {
        e.preventDefault();
        this.close();
      }
      if (e.code === 'Space') {
        e.preventDefault();
        this.confirm();
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.moveSelection(-1);
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.moveSelection(1);
      }
    });

    this.canvas.addEventListener('click', () => this.confirm());
  }

  moveSelection(dir) {
    if (this.gameState === 'battle') {
      this.selectedAbility = (this.selectedAbility + dir + this.abilities.length) % this.abilities.length;
    }
  }

  confirm() {
    if (this.gameState === 'menu') {
      this.gameState = 'dungeon';
    } else if (this.gameState === 'dungeon') {
      this.startBattle();
    } else if (this.gameState === 'battle') {
      this.playerAction();
    } else if (this.gameState === 'victory') {
      if (this.floor >= this.maxFloor) {
        this.gameState = 'complete';
      } else {
        this.nextFloor();
      }
    } else if (this.gameState === 'complete' || this.gameState === 'defeat') {
      this.resetGame();
    }
  }

  startBattle() {
    const template = this.enemyTemplates[this.floor - 1];
    const scale = 1 + (this.floor - 1) * 0.2;
    
    this.currentEnemy = {
      name: template.name,
      emoji: template.emoji,
      hp: Math.floor(template.hp * scale),
      maxHp: Math.floor(template.hp * scale),
      atk: Math.floor(template.atk * scale),
      def: Math.floor(template.def * scale),
      exp: Math.floor(20 * this.floor),
      gold: Math.floor(15 * this.floor)
    };

    this.gameState = 'battle';
    this.battleLog = [];
    this.selectedAbility = 0;
    this.playerAttackFrame = 0;
    this.enemyAttackFrame = 0;
    this.playerHitFrame = 0;
    this.enemyHitFrame = 0;
  }

  playerAction() {
    const ability = this.abilities[this.selectedAbility];
    
    if (ability.cost > this.player.mp) {
      this.battleLog = ['Not enough MP!'];
      return;
    }

    this.player.mp -= ability.cost;
    this.playerAttackFrame = 1; // Start attack animation
    
    if (ability.type === 'heal') {
      const healed = Math.min(ability.heal, this.player.maxHp - this.player.hp);
      this.player.hp += healed;
      this.battleLog = [`Used ${ability.name}!`, `Healed ${healed} HP`];
    } else {
      const variance = 0.8 + Math.random() * 0.35;
      const damage = Math.max(1, Math.floor(this.player.atk * ability.power * variance - this.currentEnemy.def * 0.2));
      this.currentEnemy.hp -= damage;
      this.enemyHitFrame = 1;
      this.battleLog = [`${ability.name}!`, `${damage} Damage!`];
    }

    if (this.currentEnemy.hp <= 0) {
      this.winBattle();
      return;
    }

    setTimeout(() => this.enemyAction(), 1500);
  }

  enemyAction() {
    const variance = 0.75 + Math.random() * 0.45;
    const damage = Math.max(1, Math.floor(this.currentEnemy.atk * variance - this.player.def * 0.15));
    this.player.hp -= damage;
    
    this.enemyAttackFrame = 1; // Start attack animation
    this.playerHitFrame = 1;
    this.battleLog = [`${this.currentEnemy.name}`, `attacks! -${damage} HP`];
    this.player.mp = Math.min(this.player.maxMp, this.player.mp + 4);

    if (this.player.hp <= 0) {
      this.loseBattle();
    }
  }

  winBattle() {
    this.player.exp += this.currentEnemy.exp;
    this.player.gold += this.currentEnemy.gold;

    const expNeeded = this.player.level * 60;
    if (this.player.exp >= expNeeded) {
      this.player.level++;
      this.player.exp = 0;
      this.player.maxHp += 12;
      this.player.hp = this.player.maxHp;
      this.player.maxMp += 6;
      this.player.mp = this.player.maxMp;
      this.player.atk += 2;
      this.player.def += 1;
      this.battleLog = [`Level up to ${this.player.level}!`];
    } else {
      this.battleLog = [`Got ${this.currentEnemy.exp} exp!`];
    }

    this.gameState = 'victory';
  }

  loseBattle() {
    this.gameState = 'defeat';
  }

  nextFloor() {
    this.floor++;
    this.player.hp = Math.floor(this.player.maxHp * 0.6);
    this.player.mp = this.player.maxMp;
    this.gameState = 'dungeon';
    this.playerAttackFrame = 0;
    this.enemyAttackFrame = 0;
    this.playerHitFrame = 0;
    this.enemyHitFrame = 0;
  }

  resetGame() {
    this.floor = 1;
    this.player = {
      hp: 60,
      maxHp: 60,
      mp: 30,
      maxMp: 30,
      atk: 10,
      def: 6,
      level: 1,
      exp: 0,
      gold: 0
    };
    this.gameState = 'menu';
    this.battleLog = [];
    this.playerAttackFrame = 0;
    this.enemyAttackFrame = 0;
    this.playerHitFrame = 0;
    this.enemyHitFrame = 0;
  }

  getPlayerOffset() {
    let offsetX = 0;
    let offsetY = 0;
    
    if (this.playerAttackFrame > 0) {
      const progress = Math.min(this.playerAttackFrame / 15, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      offsetX = Math.sin(progress * Math.PI) * 25;
    }
    
    if (this.playerHitFrame > 0) {
      const shake = (Math.random() - 0.5) * 12;
      offsetX += shake;
      this.playerHitFrame -= 1;
    }
    
    return { x: offsetX, y: offsetY };
  }

  getEnemyOffset() {
    let offsetX = 0;
    let offsetY = 0;
    
    if (this.enemyAttackFrame > 0) {
      const progress = Math.min(this.enemyAttackFrame / 15, 1);
      offsetX = -Math.sin(progress * Math.PI) * 25;
    }
    
    if (this.enemyHitFrame > 0) {
      const shake = (Math.random() - 0.5) * 12;
      offsetX += shake;
      this.enemyHitFrame -= 1;
    }
    
    return { x: offsetX, y: offsetY };
  }

  drawBattleBackground() {
    // Draw background
    if (this.bgImage.complete) {
      this.ctx.drawImage(this.bgImage, 0, 0, this.screenWidth, 200);
    } else {
      const grad = this.ctx.createLinearGradient(0, 0, 0, 200);
      grad.addColorStop(0, '#2d1f4e');
      grad.addColorStop(1, '#1a1a3e');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.screenWidth, 200);
    }

    // Darker overlay
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
    this.ctx.fillRect(0, 0, this.screenWidth, 200);
  }

  draw() {
    this.ctx.fillStyle = '#0f1729';
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    if (this.gameState === 'menu') {
      this.drawMenu();
    } else if (this.gameState === 'dungeon') {
      this.drawDungeon();
    } else if (this.gameState === 'battle') {
      this.drawBattle();
    } else if (this.gameState === 'victory') {
      this.drawVictory();
    } else if (this.gameState === 'complete') {
      this.drawComplete();
    } else if (this.gameState === 'defeat') {
      this.drawDefeat();
    }

    // Update animation frames
    if (this.playerAttackFrame > 0) this.playerAttackFrame++;
    if (this.playerAttackFrame > 20) this.playerAttackFrame = 0;
    
    if (this.enemyAttackFrame > 0) this.enemyAttackFrame++;
    if (this.enemyAttackFrame > 20) this.enemyAttackFrame = 0;
  }

  drawMenu() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.screenHeight);
    grad.addColorStop(0, '#1a1f3a');
    grad.addColorStop(1, '#0f1729');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = '#00d9ff';
    this.ctx.font = 'bold 28px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('DUNGEON QUEST', this.screenWidth / 2, 100);

    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '14px Arial';
    this.ctx.fillText('A hidden adventure awaits...', this.screenWidth / 2, 160);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = '14px Arial';
    this.ctx.fillText('SPACE to start', this.screenWidth / 2, 260);
    
    this.ctx.fillStyle = '#ff6b9d';
    this.ctx.fillText('ESC to quit', this.screenWidth / 2, 300);
  }

  drawDungeon() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.screenHeight);
    grad.addColorStop(0, '#1a1f3a');
    grad.addColorStop(1, '#0f1729');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = '#00d9ff';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`FLOOR ${this.floor}`, this.screenWidth / 2, 80);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(this.enemyTemplates[this.floor - 1].emoji, this.screenWidth / 2, 160);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(this.enemyTemplates[this.floor - 1].name, this.screenWidth / 2, 220);

    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Press SPACE to battle', this.screenWidth / 2, 300);
  }

  drawBattle() {
    this.drawBattleBackground();

    this.drawStatsBar();

    // Enemy section
    const enemyOffset = this.getEnemyOffset();
    
    this.ctx.fillStyle = '#00d9ff';
    this.ctx.font = 'bold 14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.currentEnemy.name, this.screenWidth / 2 + enemyOffset.x, 55);

    this.ctx.font = '48px Arial';
    this.ctx.fillText(this.currentEnemy.emoji, this.screenWidth / 2 + enemyOffset.x, 120);

    // Enemy HP
    const eHpPercent = Math.max(0, this.currentEnemy.hp / this.currentEnemy.maxHp);
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(120, 135, 300, 14);
    this.ctx.fillStyle = eHpPercent > 0.3 ? '#00ff88' : '#ff6b9d';
    this.ctx.fillRect(120, 135, 300 * eHpPercent, 14);
    this.ctx.strokeStyle = '#00d9ff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(120, 135, 300, 14);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '10px Arial';
    this.ctx.fillText(`${Math.max(0, this.currentEnemy.hp)}/${this.currentEnemy.maxHp}`, this.screenWidth / 2, 156);

    // Player section
    const playerOffset = this.getPlayerOffset();
    const playerY = 250;
    
    // Draw player image with rounded corners
    if (this.playerImage.complete && this.playerImage.naturalWidth > 0) {
      this.ctx.save();
      this.ctx.beginPath();
      const radius = 15;
      const x = this.screenWidth / 2 - 50 + playerOffset.x;
      const y = playerY - 50;
      const w = 100;
      const h = 100;
      
      this.ctx.moveTo(x + radius, y);
      this.ctx.lineTo(x + w - radius, y);
      this.ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      this.ctx.lineTo(x + w, y + h - radius);
      this.ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      this.ctx.lineTo(x + radius, y + h);
      this.ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      this.ctx.lineTo(x, y + radius);
      this.ctx.quadraticCurveTo(x, y, x + radius, y);
      this.ctx.closePath();
      this.ctx.clip();
      
      this.ctx.drawImage(this.playerImage, x, y, w, h);
      this.ctx.restore();
    }

    // Player HP bar
    const pHpPercent = this.player.hp / this.player.maxHp;
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(70, 335, 240, 12);
    this.ctx.fillStyle = pHpPercent > 0.3 ? '#00ff88' : '#ff6b9d';
    this.ctx.fillRect(70, 335, 240 * pHpPercent, 12);
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(70, 335, 240, 12);

    // Player MP bar
    const pMpPercent = this.player.mp / this.player.maxMp;
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(70, 352, 240, 10);
    this.ctx.fillStyle = '#00d9ff';
    this.ctx.fillRect(70, 352, 240 * pMpPercent, 10);
    this.ctx.strokeStyle = '#00d9ff';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(70, 352, 240, 10);

    // Actions menu
    const startY = 385;
    this.ctx.fillStyle = '#ffaa00';
    this.ctx.font = 'bold 12px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('SELECT MOVE:', 20, startY);

    this.abilities.forEach((ability, idx) => {
      const y = startY + 22 + idx * 22;
      const isSelected = idx === this.selectedAbility;
      const canUse = ability.cost <= this.player.mp;

      if (isSelected) {
        this.ctx.fillStyle = 'rgba(0, 217, 255, 0.25)';
        this.ctx.fillRect(10, y - 12, 520, 20);
        this.ctx.strokeStyle = '#00d9ff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(10, y - 12, 520, 20);
      }

      this.ctx.font = '11px Arial';
      this.ctx.fillStyle = canUse ? '#fff' : '#555';
      this.ctx.fillText('> ', 20, y);
      this.ctx.fillText(ability.name, 40, y);

      if (ability.type === 'heal') {
        this.ctx.fillText(`(${ability.heal} HP)`, 250, y);
      } else {
        this.ctx.fillText(`(${ability.cost} MP)`, 250, y);
      }
    });
  }

  drawStatsBar() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.ctx.fillRect(0, 0, this.screenWidth, 30);
    
    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = '11px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`LV ${this.player.level}`, 15, 18);
    this.ctx.fillText(`G ${this.player.gold}`, 120, 18);
    this.ctx.fillText(`F ${this.floor}/${this.maxFloor}`, 220, 18);
    
    this.ctx.fillStyle = '#00d9ff';
    this.ctx.fillText(`EXP ${this.player.exp}`, 360, 18);
  }

  drawVictory() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.screenHeight);
    grad.addColorStop(0, '#1a3a1a');
    grad.addColorStop(1, '#0f1729');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 28px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('VICTORY!', this.screenWidth / 2, 120);

    this.ctx.fillStyle = '#ffaa00';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`+${this.currentEnemy.exp} EXP`, this.screenWidth / 2, 190);
    this.ctx.fillText(`+${this.currentEnemy.gold}G`, this.screenWidth / 2, 230);

    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('SPACE to continue', this.screenWidth / 2, 310);
  }

  drawComplete() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.screenHeight);
    grad.addColorStop(0, '#1a3a2e');
    grad.addColorStop(1, '#0f1729');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('DUNGEON CLEARED!', this.screenWidth / 2, 120);

    this.ctx.fillStyle = '#ffaa00';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`FINAL LEVEL: ${this.player.level}`, this.screenWidth / 2, 190);
    this.ctx.fillText(`FINAL GOLD: ${this.player.gold}G`, this.screenWidth / 2, 230);

    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('SPACE to menu', this.screenWidth / 2, 310);
  }

  drawDefeat() {
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.screenHeight);
    grad.addColorStop(0, '#3a1a1a');
    grad.addColorStop(1, '#0f1729');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = '#ff6b9d';
    this.ctx.font = 'bold 28px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('DEFEATED', this.screenWidth / 2, 120);

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Floor Reached: ${this.floor}`, this.screenWidth / 2, 190);
    this.ctx.fillText(`Final Level: ${this.player.level}`, this.screenWidth / 2, 230);

    this.ctx.fillStyle = '#aaa';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('SPACE for menu', this.screenWidth / 2, 310);
  }

  start() {
    this.running = true;
    const gameLoop = () => {
      if (!this.running) return;
      this.draw();
      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }

  close() {
    this.running = false;
    this.container.remove();
    if (this.onClose) this.onClose();
  }
}

// Initialize
konamiGame.init();
