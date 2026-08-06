/**
 * 注音輸入法 (許氏鍵盤 / 大千標準鍵盤) 核心對照表與轉換器
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

// 大千標準注音鍵盤 (Dachen Standard Zhuyin Layout)
const DACHEN_KEYBOARD_LAYOUT = [
    // 第一排 Row 1 (數字列)
    { key: '1', zhuyin: ['ㄅ'], cat: 'phonetic', desc: '1 鍵 ➔ ㄅ', mnemonic: '標準大千鍵盤 1 鍵為 ㄅ', finger: 'left-pinky' },
    { key: '2', zhuyin: ['ㄉ'], cat: 'phonetic', desc: '2 鍵 ➔ ㄉ', mnemonic: '標準大千鍵盤 2 鍵為 ㄉ', finger: 'left-ring' },
    { key: '3', zhuyin: ['三聲'], cat: 'tone', desc: '3 鍵 ➔ 三聲 ˇ', mnemonic: '標準大千鍵盤 3 鍵為三聲 ˇ', finger: 'left-middle' },
    { key: '4', zhuyin: ['四聲'], cat: 'tone', desc: '4 鍵 ➔ 四聲 ˋ', mnemonic: '標準大千鍵盤 4 鍵為四聲 ˋ', finger: 'left-index' },
    { key: '5', zhuyin: ['ㄓ'], cat: 'phonetic', desc: '5 鍵 ➔ ㄓ', mnemonic: '標準大千鍵盤 5 鍵為 ㄓ', finger: 'left-index' },
    { key: '6', zhuyin: ['二聲'], cat: 'tone', desc: '6 鍵 ➔ 二聲 ˊ', mnemonic: '標準大千鍵盤 6 鍵為二聲 ˊ', finger: 'right-index' },
    { key: '7', zhuyin: ['輕聲'], cat: 'tone', desc: '7 鍵 ➔ 輕聲 ˙', mnemonic: '標準大千鍵盤 7 鍵為輕聲 ˙', finger: 'right-index' },
    { key: '8', zhuyin: ['ㄚ'], cat: 'phonetic', desc: '8 鍵 ➔ ㄚ', mnemonic: '標準大千鍵盤 8 鍵為 ㄚ', finger: 'right-middle' },
    { key: '9', zhuyin: ['ㄞ'], cat: 'phonetic', desc: '9 鍵 ➔ ㄞ', mnemonic: '標準大千鍵盤 9 鍵為 ㄞ', finger: 'right-ring' },
    { key: '0', zhuyin: ['ㄢ'], cat: 'phonetic', desc: '0 鍵 ➔ ㄢ', mnemonic: '標準大千鍵盤 0 鍵為 ㄢ', finger: 'right-pinky' },
    { key: '-', zhuyin: ['ㄦ'], cat: 'phonetic', desc: '- 鍵 ➔ ㄦ', mnemonic: '標準大千鍵盤 - 鍵為 ㄦ', finger: 'right-pinky' },

    // 第二排 Row 2 (QWERTY 列)
    { key: 'Q', zhuyin: ['ㄆ'], cat: 'phonetic', desc: 'Q 鍵 ➔ ㄆ', mnemonic: '標準大千鍵盤 Q 鍵為 ㄆ', finger: 'left-pinky' },
    { key: 'W', zhuyin: ['ㄊ'], cat: 'phonetic', desc: 'W 鍵 ➔ ㄊ', mnemonic: '標準大千鍵盤 W 鍵為 ㄊ', finger: 'left-ring' },
    { key: 'E', zhuyin: ['ㄍ'], cat: 'phonetic', desc: 'E 鍵 ➔ ㄍ', mnemonic: '標準大千鍵盤 E 鍵為 ㄍ', finger: 'left-middle' },
    { key: 'R', zhuyin: ['ㄐ'], cat: 'phonetic', desc: 'R 鍵 ➔ ㄐ', mnemonic: '標準大千鍵盤 R 鍵為 ㄐ', finger: 'left-index' },
    { key: 'T', zhuyin: ['ㄔ'], cat: 'phonetic', desc: 'T 鍵 ➔ ㄔ', mnemonic: '標準大千鍵盤 T 鍵為 ㄔ', finger: 'left-index' },
    { key: 'Y', zhuyin: ['ㄗ'], cat: 'phonetic', desc: 'Y 鍵 ➔ ㄗ', mnemonic: '標準大千鍵盤 Y 鍵為 ㄗ', finger: 'right-index' },
    { key: 'U', zhuyin: ['ㄧ'], cat: 'phonetic', desc: 'U 鍵 ➔ ㄧ', mnemonic: '標準大千鍵盤 U 鍵為 ㄧ', finger: 'right-index' },
    { key: 'I', zhuyin: ['ㄛ'], cat: 'phonetic', desc: 'I 鍵 ➔ ㄛ', mnemonic: '標準大千鍵盤 I 鍵為 ㄛ', finger: 'right-middle' },
    { key: 'O', zhuyin: ['ㄟ'], cat: 'phonetic', desc: 'O 鍵 ➔ ㄟ', mnemonic: '標準大千鍵盤 O 鍵為 ㄟ', finger: 'right-ring' },
    { key: 'P', zhuyin: ['ㄣ'], cat: 'phonetic', desc: 'P 鍵 ➔ ㄣ', mnemonic: '標準大千鍵盤 P 鍵為 ㄣ', finger: 'right-pinky' },

    // 第三排 Row 3 (Home Row)
    { key: 'A', zhuyin: ['ㄇ'], cat: 'phonetic', desc: 'A 鍵 ➔ ㄇ', mnemonic: '標準大千鍵盤 A 鍵為 ㄇ', finger: 'left-pinky' },
    { key: 'S', zhuyin: ['ㄋ'], cat: 'phonetic', desc: 'S 鍵 ➔ ㄋ', mnemonic: '標準大千鍵盤 S 鍵為 ㄋ', finger: 'left-ring' },
    { key: 'D', zhuyin: ['ㄎ'], cat: 'phonetic', desc: 'D 鍵 ➔ ㄎ', mnemonic: '標準大千鍵盤 D 鍵為 ㄎ', finger: 'left-middle' },
    { key: 'F', zhuyin: ['ㄑ'], cat: 'phonetic', desc: 'F 鍵 ➔ ㄑ', mnemonic: '標準大千鍵盤 F 鍵為 ㄑ', finger: 'left-index' },
    { key: 'G', zhuyin: ['ㄕ'], cat: 'phonetic', desc: 'G 鍵 ➔ ㄕ', mnemonic: '標準大千鍵盤 G 鍵為 ㄕ', finger: 'left-index' },
    { key: 'H', zhuyin: ['ㄘ'], cat: 'phonetic', desc: 'H 鍵 ➔ ㄘ', mnemonic: '標準大千鍵盤 H 鍵為 ㄘ', finger: 'right-index' },
    { key: 'J', zhuyin: ['ㄨ'], cat: 'phonetic', desc: 'J 鍵 ➔ ㄨ', mnemonic: '標準大千鍵盤 J 鍵為 ㄨ', finger: 'right-index' },
    { key: 'K', zhuyin: ['ㄜ'], cat: 'phonetic', desc: 'K 鍵 ➔ ㄜ', mnemonic: '標準大千鍵盤 K 鍵為 ㄜ', finger: 'right-middle' },
    { key: 'L', zhuyin: ['ㄠ'], cat: 'phonetic', desc: 'L 鍵 ➔ ㄠ', mnemonic: '標準大千鍵盤 L 鍵為 ㄠ', finger: 'right-ring' },
    { key: ';', zhuyin: ['ㄤ'], cat: 'phonetic', desc: '; 鍵 ➔ ㄤ', mnemonic: '標準大千鍵盤 ; 鍵為 ㄤ', finger: 'right-pinky' },

    // 第四排 Row 4 (Bottom Row)
    { key: 'Z', zhuyin: ['ㄈ'], cat: 'phonetic', desc: 'Z 鍵 ➔ ㄈ', mnemonic: '標準大千鍵盤 Z 鍵為 ㄈ', finger: 'left-pinky' },
    { key: 'X', zhuyin: ['ㄌ'], cat: 'phonetic', desc: 'X 鍵 ➔ ㄌ', mnemonic: '標準大千鍵盤 X 鍵為 ㄌ', finger: 'left-ring' },
    { key: 'C', zhuyin: ['ㄏ'], cat: 'phonetic', desc: 'C 鍵 ➔ ㄏ', mnemonic: '標準大千鍵盤 C 鍵為 ㄏ', finger: 'left-middle' },
    { key: 'V', zhuyin: ['ㄒ'], cat: 'phonetic', desc: 'V 鍵 ➔ ㄒ', mnemonic: '標準大千鍵盤 V 鍵為 ㄒ', finger: 'left-index' },
    { key: 'B', zhuyin: ['ㄖ'], cat: 'phonetic', desc: 'B 鍵 ➔ ㄖ', mnemonic: '標準大千鍵盤 B 鍵為 ㄖ', finger: 'left-index' },
    { key: 'N', zhuyin: ['ㄙ'], cat: 'phonetic', desc: 'N 鍵 ➔ ㄙ', mnemonic: '標準大千鍵盤 N 鍵為 ㄙ', finger: 'right-index' },
    { key: 'M', zhuyin: ['ㄩ'], cat: 'phonetic', desc: 'M 鍵 ➔ ㄩ', mnemonic: '標準大千鍵盤 M 鍵為 ㄩ', finger: 'right-index' },
    { key: ',', zhuyin: ['ㄝ'], cat: 'phonetic', desc: ', 鍵 ➔ ㄝ', mnemonic: '標準大千鍵盤 , 鍵為 ㄝ', finger: 'right-middle' },
    { key: '.', zhuyin: ['ㄡ'], cat: 'phonetic', desc: '. 鍵 ➔ ㄡ', mnemonic: '標準大千鍵盤 . 鍵為 ㄡ', finger: 'right-ring' },
    { key: '/', zhuyin: ['ㄥ'], cat: 'phonetic', desc: '/ 鍵 ➔ ㄥ', mnemonic: '標準大千鍵盤 / 鍵為 ㄥ', finger: 'right-pinky' }
];

// 聲調按鍵定義 (許氏)
const TONE_KEYS = {
    '': 'Space',    // 一聲 (預設/空白鍵)
    'ˉ': 'Space',   // 一聲
    'ˊ': 'D',       // 二聲
    'ˇ': 'F',       // 三聲
    'ˋ': 'J',       // 四聲
    '˙': 'S'        // 輕聲
};

// 聲調按鍵定義 (大千)
const DACHEN_TONE_KEYS = {
    '': 'Space',
    'ˉ': 'Space',
    'ˊ': '6',
    'ˇ': '3',
    'ˋ': '4',
    '˙': '7'
};

// 37個注音符號對應之主要許氏英文字母
const ZHUYIN_TO_KEY = {
    'ㄅ': 'B', 'ㄆ': 'P', 'ㄇ': 'M', 'ㄈ': 'F',
    'ㄉ': 'D', 'ㄊ': 'T', 'ㄋ': 'N', 'ㄌ': 'L',
    'ㄍ': 'G', 'ㄎ': 'K', 'ㄏ': 'H',
    'ㄐ': 'J', 'ㄑ': 'V', 'ㄒ': 'C',
    'ㄓ': 'J', 'ㄔ': 'V', 'ㄕ': 'C', 'ㄖ': 'R',
    'ㄗ': 'Z', 'ㄘ': 'A', 'ㄙ': 'S',
    'ㄧ': 'E', 'ㄨ': 'X', 'ㄩ': 'U',
    'ㄚ': 'Y', 'ㄛ': 'H', 'ㄜ': 'G', 'ㄝ': 'E',
    'ㄞ': 'I', 'ㄟ': 'O', 'ㄠ': 'W', 'ㄡ': 'O',
    'ㄢ': 'M', 'ㄣ': 'N', 'ㄤ': 'K', 'ㄥ': 'L', 'ㄦ': 'L'
};

// 37個注音符號對應之大千標準鍵盤按鍵
const DACHEN_ZHUYIN_TO_KEY = {
    'ㄅ': '1', 'ㄆ': 'Q', 'ㄇ': 'A', 'ㄈ': 'Z',
    'ㄉ': '2', 'ㄊ': 'W', 'ㄋ': 'S', 'ㄌ': 'X',
    'ㄍ': 'E', 'ㄎ': 'D', 'ㄏ': 'C',
    'ㄐ': 'R', 'ㄑ': 'F', 'ㄒ': 'V',
    'ㄓ': '5', 'ㄔ': 'T', 'ㄕ': 'G', 'ㄖ': 'B',
    'ㄗ': 'Y', 'ㄘ': 'H', 'ㄙ': 'N',
    'ㄧ': 'U', 'ㄨ': 'J', 'ㄩ': 'M',
    'ㄚ': '8', 'ㄛ': 'I', 'ㄜ': 'K', 'ㄝ': ',',
    'ㄞ': '9', 'ㄟ': 'O', 'ㄠ': 'L', 'ㄡ': '.',
    'ㄢ': '0', 'ㄣ': 'P', 'ㄤ': ';', 'ㄥ': '/', 'ㄦ': '-'
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
 * 將單一中文音節轉換為指定鍵盤模式 (hsu 或 dachen) 之按鍵序列
 */
function parseZhuyinToHsuKeys(zhuyinSyllable, layoutMode = 'hsu') {
    if (!zhuyinSyllable) return [];

    const isDachen = layoutMode === 'dachen';
    const toneMap = isDachen ? DACHEN_TONE_KEYS : TONE_KEYS;
    const zhuyinMap = isDachen ? DACHEN_ZHUYIN_TO_KEY : ZHUYIN_TO_KEY;

    let symbols = [];
    let tone = '一聲';
    let toneKey = 'Space';

    const lastChar = zhuyinSyllable.slice(-1);
    if (toneMap.hasOwnProperty(lastChar)) {
        toneKey = toneMap[lastChar];
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
        const key = zhuyinMap[symbol];
        if (key) {
            keySequence.push({
                key: key,
                symbol: symbol,
                desc: ZHUYIN_META[symbol] ? ZHUYIN_META[symbol].desc : ''
            });
        }
    });

    let toneSymbolDisplay = '一聲 (Space)';
    if (toneKey === 'Space') toneSymbolDisplay = '一聲 (Space)';
    else toneSymbolDisplay = `${tone} (${toneKey})`;

    keySequence.push({
        key: toneKey,
        symbol: toneSymbolDisplay,
        desc: `聲調按鍵 [${toneKey}]`
    });

    return keySequence;
}

/**
 * 將整句中文句子或自訂文章分解為各字對應之注音與按鍵序列
 */
function parseSentenceToCharItems(sentence, guideStr, layoutMode = 'hsu') {
    if (!sentence) return [];

    const charList = sentence.split('');

    let zhuyinTokens = [];
    if (guideStr && guideStr.trim()) {
        zhuyinTokens = guideStr.trim().split(/\s+/).filter(tok => 
            /[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ]/.test(tok)
        );
    }

    const items = [];
    let zhuyinIdx = 0;

    charList.forEach((char) => {
        // 1. 空白、換行與標點符號/特殊符號
        if (/[.,!?:;"'。，！？；：「」『』（）《》〈〉【】〔〕…—～·•\s\r\n`~!@#$%^&*()_+\-=\[\]{}|\\;:'",.<>/?“”—’‘、]/.test(char)) {
            items.push({
                char: char === '\n' ? '↵' : char,
                zhuyin: char === ' ' ? '空白' : '標點/符號',
                keys: [{ key: 'Space', symbol: char === ' ' ? 'Space' : char }]
            });
            return;
        }

        // 2. 英文字母 (A-Z, a-z)
        if (/[a-zA-Z]/.test(char)) {
            items.push({
                char: char,
                zhuyin: `英文 ${char.toUpperCase()}`,
                keys: [{ key: char.toUpperCase(), symbol: char }]
            });
            return;
        }

        // 3. 數字 (0-9)
        if (/[0-9]/.test(char)) {
            items.push({
                char: char,
                zhuyin: `數字 ${char}`,
                keys: [{ key: char, symbol: char }]
            });
            return;
        }

        // 4. 中文字元
        let zhuyin = '';
        if (zhuyinTokens.length > 0 && zhuyinIdx < zhuyinTokens.length) {
            zhuyin = zhuyinTokens[zhuyinIdx];
            zhuyinIdx++;
        } else {
            zhuyin = getZhuyinForChar(char);
        }

        if (!zhuyin) {
            zhuyin = getZhuyinForChar(char);
        }

        if (zhuyin) {
            const keys = parseZhuyinToHsuKeys(zhuyin, layoutMode);
            items.push({
                char: char,
                zhuyin: zhuyin,
                keys: keys
            });
        } else {
            // 無法辨識之特殊字元
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
    DACHEN_LAYOUT: DACHEN_KEYBOARD_LAYOUT,
    TONE_KEYS: TONE_KEYS,
    DACHEN_TONE_KEYS: DACHEN_TONE_KEYS,
    ZHUYIN_TO_KEY: ZHUYIN_TO_KEY,
    DACHEN_ZHUYIN_TO_KEY: DACHEN_ZHUYIN_TO_KEY,
    ZHUYIN_META: ZHUYIN_META,
    getZhuyinForChar: getZhuyinForChar,
    parseZhuyinToHsuKeys: parseZhuyinToHsuKeys,
    parseSentenceToCharItems: parseSentenceToCharItems
};
