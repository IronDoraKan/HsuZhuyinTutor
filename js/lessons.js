/**
 * 許氏注音練習課程庫 (Hsu's Zhuyin Lesson Curriculum Database)
 * 涵蓋 Level 1 到 Level 4 的循序漸進練習單元
 */

const HSU_LESSONS = {
    // 關卡 1：鍵位與口訣特訓 (Single Key Mnemonics)
    level1: [
        {
            id: 'l1_phonetic',
            title: '1-1 字音相似類特訓 (Phonetic Keys)',
            desc: '利用英文字母原有的發音來記憶注音（例如 B=ㄅ, D=ㄉ, P=ㄆ, M=ㄇ）',
            type: 'single_key',
            items: [
                { text: 'ㄅ', zhuyin: 'ㄅ', keys: ['B'], hint: 'B 發音即為 ㄅ' },
                { text: 'ㄆ', zhuyin: 'ㄆ', keys: ['P'], hint: 'P 發音即為 ㄆ' },
                { text: 'ㄇ', zhuyin: 'ㄇ', keys: ['M'], hint: 'M 發音即為 ㄇ' },
                { text: 'ㄈ', zhuyin: 'ㄈ', keys: ['F'], hint: 'F 發音即為 ㄈ' },
                { text: 'ㄉ', zhuyin: 'ㄉ', keys: ['D'], hint: 'D 發音即為 ㄉ' },
                { text: 'ㄊ', zhuyin: 'ㄊ', keys: ['T'], hint: 'T 發音即為 ㄊ' },
                { text: 'ㄋ', zhuyin: 'ㄋ', keys: ['N'], hint: 'N 發音即為 ㄋ' },
                { text: 'ㄌ', zhuyin: 'ㄌ', keys: ['L'], hint: 'L 發音即為 ㄌ' },
                { text: 'ㄍ', zhuyin: 'ㄍ', keys: ['G'], hint: 'G 發音即為 ㄍ' },
                { text: 'ㄎ', zhuyin: 'ㄎ', keys: ['K'], hint: 'K 發音即為 ㄎ' },
                { text: 'ㄏ', zhuyin: 'ㄏ', keys: ['H'], hint: 'H 發音即為 ㄏ' },
                { text: 'ㄐ', zhuyin: 'ㄐ', keys: ['J'], hint: 'J 發音近似 ㄐ' },
                { text: 'ㄒ', zhuyin: 'ㄒ', keys: ['C'], hint: 'C 發音近似 ㄒ' },
                { text: 'ㄖ', zhuyin: 'ㄖ', keys: ['R'], hint: 'R 發音即為 ㄖ' },
                { text: 'ㄗ', zhuyin: 'ㄗ', keys: ['Z'], hint: 'Z 發音即為 ㄗ' },
                { text: 'ㄙ', zhuyin: 'ㄙ', keys: ['S'], hint: 'S 發音即為 ㄙ' },
                { text: 'ㄝ', zhuyin: 'ㄝ', keys: ['E'], hint: 'E 發音即為 ㄝ' }
            ]
        },
        {
            id: 'l1_visual',
            title: '1-2 字形相似類特訓 (Visual Keys)',
            desc: '利用字母外觀、旋轉或結構聯想記憶（例如 W=ㄠ, V=ㄑ, X=ㄨ, U=ㄩ）',
            type: 'single_key',
            items: [
                { text: 'ㄠ', zhuyin: 'ㄠ', keys: ['W'], hint: 'W 逆時針轉 90 度像 ㄠ' },
                { text: 'ㄑ', zhuyin: 'ㄑ', keys: ['V'], hint: 'V 旋轉 90 度像 ㄑ' },
                { text: 'ㄢ', zhuyin: 'ㄢ', keys: ['M'], hint: 'M 閉合結構像 ㄢ' },
                { text: 'ㄤ', zhuyin: 'ㄤ', keys: ['K'], hint: 'K 字母傾斜看像 ㄤ' },
                { text: 'ㄥ', zhuyin: 'ㄥ', keys: ['L'], hint: 'L 直角邊緣像 ㄥ' },
                { text: 'ㄦ', zhuyin: 'ㄦ', keys: ['L'], hint: 'L 右半側與 ㄦ 相似' },
                { text: 'ㄚ', zhuyin: 'ㄚ', keys: ['Y'], hint: 'Y 叉狀結構像 ㄚ' },
                { text: 'ㄨ', zhuyin: 'ㄨ', keys: ['X'], hint: 'X 交叉形狀與 ㄨ 完全相同' },
                { text: 'ㄩ', zhuyin: 'ㄩ', keys: ['U'], hint: 'U 槽狀形狀與 ㄩ 極為相似' }
            ]
        },
        {
            id: 'l1_tones',
            title: '1-3 手順與聲調鍵特訓 (Home-Row Tones)',
            desc: '許氏靈魂設計：將聲調放在 Home Row 方便盲打 (Space=一聲, D=二聲, F=三聲, J=四聲, S=輕聲)',
            type: 'single_key',
            items: [
                { text: '一聲 (Space)', zhuyin: 'ˉ', keys: ['Space'], hint: '一聲按空白鍵 Space' },
                { text: '二聲 (D)', zhuyin: 'ˊ', keys: ['D'], hint: '二聲按 D (左手中指)' },
                { text: '三聲 (F)', zhuyin: 'ˇ', keys: ['F'], hint: '三聲按 F (左手食指)' },
                { text: '四聲 (J)', zhuyin: 'ˋ', keys: ['J'], hint: '四聲按 J (右手食指)' },
                { text: '輕聲 (S)', zhuyin: '˙', keys: ['S'], hint: '輕聲按 S (左手無名指)' },
                { text: '韻母 ㄜ (G)', zhuyin: 'ㄜ', keys: ['G'], hint: '常用韻母 ㄜ 配置於 G 鍵' },
                { text: '韻母 ㄛ (H)', zhuyin: 'ㄛ', keys: ['H'], hint: '常用韻母 ㄛ 配置於 H 鍵' }
            ]
        }
    ],

    // 關卡 2：雙鍵與拼音組合 (Syllable Combinations)
    level2: [
        {
            id: 'l2_basic_syllables',
            title: '2-1 基礎單字拼音組合',
            desc: '練習「聲母 + 韻母 + 聲調」的完整打法',
            type: 'words',
            items: [
                { char: '好', zhuyin: 'ㄏㄠˇ', pinyin: 'hao3', note: 'ㄏ(H) + ㄠ(W) + 三聲(F)' },
                { char: '你', zhuyin: 'ㄋㄧˇ', pinyin: 'ni3', note: 'ㄋ(N) + ㄧ(E) + 三聲(F)' },
                { char: '我', zhuyin: 'ㄨㄛˇ', pinyin: 'wo3', note: 'ㄨ(X) + ㄛ(H) + 三聲(F)' },
                { char: '他', zhuyin: 'ㄊㄚ', pinyin: 'ta1', note: 'ㄊ(T) + ㄚ(Y) + 一聲(Space)' },
                { char: '是', zhuyin: 'ㄕˋ', pinyin: 'shi4', note: 'ㄕ(C) + 四聲(J)' },
                { char: '學', zhuyin: 'ㄒㄩㄝˊ', pinyin: 'xue2', note: 'ㄒ(C) + ㄩ(U) + ㄝ(E) + 二聲(D)' },
                { char: '中', zhuyin: 'ㄓㄨㄥ', pinyin: 'zhong1', note: 'ㄓ(J) + ㄨ(X) + ㄥ(L) + 一聲(Space)' },
                { char: '國', zhuyin: 'ㄍㄨㄛˊ', pinyin: 'guo2', note: 'ㄍ(G) + ㄨ(X) + ㄛ(H) + 二聲(D)' },
                { char: '許', zhuyin: 'ㄒㄩˇ', pinyin: 'xu3', note: 'ㄒ(C) + ㄩ(U) + 三聲(F)' },
                { char: '打', zhuyin: 'ㄉㄚˇ', pinyin: 'da3', note: 'ㄉ(D) + ㄚ(Y) + 三聲(F)' },
                { char: '字', zhuyin: 'ㄗˋ', pinyin: 'zi4', note: 'ㄗ(Z) + 四聲(J)' },
                { char: '快', zhuyin: 'ㄎㄨㄞˋ', pinyin: 'kuai4', note: 'ㄎ(K) + ㄨ(X) + ㄞ(I) + 四聲(J)' }
            ]
        }
    ],

    // 關卡 3：高頻常用詞彙練習 (Common Vocabulary)
    level3: [
        {
            id: 'l3_vocab',
            title: '3-1 高頻實用詞彙練習',
            desc: '連續詞彙拼寫，培養流暢肌肉記憶',
            type: 'sentence',
            items: [
                { sentence: '自然輸入法', guide: 'ㄗˋ ㄖㄢˊ ㄕㄨ ㄖㄨˋ ㄈㄚˇ' },
                { sentence: '許氏注音', guide: 'ㄒㄩˇ ㄕˋ ㄓㄨˋ ㄧㄣ' },
                { sentence: '台灣科技', guide: 'ㄊㄞˊ ㄨㄢ ㄎㄜ ㄐㄧˋ' },
                { sentence: '人工智慧', guide: 'ㄖㄣˊ ㄍㄨㄥ ㄓ ㄏㄨㄟˋ' },
                { sentence: '電腦打字', guide: 'ㄉㄧㄢˋ ㄋㄠˇ ㄉㄚˇ ㄗˋ' },
                { sentence: '循序漸進', guide: 'ㄒㄩㄣˊ ㄒㄩˋ ㄐㄧㄢˋ ㄐㄧㄣˋ' }
            ]
        }
    ],

    // 關卡 4：文章長句盲打 (Sentences & Paragraphs)
    level4: [
        {
            id: 'l4_sentences',
            title: '4-1 日常短句實戰盲打',
            desc: '挑戰完整中文句子，邁向流利盲打',
            type: 'sentence',
            items: [
                {
                    sentence: '許氏鍵盤將注音符號與英文字母完美結合。',
                    guide: 'ㄒㄩˇ ㄕˋ ㄐㄧㄢˋ ㄆㄢˊ ㄐㄧㄤ ㄓㄨˋ ㄧㄣ ㄈㄨˊ ㄏㄠˋ ㄩˇ ㄧㄥ ㄨㄣˊ ㄗˋ ㄇㄨˇ ㄨㄢˊ ㄇㄟˇ ㄐㄧㄝˊ ㄏㄜˊ'
                },
                {
                    sentence: '熟練中英文打字只需要每天練習十五分鐘。',
                    guide: 'ㄕㄡˊ ㄌㄧㄢˋ ㄓㄨㄥ ㄧㄥ ㄨㄣˊ ㄉㄚˇ ㄗˋ ㄓˇ ㄒㄩ ㄧㄠˋ ㄇㄟˇ ㄊㄧㄢ ㄌㄧㄢˋ ㄒㄧˊ ㄕˊ ㄨˇ ㄈㄣ ㄓㄨㄥ'
                },
                {
                    sentence: '實體鍵盤聲調位在 Home Row 能有效減輕手指負擔。',
                    guide: 'ㄕˊ ㄊㄧˇ ㄐㄧㄢˋ ㄆㄢˊ ㄕㄥ ㄉㄧㄠˋ ㄨㄟˋ ㄗㄞˋ Home Row ㄋㄥˊ ㄧㄡˇ ㄒㄧㄠˋ ㄐㄧㄢˇ ㄑㄧㄥ ㄕㄡˇ ㄓˇ ㄈㄨˋ ㄉㄢ'
                }
            ]
        }
    ]
};

window.HsuLessons = HSU_LESSONS;
