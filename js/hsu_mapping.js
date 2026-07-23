/**
 * 許氏注音輸入法 (Hsu's Zhuyin Keyboard Layout) 核心對照表與轉換器
 * 發明人：許聞廉博士 (自然輸入法)
 */

const HSU_KEYBOARD_LAYOUT = [
    // 第一排 Row 1 (QWERTY UI Upper Row)
    { key: 'Q', zhuyin: ['選字'], cat: 'func', desc: '功能/選字鍵', mnemonic: '在自然輸入法中保留為功能與選字鍵', finger: 'left-pinky' },
    { key: 'W', zhuyin: ['ㄠ'], cat: 'visual', desc: '字形相似', mnemonic: 'W 逆時針旋轉 90 度外觀長得像「ㄠ」', finger: 'left-ring' },
    { key: 'E', zhuyin: ['ㄝ', 'ㄧ'], cat: 'phonetic', desc: '字音相似', mnemonic: '字母 E 發音近似「ㄝ」，亦作介音「ㄧ」(E音)', finger: 'left-middle' },
    { key: 'R', zhuyin: ['ㄖ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'R 發音即為「ㄖ」音標 (r)', finger: 'left-index' },
    { key: 'T', zhuyin: ['ㄊ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'T 發音即為「ㄊ」 (t)', finger: 'left-index' },
    { key: 'Y', zhuyin: ['ㄚ'], cat: 'visual', desc: '字形相似', mnemonic: 'Y 的下半部分叉與「ㄚ」字形極為相似', finger: 'right-index' },
    { key: 'U', zhuyin: ['ㄩ'], cat: 'visual', desc: '字形相似', mnemonic: 'U 的開口形狀與「ㄩ」極為相似', finger: 'right-index' },
    { key: 'I', zhuyin: ['ㄞ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'I 的英文發音 /aɪ/ 即為「ㄞ」', finger: 'right-middle' },
    { key: 'O', zhuyin: ['ㄟ', 'ㄡ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'O 發音近似 /oʊ/「ㄡ」，亦對應韻母「ㄟ」', finger: 'right-ring' },
    { key: 'P', zhuyin: ['ㄆ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'P 發音即為「ㄆ」 (p)', finger: 'right-pinky' },

    // 第二排 Row 2 (Home Row)
    { key: 'A', zhuyin: ['ㄘ', 'ㄟ'], cat: 'group', desc: '順位對稱', mnemonic: '與 Z(ㄗ)、S(ㄙ) 為同一組聲母，A 代表「ㄘ」；亦作韻母「ㄟ」', finger: 'left-pinky' },
    { key: 'S', zhuyin: ['ㄙ', '輕聲'], cat: 'tone', desc: '字音/手順', mnemonic: 'S 發音為「ㄙ」；本位列手順作為「輕聲 ˙」', finger: 'left-ring' },
    { key: 'D', zhuyin: ['ㄉ', '二聲'], cat: 'tone', desc: '字音/手順', mnemonic: 'D 發音為「ㄉ」 (d)；本位列手順作為「二聲 ˊ」', finger: 'left-middle' },
    { key: 'F', zhuyin: ['三聲'], cat: 'tone', desc: '手順聲調', mnemonic: '左手本位列食指最舒服位置，作為「三聲 ˇ」', finger: 'left-index' },
    { key: 'G', zhuyin: ['ㄍ', 'ㄜ'], cat: 'phonetic', desc: '字音/手順', mnemonic: 'G 發音為「ㄍ」 (g)；亦作為常打韻母「ㄜ」', finger: 'left-index' },
    { key: 'H', zhuyin: ['ㄏ', 'ㄛ'], cat: 'phonetic', desc: '字音/手順', mnemonic: 'H 發音為「ㄏ」 (h)；亦作為常打韻母「ㄛ」', finger: 'right-index' },
    { key: 'J', zhuyin: ['ㄐ', 'ㄓ', '四聲'], cat: 'tone', desc: '字音/手順', mnemonic: 'J 發音為「ㄐ/ㄓ」；右手本位列食指作為「四聲 ˋ」', finger: 'right-index' },
    { key: 'K', zhuyin: ['ㄎ', 'ㄤ'], cat: 'visual', desc: '字音/字形', mnemonic: 'K 發音為「ㄎ」 (k)；字母 K 傾斜看像「ㄤ」', finger: 'right-middle' },
    { key: 'L', zhuyin: ['ㄌ', 'ㄥ', 'ㄦ'], cat: 'visual', desc: '字音/字形', mnemonic: 'L 發音為「ㄌ」；字形直角像「ㄥ」，右半部像「ㄦ」', finger: 'right-ring' },

    // 第三排 Row 3 (Bottom Row)
    { key: 'Z', zhuyin: ['ㄗ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'Z 發音即為「ㄗ」 (z)', finger: 'left-pinky' },
    { key: 'X', zhuyin: ['ㄨ'], cat: 'visual', desc: '字形相似', mnemonic: 'X 的交叉外觀與「ㄨ」完全一致', finger: 'left-ring' },
    { key: 'C', zhuyin: ['ㄒ', 'ㄕ'], cat: 'group', desc: '字音/順位', mnemonic: 'C 發音近似「ㄒ」，與 J(ㄐ)、V(ㄑ) 對稱；亦作「ㄕ」', finger: 'left-middle' },
    { key: 'V', zhuyin: ['ㄑ', 'ㄔ'], cat: 'visual', desc: '字形/順位', mnemonic: 'V 旋轉 90 度為「ㄑ」，與 J(ㄐ)、C(ㄒ) 對稱；亦作「ㄔ」', finger: 'left-index' },
    { key: 'B', zhuyin: ['ㄅ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'B 發音即為「ㄅ」 (b)', finger: 'left-index' },
    { key: 'N', zhuyin: ['ㄋ', 'ㄣ'], cat: 'phonetic', desc: '字音相似', mnemonic: 'N 發音為「ㄋ」 (n)，亦作為鼻音韻母「ㄣ」', finger: 'right-index' },
    { key: 'M', zhuyin: ['ㄇ', 'ㄢ'], cat: 'visual', desc: '字音/字形', mnemonic: 'M 發音為「ㄇ」 (m)；M 閉合結構像「ㄢ」', finger: 'right-index' }
];

// 聲調按鍵定義 (Home Row Tones)
const TONE_KEYS = {
    '': 'Space',    // 一聲 (預設/空白鍵)
    'ˉ': 'Space',   // 一聲
    'ˊ': 'D',       // 二聲
    'ˇ': 'F',       // 三聲
    'ˋ': 'J',       // 四聲
    '˙': 'S'        // 輕聲
};

// 37個注音符號對應之主要許氏英文字母
const ZHUYIN_TO_KEY = {
    // 聲母
    'ㄅ': 'B', 'ㄆ': 'P', 'ㄇ': 'M', 'ㄈ': 'F',
    'ㄉ': 'D', 'ㄊ': 'T', 'ㄋ': 'N', 'ㄌ': 'L',
    'ㄍ': 'G', 'ㄎ': 'K', 'ㄏ': 'H',
    'ㄐ': 'J', 'ㄑ': 'V', 'ㄒ': 'C',
    'ㄓ': 'J', 'ㄔ': 'V', 'ㄕ': 'C', 'ㄖ': 'R',
    'ㄗ': 'Z', 'ㄘ': 'A', 'ㄙ': 'S',
    // 介音
    'ㄧ': 'E', 'ㄨ': 'X', 'ㄩ': 'U',
    // 韻母
    'ㄚ': 'Y', 'ㄛ': 'H', 'ㄜ': 'G', 'ㄝ': 'E',
    'ㄞ': 'I', 'ㄟ': 'O', 'ㄠ': 'W', 'ㄡ': 'O',
    'ㄢ': 'M', 'ㄣ': 'N', 'ㄤ': 'K', 'ㄥ': 'L', 'ㄦ': 'L'
};

// 注音符號分類資訊
const ZHUYIN_META = {
    'ㄅ': { name: 'ㄅ', key: 'B', type: 'phonetic', desc: 'B 發音' },
    'ㄆ': { name: 'ㄆ', key: 'P', type: 'phonetic', desc: 'P 發音' },
    'ㄇ': { name: 'ㄇ', key: 'M', type: 'phonetic', desc: 'M 發音' },
    'ㄈ': { name: 'ㄈ', key: 'F', type: 'phonetic', desc: 'F 發音' },
    'ㄉ': { name: 'ㄉ', key: 'D', type: 'phonetic', desc: 'D 發音' },
    'ㄊ': { name: 'ㄊ', key: 'T', type: 'phonetic', desc: 'T 發音' },
    'ㄋ': { name: 'ㄋ', key: 'N', type: 'phonetic', desc: 'N 發音' },
    'ㄌ': { name: 'ㄌ', key: 'L', type: 'phonetic', desc: 'L 發音' },
    'ㄍ': { name: 'ㄍ', key: 'G', type: 'phonetic', desc: 'G 發音' },
    'ㄎ': { name: 'ㄎ', key: 'K', type: 'phonetic', desc: 'K 發音' },
    'ㄏ': { name: 'ㄏ', key: 'H', type: 'phonetic', desc: 'H 發音' },
    'ㄐ': { name: 'ㄐ', key: 'J', type: 'phonetic', desc: 'J 發音 (近似)' },
    'ㄑ': { name: 'ㄑ', key: 'V', type: 'visual', desc: 'V 旋轉 90 度' },
    'ㄒ': { name: 'ㄒ', key: 'C', type: 'phonetic', desc: 'C 發音' },
    'ㄓ': { name: 'ㄓ', key: 'J', type: 'group', desc: '與 ㄐ 共用 J 鍵' },
    'ㄔ': { name: 'ㄔ', key: 'V', type: 'group', desc: '與 ㄑ 共用 V 鍵' },
    'ㄕ': { name: 'ㄕ', key: 'C', type: 'group', desc: '與 ㄒ 共用 C 鍵' },
    'ㄖ': { name: 'ㄖ', key: 'R', type: 'phonetic', desc: 'R 發音' },
    'ㄗ': { name: 'ㄗ', key: 'Z', type: 'phonetic', desc: 'Z 發音' },
    'ㄘ': { name: 'ㄘ', key: 'A', type: 'group', desc: '與 Z, S 順位組 (A)' },
    'ㄙ': { name: 'ㄙ', key: 'S', type: 'phonetic', desc: 'S 發音' },
    'ㄧ': { name: 'ㄧ', key: 'E', type: 'phonetic', desc: 'E 發音 (/i/)' },
    'ㄨ': { name: 'ㄨ', key: 'X', type: 'visual', desc: 'X 字形像 ㄨ' },
    'ㄩ': { name: 'ㄩ', key: 'U', type: 'visual', desc: 'U 字形像 ㄩ' },
    'ㄚ': { name: 'ㄚ', key: 'Y', type: 'visual', desc: 'Y 分叉像 ㄚ' },
    'ㄛ': { name: 'ㄛ', key: 'H', type: 'phonetic', desc: '手順常用鍵 H' },
    'ㄜ': { name: 'ㄜ', key: 'G', type: 'phonetic', desc: '手順常用鍵 G' },
    'ㄝ': { name: 'ㄝ', key: 'E', type: 'phonetic', desc: 'E 發音' },
    'ㄞ': { name: 'ㄞ', key: 'I', type: 'phonetic', desc: 'I 發音 (/aɪ/)' },
    'ㄟ': { name: 'ㄟ', key: 'O', type: 'phonetic', desc: 'O 發音/A鍵補輔' },
    'ㄠ': { name: 'ㄠ', key: 'W', type: 'visual', desc: 'W 旋轉像 ㄠ' },
    'ㄡ': { name: 'ㄡ', key: 'O', type: 'phonetic', desc: 'O 發音 (/oʊ/)' },
    'ㄢ': { name: 'ㄢ', key: 'M', type: 'visual', desc: 'M 結構像 ㄢ' },
    'ㄣ': { name: 'ㄣ', key: 'N', type: 'phonetic', desc: 'N 鼻音 (/ən/)' },
    'ㄤ': { name: 'ㄤ', key: 'K', type: 'visual', desc: 'K 傾斜像 ㄤ' },
    'ㄥ': { name: 'ㄥ', key: 'L', type: 'visual', desc: 'L 直角像 ㄥ' },
    'ㄦ': { name: 'ㄦ', key: 'L', type: 'visual', desc: 'L 右半像 ㄦ' }
};

/**
 * 查詢單一中文字之注音符號
 */
function getZhuyinForChar(char) {
    if (window.COMPREHENSIVE_ZHUYIN_DICT && window.COMPREHENSIVE_ZHUYIN_DICT[char]) {
        return window.COMPREHENSIVE_ZHUYIN_DICT[char];
    }
    return '';
}

/**
 * 將單一中文音節（例如 "ㄒㄩˇ"、"ㄏㄠˇ"、"ㄓㄨㄥ"、"ㄍㄨㄥ"）解析並轉換為許氏按鍵序列
 * @param {string} zhuyinSyllable - 例如 "ㄏㄠˇ" 或 "ㄓㄨㄥ"
 * @returns {Array<{key: string, symbol: string, desc: string}>} - 按鍵序列
 */
function parseZhuyinToHsuKeys(zhuyinSyllable) {
    if (!zhuyinSyllable) return [];

    let symbols = [];
    let tone = '一聲'; // 預設一聲
    let toneKey = 'Space';

    // 檢查最後一個字元是否為聲調
    const lastChar = zhuyinSyllable.slice(-1);
    if (TONE_KEYS.hasOwnProperty(lastChar)) {
        toneKey = TONE_KEYS[lastChar];
        if (lastChar === 'ˊ') tone = '二聲';
        else if (lastChar === 'ˇ') tone = '三聲';
        else if (lastChar === 'ˋ') tone = '四聲';
        else if (lastChar === '˙') tone = '輕聲';
        symbols = zhuyinSyllable.slice(0, -1).split('');
    } else {
        symbols = zhuyinSyllable.split('');
    }

    const keySequence = [];

    symbols.forEach(symbol => {
        const key = ZHUYIN_TO_KEY[symbol];
        if (key) {
            keySequence.push({
                key: key,
                symbol: symbol,
                desc: ZHUYIN_META[symbol] ? ZHUYIN_META[symbol].desc : ''
            });
        }
    });

    // 加入聲調按鍵
    let toneSymbolDisplay = '一聲 (Space)';
    if (toneKey === 'D') toneSymbolDisplay = '二聲 (D)';
    else if (toneKey === 'F') toneSymbolDisplay = '三聲 (F)';
    else if (toneKey === 'J') toneSymbolDisplay = '四聲 (J)';
    else if (toneKey === 'S') toneSymbolDisplay = '輕聲 (S)';

    keySequence.push({
        key: toneKey,
        symbol: toneSymbolDisplay,
        desc: `手順聲調按鍵 [${toneKey}]`
    });

    return keySequence;
}

/**
 * 將整句中文句子或自訂文章分解為各字對應之注音與許氏按鍵序列
 * 全面支援 20,000+ 個 CJK 常用與罕用中文字
 * @param {string} sentence - 中文句子
 * @param {string} guideStr - 可選，注音導引字串
 * @returns {Array<{char: string, zhuyin: string, keys: Array<{key: string, symbol: string}>}>}
 */
function parseSentenceToCharItems(sentence, guideStr) {
    if (!sentence) return [];

    const charList = sentence.split('');
    let zhuyinList = [];

    if (guideStr && guideStr.trim()) {
        zhuyinList = guideStr.trim().split(/\s+/);
    }

    const items = [];
    let guideIndex = 0;

    charList.forEach((char) => {
        // 處理空白、換行與標點符號
        if (/[.,!?:;"'。，！？；：「」『』（）\s\r\n]/.test(char)) {
            items.push({
                char: char === '\n' ? '↵' : char,
                zhuyin: char === ' ' ? '空白' : '標點/換行',
                keys: [{ key: 'Space', symbol: char === ' ' ? 'Space' : char }]
            });
            return;
        }

        // 處理英文字母 (A-Z, a-z)
        if (/[a-zA-Z]/.test(char)) {
            items.push({
                char: char,
                zhuyin: `英文 ${char.toUpperCase()}`,
                keys: [{ key: char.toUpperCase(), symbol: char }]
            });
            return;
        }

        // 處理數字 (0-9)
        if (/[0-9]/.test(char)) {
            items.push({
                char: char,
                zhuyin: `數字 ${char}`,
                keys: [{ key: char, symbol: char }]
            });
            return;
        }

        // 查詢該中文字之注音
        let zhuyin = (zhuyinList && zhuyinList[guideIndex]) ? zhuyinList[guideIndex] : getZhuyinForChar(char);
        if (guideStr && guideStr.trim() && zhuyinList[guideIndex]) {
            guideIndex++;
        }

        if (zhuyin) {
            const keys = parseZhuyinToHsuKeys(zhuyin);
            items.push({
                char: char,
                zhuyin: zhuyin,
                keys: keys
            });
        } else {
            // 無法辨識之特殊符號預設以 Space 通過
            items.push({
                char: char,
                zhuyin: '未知字元',
                keys: [{ key: 'Space', symbol: 'Space' }]
            });
        }
    });

    return items;
}

// 匯出模組以利全域存取
window.HsuMapping = {
    LAYOUT: HSU_KEYBOARD_LAYOUT,
    TONE_KEYS: TONE_KEYS,
    ZHUYIN_TO_KEY: ZHUYIN_TO_KEY,
    ZHUYIN_META: ZHUYIN_META,
    getZhuyinForChar: getZhuyinForChar,
    parseZhuyinToHsuKeys: parseZhuyinToHsuKeys,
    parseSentenceToCharItems: parseSentenceToCharItems
};
