# 注音盲打雙模式打字練習器 (Zhuyin Dual-Layout Typing Tutor)

![Version](https://img.shields.io/badge/version-v1.3.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Web-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-purple.svg)

專為 **自然輸入法「許氏鍵盤 (Hsu's Layout)」** 與 **傳統「大千標準注音鍵盤 (Dachen Layout)」** 設計的現代化雙模式打字練習軟體。結合 **C# .NET 8 原生桌面啟動器** 與 **HTML5/CSS3/JS 高互動暗黑玻璃 UI**，幫助使用者從零基礎入門口訣，一路邁向流利中文盲打！

---

## 🌟 核心功能與特色

### 1. 許氏 / 大千雙模式鍵盤無縫切換
- **許氏注音鍵盤 (Hsu Layout)**：將 37 個注音符號與 5 個聲調精簡整合在 25 個英文字母鍵上。提供音似 (綠)、形似 (藍)、順位 (紫)、手順聲調 (黃) 四大口訣色塊圖解。
- **大千標準注音鍵盤 (Dachen Layout)**：完整重現台灣最普及的 47 鍵標準注音配置（數字列 1~0, -, 聲調鍵 3=ˇ, 4=ˋ, 6=ˊ, 7=˙）。
- **全站題目自動轉譯**：無論是內建關卡或自訂文章，皆能隨時切換鍵盤模式並自動轉譯對應按鍵與指法提示。

### 2. 20,000+ 全漢字自動注音辨識字典
內建完整的 Unicode CJK **20,992 個漢字注音資料庫** (`js/zhuyin_dict.js`)。貼上任何自訂文章或中文長文，系統皆能自動解析為精準注音與按鍵序列。

### 3. 自訂文章智慧切句與多標點支援
- **智慧切句 (splitTextToSentences)**：貼上長篇文章自動依主要標點 (`。` `！` `？` `\n` `；` `…`) 及逗號切割為每句 15~30 字之練習單元。
- **動態字級與換行**：練習區根據句子長度動態調整字體大小 (`48px` / `36px` / `26px`)。
- **全標點支援**：完整支援 `、` 頓號、`《` `》` 書名號、`—` 破折號、`…` 省略號、`【` `】` 括號等標點與半角符號。

### 4. 寬幅歷史成績紀錄與鍵盤模式標籤
- **+15% 超寬幅介面 (1250px)**：彈窗最大寬度提升至 **1250px (寬幅 96%)**，提供極佳閱讀空間。
- **鍵盤模式標籤**：歷史紀錄表格中明確標示該次練習採用 **`許氏鍵盤`** (綠色) 或 **`大千鍵盤`** (紫色)。
- **指標說明與速度參考表格**：標明 **WPM** 與 **CPM**，並內建打字速度參考指標評估表格。

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
<img width="1924" height="1551" alt="image" src="https://github.com/user-attachments/assets/db214f4c-5154-4346-998b-78292fa8b0a5" />

<img width="1615" height="1191" alt="image" src="https://github.com/user-attachments/assets/e1de1b14-9653-4c58-8222-2c63a4103c31" />

## 📄 授權條款 (License)

本專案採用 [MIT License](LICENSE) 授權。
