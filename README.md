# 許氏注音輸入法打字練習軟體 (Hsu's Zhuyin Keyboard Typing Tutor)

![Version](https://img.shields.io/badge/version-v1.2.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Web-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-purple.svg)

專為 **自然輸入法「許氏鍵盤 (Hsu's Zhuyin Layout)」** 設計的現代化打字練習軟體。結合 **C# .NET 8 原生桌面啟動器** 與 **HTML5/CSS3/JS 高互動暗黑玻璃 UI**，幫助使用者從零基礎入門口訣，一路邁向流利中文盲打！

---

## 🌟 核心功能與特色

### 1. 25 鍵完整許氏鍵盤圖解與四大記憶色塊
許氏鍵盤由自然輸入法發明人**許聞廉博士**設計，將 37 個注音符號與 5 個聲調精簡整合在 25 個英文字母鍵上。本軟體提供四大口訣色塊圖解：
- 🟢 **字音相似 (Phonetic)**：`B`(ㄅ), `P`(ㄆ), `M`(ㄇ), `F`(ㄈ), `D`(ㄉ), `T`(ㄊ), `N`(ㄋ), `L`(ㄌ), `G`(ㄍ), `K`(ㄎ), `H`(ㄏ), `J`(ㄐ), `R`(ㄖ), `Z`(ㄗ), `S`(ㄙ), `E`(ㄝ)
- 🔵 **字形相似 (Visual)**：`W`(ㄠ), `V`(ㄑ), `M`(ㄢ), `K`(ㄤ), `L`(ㄥ/ㄦ), `Y`(ㄚ), `X`(ㄨ), `U`(ㄩ)
- 🟣 **順位與組別 (Grouping)**：`Z/A/S` (ㄗ/ㄘ/ㄙ), `J/V/C` (ㄓ/ㄔ/ㄕ & ㄐ/ㄑ/ㄒ)
- 🟡 **手順聲調鍵 (Home Row)**：`Space` (一聲), `D` (二聲), `F` (三聲), `J` (四聲), `S` (輕聲), `G` (ㄜ), `H` (ㄛ)

### 2. 20,000+ 全漢字自動注音辨識字典
內建完整的 Unicode CJK **20,992 個漢字注音資料庫** (`js/zhuyin_dict.js`)。貼上任何自訂文章或中文長文，系統皆能自動解析為精準注音與許氏按鍵序列。

### 3. 五大循序漸進練習關卡
- **關卡 1：鍵位與口訣特訓** — 音似、形似、順位、手順單鍵記憶。
- **關卡 2：聲韻組合拼音特訓** — 單字「聲母 + 韻母 + 聲調」完整打法。
- **關卡 3：高頻實用詞彙練習** — 生活詞彙與四字成語實戰。
- **關卡 4：日常短句盲打特訓** — 中文句子流暢輸入盲打特訓（支援全句與句中英文單字無縫對齊）。
- **自訂文章模式** — 自由匯入文章進行客製化特訓。

### 4. 寬幅歷史成績紀錄與打字速度參考指標
- **1080px 寬幅介面**：彈窗支援寬幅 Layout，輕鬆瀏覽詳細歷史成績。
- **指標說明**：標明 **WPM** (每分打中文字數) 與 **CPM** (每分鍵盤按鍵數)。
- **📊 速度參考指標**：內建新手入門 (10~20 WPM)、中級流利 (30~50 WPM) 與高級高手 (60+ WPM) 參考指標表格。
- **數據管理**：提供「📜 歷史成績」檢視視窗與「🗑️ 清空歸零」功能，並對紀錄進行隔離保護。

### 5. 沉浸式擬真打字音效
採用 **Web Audio API** 即時動態合成青軸打字音效、錯誤警示音與通關音樂。

---

## 📁 專案目錄架構

```
C:\myGitHub\HsuZhuyinTutor\
├── index.html               # 打字練習器 UI 與架構
├── launch.bat               # 一鍵啟動腳本
├── HsuZhuyinTutor.exe       # C# .NET 8 桌面應用程式啟動檔
├── HsuZhuyinTutor.csproj    # C# 專案檔
├── Program.cs               # C# 主程式進入點
├── README.md                # 專案說明文件
├── VERSION.md               # 版本歷史說明
├── .gitignore               # Git 忽略設定檔
├── css/
│   └── style.css            # 暗黑玻璃擬真 UI 與動態效果
└── js/
    ├── zhuyin_dict.js       # 20,000+ 漢字注音資料庫
    ├── hsu_mapping.js       # 許氏鍵盤對照表與轉換邏輯
    ├── lessons.js           # 關卡與題庫資料庫
    ├── keyboard_ui.js       # 虛擬鍵盤渲染與互動控制
    ├── audio_system.js      # Web Audio 擬真音效引擎
    └── app.js               # 打字主邏輯、分數統計與歷史紀錄
```

---

## 🚀 快速啟動方式

您可以透過以下任意一種方式啟動軟體：

1. **執行 C# 主程式**：雙擊 `HsuZhuyinTutor.exe`
2. **使用批次檔**：雙擊 `launch.bat`
3. **直接開啟網頁**：以瀏覽器開啟 `index.html`

---

## 🛠️ 技術棧 (Tech Stack)

- **前端介面**：HTML5, Vanilla CSS3 (Custom Properties & Flexbox/Grid), ES6 JavaScript
- **桌面端啟動器**：C# .NET 8 (Windows Forms)
- **音效處理**：Web Audio API (OscillatorNode & GainNode Synthesis)
- **資料儲存**：Browser `localStorage`

---
<img width="1615" height="1191" alt="image" src="https://github.com/user-attachments/assets/e1de1b14-9653-4c58-8222-2c63a4103c31" />

## 📄 授權條款 (License)

本專案採用 [MIT License](LICENSE) 授權。
