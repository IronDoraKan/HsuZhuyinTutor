/**
 * 許氏注音鍵盤 UI 互動邏輯與動態高亮 (js/keyboard_ui.js)
 */

class HsuKeyboardUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.activeKeys = new Set();
        this.targetKeys = new Set();
        this.initKeyboard();
    }

    initKeyboard() {
        if (!this.container) return;

        this.container.innerHTML = '';
        const keyboardWrapper = document.createElement('div');
        keyboardWrapper.className = 'hsu-keyboard-wrapper';

        // 定義標準 QWERTY 三排按鍵佈局
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];

        // 建立第一到三排
        rows.forEach((rowKeys, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = `keyboard-row row-${rowIndex + 1}`;

            rowKeys.forEach(keyChar => {
                const keyInfo = HsuMapping.LAYOUT.find(k => k.key === keyChar);
                if (keyInfo) {
                    const keyCap = this.createKeyCap(keyInfo);
                    rowDiv.appendChild(keyCap);
                }
            });

            keyboardWrapper.appendChild(rowDiv);
        });

        // 建立第四排 (Space bar - 一聲)
        const spaceRowDiv = document.createElement('div');
        spaceRowDiv.className = 'keyboard-row row-space';
        
        const spaceKeyCap = document.createElement('div');
        spaceKeyCap.className = 'keycap keycap-space cat-tone';
        spaceKeyCap.dataset.key = 'Space';
        spaceKeyCap.innerHTML = `
            <div class="key-letter">SPACE</div>
            <div class="key-zhuyin">一聲 ˉ</div>
            <div class="key-mnemonic">拇指按空白鍵打一聲</div>
        `;
        spaceRowDiv.appendChild(spaceKeyCap);
        keyboardWrapper.appendChild(spaceRowDiv);

        this.container.appendChild(keyboardWrapper);
    }

    createKeyCap(keyInfo) {
        const keyCap = document.createElement('div');
        keyCap.className = `keycap cat-${keyInfo.cat} finger-${keyInfo.finger}`;
        keyCap.dataset.key = keyInfo.key;

        const letter = document.createElement('div');
        letter.className = 'key-letter';
        letter.textContent = keyInfo.key;

        const zhuyin = document.createElement('div');
        zhuyin.className = 'key-zhuyin';
        zhuyin.textContent = keyInfo.zhuyin.join(' / ');

        const desc = document.createElement('div');
        desc.className = 'key-mnemonic';
        desc.textContent = keyInfo.desc;

        keyCap.appendChild(letter);
        keyCap.appendChild(zhuyin);
        keyCap.appendChild(desc);

        // 滑鼠 hover/click 事件
        keyCap.addEventListener('mouseenter', () => {
            if (window.appInstance && window.appInstance.showMnemonicCard) {
                window.appInstance.showMnemonicCard(keyInfo);
            }
        });

        return keyCap;
    }

    // 實體按鍵按下效果
    pressKey(key) {
        const normalizedKey = this.normalizeKey(key);
        const el = this.container.querySelector(`[data-key="${normalizedKey}"]`);
        if (el) {
            el.classList.add('is-pressed');
            setTimeout(() => el.classList.remove('is-pressed'), 180);
        }
    }

    // 提示使用者應該按哪一個鍵
    highlightTargetKeys(keys) {
        // 先清除前一次提示
        this.clearTargetHighlights();

        if (!keys || keys.length === 0) return;

        keys.forEach(k => {
            const normalizedKey = this.normalizeKey(k);
            const el = this.container.querySelector(`[data-key="${normalizedKey}"]`);
            if (el) {
                el.classList.add('is-target');
            }
        });
    }

    clearTargetHighlights() {
        const highlighted = this.container.querySelectorAll('.is-target');
        highlighted.forEach(el => el.classList.remove('is-target'));
    }

    // 轉化按鍵字元 (例如 'space' -> 'Space', 'a' -> 'A')
    normalizeKey(key) {
        if (!key) return '';
        if (key === ' ' || key.toLowerCase() === 'space') return 'Space';
        return key.toUpperCase();
    }
}

window.HsuKeyboardUI = HsuKeyboardUI;
