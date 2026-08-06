/**
 * 許氏注音練習器 主邏輯引擎 (js/app.js)
 * 含 Bug 1 (關卡四句子拼音解析) 修復與 Requirement 2 (歷史成績與歸零清空) 功能
 */

class HsuTutorApp {
    constructor() {
        this.keyboard = new HsuKeyboardUI('keyboard-container');
        this.sound = new SoundSystem();

        // 狀態變數
        this.currentLayoutMode = 'hsu'; // 'hsu' 或 'dachen'
        this.currentLevel = 'level1';
        this.currentLessonIdx = 0;
        this.currentLesson = null;
        this.currentItemIdx = 0;
        
        // 句子/字元級別細部輸入控制
        this.currentCharItems = [];    // 當前題目拆解後之字元物件陣列 [{char, zhuyin, keys}]
        this.currentCharIdx = 0;       // 當前輸入到第幾個中文字/標點
        this.currentKeyStepIdx = 0;    // 當前中文字輸入到第幾個按鍵 (例如 ㄒㄩˇ 中的 ㄩ)
        this.targetKeys = [];          // 當前中文字需要按下的按鍵陣列

        // 統計指標
        this.startTime = null;
        this.totalKeystrokes = 0;
        this.correctKeystrokes = 0;
        this.errorKeystrokes = 0;
        this.completedWordsCount = 0;
        this.combo = 0;
        this.maxCombo = 0;

        // DOM 元素引用
        this.dom = {
            layoutModeSelect: document.getElementById('layout-mode-select'),
            levelSelect: document.getElementById('level-select'),
            subLessonSelect: document.getElementById('sub-lesson-select'),
            targetDisplay: document.getElementById('target-display'),
            zhuyinHint: document.getElementById('zhuyin-hint'),
            keySequenceContainer: document.getElementById('key-sequence-container'),
            mnemonicCard: document.getElementById('mnemonic-card'),
            mnemonicContent: document.getElementById('mnemonic-content'),
            statWpm: document.getElementById('stat-wpm'),
            statCpm: document.getElementById('stat-cpm'),
            statAccuracy: document.getElementById('stat-accuracy'),
            statCombo: document.getElementById('stat-combo'),
            progressFill: document.getElementById('progress-fill'),
            soundBtn: document.getElementById('sound-toggle-btn'),
            restartBtn: document.getElementById('restart-btn'),
            
            // 自訂文章 Modal
            customTextModal: document.getElementById('custom-modal'),
            customTextInput: document.getElementById('custom-text-input'),
            customModalBtn: document.getElementById('custom-modal-btn'),
            customModalClose: document.getElementById('custom-modal-close'),
            customModalSave: document.getElementById('custom-modal-save'),

            // 歷史成績 Modal
            historyModalBtn: document.getElementById('history-modal-btn'),
            historyModal: document.getElementById('history-modal'),
            historyModalClose: document.getElementById('history-modal-close'),
            historyTableBody: document.getElementById('history-table-body'),
            historySummary: document.getElementById('history-summary'),
            historyClearBtn: document.getElementById('history-clear-btn')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.populateLevelSelect();
        this.loadLesson('level1', 0);
        window.appInstance = this;
    }

    bindEvents() {
        // 全域鍵盤按下監聽
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // 鍵盤模式變更 (許氏 vs 大千)
        if (this.dom.layoutModeSelect) {
            this.dom.layoutModeSelect.addEventListener('change', (e) => {
                this.currentLayoutMode = e.target.value;
                this.keyboard.initKeyboard(this.currentLayoutMode);
                this.renderCurrentItem();
                if (document.activeElement) document.activeElement.blur();
            });
        }

        // 選擇選單變更
        this.dom.levelSelect.addEventListener('change', (e) => {
            this.currentLevel = e.target.value;
            this.populateSubLessons(this.currentLevel);
            this.loadLesson(this.currentLevel, 0);
        });

        this.dom.subLessonSelect.addEventListener('change', (e) => {
            const idx = parseInt(e.target.value, 10);
            this.loadLesson(this.currentLevel, idx);
        });

        // 按鈕事件
        this.dom.restartBtn.addEventListener('click', () => this.restartLesson());

        this.dom.soundBtn.addEventListener('click', () => {
            const muted = this.sound.toggleMute();
            this.dom.soundBtn.textContent = muted ? '🔇 音效：關' : '🔊 音效：開';
            this.dom.soundBtn.classList.toggle('muted', muted);
        });

        // 自訂文章彈窗
        this.dom.customModalBtn.addEventListener('click', () => {
            this.dom.customTextModal.classList.add('is-open');
        });
        this.dom.customModalClose.addEventListener('click', () => {
            this.dom.customTextModal.classList.remove('is-open');
        });
        this.dom.customModalSave.addEventListener('click', () => {
            this.loadCustomArticle();
        });

        // 歷史紀錄彈窗
        this.dom.historyModalBtn.addEventListener('click', () => {
            this.renderHistoryUI();
            this.dom.historyModal.classList.add('is-open');
        });
        this.dom.historyModalClose.addEventListener('click', () => {
            this.dom.historyModal.classList.remove('is-open');
        });
        this.dom.historyClearBtn.addEventListener('click', () => {
            if (confirm('確定要清空並歸零所有的歷史練習紀錄嗎？')) {
                this.clearHistoryRecords();
            }
        });
    }

    populateLevelSelect() {
        this.dom.levelSelect.innerHTML = `
            <option value="level1">關卡 1：鍵位與口訣特訓</option>
            <option value="level2">關卡 2：聲韻組合拼音</option>
            <option value="level3">關卡 3：高頻常用詞彙</option>
            <option value="level4">關卡 4：文章短句盲打</option>
        `;
        this.populateSubLessons('level1');
    }

    populateSubLessons(levelKey) {
        const lessons = HSU_LESSONS[levelKey] || [];
        this.dom.subLessonSelect.innerHTML = lessons.map((l, i) =>
            `<option value="${i}">${l.title}</option>`
        ).join('');
    }

    loadLesson(levelKey, lessonIdx) {
        this.currentLevel = levelKey;
        this.currentLessonIdx = lessonIdx;
        const lessons = HSU_LESSONS[levelKey];
        if (!lessons || !lessons[lessonIdx]) return;

        this.currentLesson = lessons[lessonIdx];
        this.currentItemIdx = 0;
        this.currentCharIdx = 0;
        this.currentKeyStepIdx = 0;
        this.resetStats();

        this.renderCurrentItem();
    }

    resetStats() {
        this.startTime = null;
        this.totalKeystrokes = 0;
        this.correctKeystrokes = 0;
        this.errorKeystrokes = 0;
        this.completedWordsCount = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.updateStatsUI();
    }

    restartLesson() {
        this.currentItemIdx = 0;
        this.currentCharIdx = 0;
        this.currentKeyStepIdx = 0;
        this.resetStats();
        this.renderCurrentItem();
    }

    renderCurrentItem() {
        if (!this.currentLesson || !this.currentLesson.items) return;

        const items = this.currentLesson.items;
        if (this.currentItemIdx >= items.length) {
            // 完成本關卡！
            this.finishLesson();
            return;
        }

        const item = items[this.currentItemIdx];

        // 解析當前題目（單字、詞彙、或長句）
        if (item.sentence || item.phrase) {
            // 長句或短詞
            this.currentCharItems = HsuMapping.parseSentenceToCharItems(item.sentence || item.phrase, item.guide, this.currentLayoutMode);
        } else if (item.char || item.text) {
            // 單字
            const charStr = item.char || item.text;
            if (item.keys && this.currentLayoutMode === 'hsu') {
                // 已指定按鍵 (如 Level 1 單鍵) 且為許氏模式
                const keyObjs = item.keys.map(k => ({
                    key: k,
                    symbol: k === 'Space' ? '一聲 (Space)' : (ZHUYIN_META[item.zhuyin] ? ZHUYIN_META[item.zhuyin].desc : k)
                }));
                this.currentCharItems = [{
                    char: charStr,
                    zhuyin: item.zhuyin || '',
                    keys: keyObjs
                }];
            } else {
                const keys = HsuMapping.parseZhuyinToHsuKeys(item.zhuyin || charStr, this.currentLayoutMode);
                this.currentCharItems = [{
                    char: charStr,
                    zhuyin: item.zhuyin || charStr,
                    keys: keys
                }];
            }
        }

        // 如果是新題目，歸零字元索引
        if (this.currentCharIdx >= this.currentCharItems.length) {
            this.currentCharIdx = 0;
        }

        this.renderCurrentCharacterState();

        // 更新關卡進度條
        const progressPct = ((this.currentItemIdx) / items.length) * 100;
        this.dom.progressFill.style.width = `${progressPct}%`;
    }

    renderCurrentCharacterState() {
        if (!this.currentCharItems || this.currentCharItems.length === 0) return;

        const currCharObj = this.currentCharItems[this.currentCharIdx];
        this.targetKeys = currCharObj.keys || [];

        // 渲染題目主要文字（整句 / 整詞，並將當前輸入的字高亮）
        const item = this.currentLesson.items[this.currentItemIdx];
        const fullText = item.sentence || item.phrase || item.text || item.char || '';

        // 動態調整 targetDisplay 的字體大小以利閱讀
        const totalChars = this.currentCharItems.length;
        if (totalChars > 30) {
            this.dom.targetDisplay.style.fontSize = '26px';
        } else if (totalChars > 18) {
            this.dom.targetDisplay.style.fontSize = '36px';
        } else {
            this.dom.targetDisplay.style.fontSize = '48px';
        }

        let htmlText = '';
        if (this.currentCharItems.length > 1) {
            this.currentCharItems.forEach((cObj, idx) => {
                if (idx < this.currentCharIdx) {
                    htmlText += `<span style="color: #10b981; opacity: 0.5;">${cObj.char}</span>`;
                } else if (idx === this.currentCharIdx) {
                    htmlText += `<span class="is-current-char" style="color: #f43f5e; text-decoration: underline; font-size: 1.1em; background: rgba(244, 63, 94, 0.15); border-radius: 4px; padding: 0 2px;">${cObj.char}</span>`;
                } else {
                    htmlText += `<span style="color: #ffffff;">${cObj.char}</span>`;
                }
            });
            this.dom.targetDisplay.innerHTML = htmlText;
        } else {
            this.dom.targetDisplay.textContent = fullText;
        }

        // 顯示當前字的注音
        this.dom.zhuyinHint.textContent = currCharObj.zhuyin ? `[ ${currCharObj.char} ] 注音：${currCharObj.zhuyin}` : (item.note || '');

        // 渲染底部所需按鍵步驟
        this.renderKeySequence();

        // 鍵盤提示高亮下一個要按的鍵
        if (this.targetKeys.length > this.currentKeyStepIdx) {
            const nextKey = this.targetKeys[this.currentKeyStepIdx].key;
            this.keyboard.highlightTargetKeys([nextKey]);

            // 自動更新動態口訣卡片
            const isDachen = this.currentLayoutMode === 'dachen';
            const layoutData = isDachen ? HsuMapping.DACHEN_LAYOUT : HsuMapping.LAYOUT;
            const keyInfo = layoutData.find(k => k.key === (nextKey === 'Space' ? 'Space' : nextKey.toUpperCase()));
            if (keyInfo) this.showMnemonicCard(keyInfo);
        }
    }

    renderKeySequence() {
        this.dom.keySequenceContainer.innerHTML = '';
        this.targetKeys.forEach((kObj, idx) => {
            const stepBox = document.createElement('div');
            stepBox.className = 'key-step-box';
            if (idx === this.currentKeyStepIdx) {
                stepBox.classList.add('is-current');
            } else if (idx < this.currentKeyStepIdx) {
                stepBox.classList.add('is-done');
            }
            stepBox.innerHTML = `
                <div class="step-key">${kObj.key}</div>
                <div class="step-symbol">${kObj.symbol || ''}</div>
            `;
            this.dom.keySequenceContainer.appendChild(stepBox);
        });
    }

    handleKeyDown(e) {
        // 忽略功能鍵 (Alt, Ctrl, Tab 等)
        if (e.altKey || e.ctrlKey || e.metaKey || e.key === 'Tab') return;
        if (this.dom.customTextModal.classList.contains('is-open')) return;
        if (this.dom.historyModal.classList.contains('is-open')) return;

        // 防止空白鍵 (Space) 觸發瀏覽器捲動或觸發當前 Focus 按鈕的預設點擊事件
        if (e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
        }

        // 移除按鈕焦點，防止空白鍵或 Enter 觸發按鈕重複點擊
        if (document.activeElement && (document.activeElement.tagName === 'BUTTON' || document.activeElement.tagName === 'SELECT')) {
            document.activeElement.blur();
        }

        let pressedKey = e.key;
        if (pressedKey === ' ') pressedKey = 'Space';

        // 動態鍵盤視覺高亮
        this.keyboard.pressKey(pressedKey);

        if (!this.targetKeys || this.targetKeys.length === 0) return;

        // 第一次按鍵時啟動計時器
        if (!this.startTime) {
            this.startTime = new Date();
        }

        this.totalKeystrokes++;

        const currentTarget = this.targetKeys[this.currentKeyStepIdx];
        const targetKey = currentTarget.key;

        // 比對按鍵 (不區分大小寫)
        if (pressedKey.toUpperCase() === targetKey.toUpperCase()) {
            // 打對了！
            this.sound.playKeyClick();
            this.correctKeystrokes++;
            this.combo++;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;

            this.currentKeyStepIdx++;

            // 如果當前字/標點的所有按鍵均輸入完畢
            if (this.currentKeyStepIdx >= this.targetKeys.length) {
                this.completedWordsCount++;
                this.currentCharIdx++;
                this.currentKeyStepIdx = 0;

                // 如果整句/整題所有字都輸入完畢
                if (this.currentCharIdx >= this.currentCharItems.length) {
                    this.currentItemIdx++;
                    this.currentCharIdx = 0;
                    this.renderCurrentItem();
                } else {
                    // 移至下一個字
                    this.renderCurrentCharacterState();
                }
            } else {
                // 移動到下一個按鍵步驟
                this.renderKeySequence();
                const nextKey = this.targetKeys[this.currentKeyStepIdx].key;
                this.keyboard.highlightTargetKeys([nextKey]);

                const keyInfo = HsuMapping.LAYOUT.find(k => k.key === (nextKey === 'Space' ? 'Space' : nextKey.toUpperCase()));
                if (keyInfo) this.showMnemonicCard(keyInfo);
            }
        } else {
            // 打錯了！
            this.sound.playErrorBuzzer();
            this.errorKeystrokes++;
            this.combo = 0;
            this.shakeTargetDisplay();
        }

        this.updateStatsUI();
    }

    shakeTargetDisplay() {
        this.dom.targetDisplay.classList.add('is-error');
        setTimeout(() => this.dom.targetDisplay.classList.remove('is-error'), 300);
    }

    updateStatsUI() {
        const stats = this.calculateStats();

        this.dom.statWpm.textContent = stats.wpm;
        this.dom.statCpm.textContent = stats.cpm;
        this.dom.statAccuracy.textContent = `${stats.accuracy}%`;
        this.dom.statCombo.textContent = this.combo;
    }

    calculateStats() {
        const accuracy = this.totalKeystrokes > 0 ?
            Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100) : 100;

        let wpm = 0;
        let cpm = 0;
        let elapsedSeconds = 0;

        if (this.startTime) {
            elapsedSeconds = Math.round((new Date() - this.startTime) / 1000);
            const elapsedMinutes = elapsedSeconds / 60;
            if (elapsedMinutes > 0) {
                cpm = Math.round(this.correctKeystrokes / elapsedMinutes);
                wpm = Math.round(this.completedWordsCount / elapsedMinutes);
            }
        }

        return { accuracy, wpm, cpm, elapsedSeconds };
    }

    showMnemonicCard(keyInfo) {
        if (!keyInfo) return;
        const modeTitle = this.currentLayoutMode === 'dachen' ? '大千標準鍵盤' : '許氏注音鍵盤';
        const zhuyinStr = Array.isArray(keyInfo.zhuyin) ? keyInfo.zhuyin.join(' / ') : keyInfo.zhuyin;
        this.dom.mnemonicContent.innerHTML = `
            <div class="card-header">
                <span class="badge cat-${keyInfo.cat || 'phonetic'}">${modeTitle}</span>
                <span class="card-key">${keyInfo.key} 鍵 ➔ ${zhuyinStr}</span>
            </div>
            <div class="card-body">${keyInfo.mnemonic || keyInfo.desc || '鍵盤按鍵與注音對照'}</div>
        `;
    }

    finishLesson() {
        this.sound.playSuccessChime();
        this.dom.progressFill.style.width = '100%';

        const stats = this.calculateStats();

        // 儲存到歷史成績紀錄
        this.saveRecordToHistory(stats);

        this.dom.targetDisplay.innerHTML = `<span style="color:#10b981;">🎉 恭喜完成本單元！</span>`;
        this.dom.zhuyinHint.textContent = `最終正確率 ${stats.accuracy}% | WPM: ${stats.wpm} | 連擊紀錄 ${this.maxCombo} 次 | 成績已自動儲存`;
        this.dom.keySequenceContainer.innerHTML = '';
        this.keyboard.clearTargetHighlights();
    }

    // --------------------------------------------------------------------------
    // 歷史紀錄儲存與清空歸零管理 (Requirement 2)
    // --------------------------------------------------------------------------
    getHistoryRecords() {
        try {
            const raw = localStorage.getItem('hsu_zhuyin_history');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    saveRecordToHistory(stats) {
        const records = this.getHistoryRecords();
        const levelTitle = this.dom.levelSelect.options[this.dom.levelSelect.selectedIndex].text;
        const subTitle = this.dom.subLessonSelect.options[this.dom.subLessonSelect.selectedIndex].text;
        const layoutTitle = this.currentLayoutMode === 'dachen' ? '大千標準鍵盤' : '許氏注音鍵盤';

        const newRecord = {
            id: Date.now(),
            date: new Date().toLocaleString('zh-TW', { hour12: false }),
            layoutMode: this.currentLayoutMode,
            layoutTitle: layoutTitle,
            level: `${levelTitle} - ${subTitle}`,
            wpm: stats.wpm,
            cpm: stats.cpm,
            accuracy: stats.accuracy,
            maxCombo: this.maxCombo,
            timeSec: stats.elapsedSeconds
        };

        records.unshift(newRecord); // 最新的排前面
        if (records.length > 100) records.pop(); // 最多保留 100 筆

        localStorage.setItem('hsu_zhuyin_history', JSON.stringify(records));
    }

    renderHistoryUI() {
        const records = this.getHistoryRecords();
        if (records.length === 0) {
            this.dom.historyTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: var(--text-muted); padding: 20px;">尚無練習紀錄。趕快開始練習吧！</td></tr>`;
            this.dom.historySummary.innerHTML = '總練習次數：0 次 | 最高 WPM：0 | 平均正確率：0%';
            return;
        }

        // 計算摘要統計
        let maxWpm = 0;
        let totalAcc = 0;
        records.forEach(r => {
            if (r.wpm > maxWpm) maxWpm = r.wpm;
            totalAcc += r.accuracy;
        });
        const avgAcc = Math.round(totalAcc / records.length);

        this.dom.historySummary.innerHTML = `
            <strong>總練習次數：</strong>${records.length} 次 &nbsp;|&nbsp;
            <strong>最高速率：</strong>${maxWpm} WPM &nbsp;|&nbsp;
            <strong>平均正確率：</strong>${avgAcc}%
        `;

        // 渲染表格 (包含鍵盤模式 Badge)
        this.dom.historyTableBody.innerHTML = records.map(r => {
            const isDachen = r.layoutMode === 'dachen' || (r.layoutTitle && r.layoutTitle.includes('大千'));
            const modeBadge = isDachen ?
                `<span style="background: rgba(139, 92, 246, 0.2); color: #c084fc; border: 1px solid rgba(139, 92, 246, 0.4); padding: 2px 8px; border-radius: 12px; font-weight: 700; font-size: 12px;">大千鍵盤</span>` :
                `<span style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.4); padding: 2px 8px; border-radius: 12px; font-weight: 700; font-size: 12px;">許氏鍵盤</span>`;

            return `
                <tr>
                    <td>${r.date}</td>
                    <td>${modeBadge}</td>
                    <td>${r.level}</td>
                    <td><strong style="color: #10b981;">${r.wpm}</strong></td>
                    <td>${r.cpm}</td>
                    <td>${r.accuracy}%</td>
                    <td>${r.maxCombo}</td>
                    <td>${r.timeSec}s</td>
                </tr>
            `;
        }).join('');
    }

    clearHistoryRecords() {
        localStorage.removeItem('hsu_zhuyin_history');
        this.renderHistoryUI();
        alert('所有歷史成績紀錄已成功歸零清空！');
    }

    splitTextToSentences(text) {
        if (!text) return [];

        const normalized = text.trim();
        if (!normalized) return [];

        // 依主要的句末標點 (。！？；\n…) 切分，且標點保留在該句句尾
        const primaryChunks = normalized.split(/(?<=[。！？；\n…])/).map(s => s.trim()).filter(s => s.length > 0);

        let sentences = [];

        primaryChunks.forEach(chunk => {
            if (chunk.length <= 30) {
                sentences.push(chunk);
            } else {
                // 若單句超過 30 字，嘗試依逗號、頓號 (，、,) 二次切分，並讓標點留在句尾
                const subChunks = chunk.split(/(?<=[，、,])/).map(s => s.trim()).filter(s => s.length > 0);
                let buf = '';
                subChunks.forEach(sub => {
                    buf += sub;
                    if (buf.length >= 15) {
                        sentences.push(buf);
                        buf = '';
                    }
                });
                if (buf.length > 0) {
                    sentences.push(buf);
                }
            }
        });

        // 萬一文章完全沒有標點符號且單句極長，強制依每 22 字切割
        const finalSentences = [];
        sentences.forEach(s => {
            if (s.length <= 40) {
                finalSentences.push(s);
            } else {
                for (let i = 0; i < s.length; i += 22) {
                    finalSentences.push(s.substring(i, i + 22));
                }
            }
        });

        return finalSentences.filter(s => s.trim().length > 0).map(s => ({ sentence: s.trim() }));
    }

    loadCustomArticle() {
        const text = this.dom.customTextInput.value.trim();
        if (!text) return;

        const items = this.splitTextToSentences(text);
        if (items.length === 0) return;

        const customLesson = {
            id: 'custom_article_' + Date.now(),
            title: `📝 自訂文章 (共 ${items.length} 句)`,
            desc: '使用者自訂輸入文章',
            items: items
        };

        const existingIdx = HSU_LESSONS.level4.findIndex(l => l.id && l.id.startsWith('custom_article_'));
        if (existingIdx !== -1) {
            HSU_LESSONS.level4[existingIdx] = customLesson;
        } else {
            HSU_LESSONS.level4.push(customLesson);
        }

        const targetIdx = HSU_LESSONS.level4.findIndex(l => l.id === customLesson.id);

        this.populateSubLessons('level4');
        this.dom.levelSelect.value = 'level4';
        this.dom.subLessonSelect.value = targetIdx !== -1 ? targetIdx : HSU_LESSONS.level4.length - 1;
        this.loadLesson('level4', parseInt(this.dom.subLessonSelect.value, 10));

        this.dom.customTextModal.classList.remove('is-open');
        if (document.activeElement) document.activeElement.blur();
    }
}

// 當 DOM 載入完畢後初始化
document.addEventListener('DOMContentLoaded', () => {
    new HsuTutorApp();
});
