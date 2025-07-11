# 台語聖經朗讀

一個現代化的台語聖經線上閱讀與朗讀應用程式。

## 功能特色

- 📖 **多版本對照**：白話字、台語羅馬字、台語漢字、和合本
- 🎵 **智慧音頻系統**：優先使用本地音檔，自動切換線上音檔
- 📱 **響應式設計**：完美適配桌面、平板、手機
- 🌙 **主題切換**：支援淺色/深色主題
- 🔖 **書籤管理**：儲存和管理喜愛的經文
- ⌨️ **快捷鍵導航**：方便的鍵盤操作
- 🎛️ **浮動播放器**：緊湊的音頻控制介面，優化按鈕響應式設計
- 📍 **章節導航**：便捷的章節和經文切換
- 🔄 **A-B重複播放**：設定區間重複播放，方便學習和記憶

## 快速開始

### 1. 下載聖經資料 (首次使用)

需要先安裝 [V 語言](https://vlang.io/)

```bash
# 下載指定書卷 (例如馬太福音)
v run crawler.v 太

# 下載所有書卷
v run crawler.v
```

### 2. 啟動網頁應用

```bash
# 方法一：Python 3
python3 -m http.server 8000

# 方法二：Node.js (需要安裝 serve)
npx serve -p 8000

# 方法三：PHP
php -S localhost:8000
```

然後在瀏覽器開啟：`http://localhost:8000`

## 使用爬蟲下載資料

### 下載單一書卷
```bash
v run crawler.v 太    # 下載馬太福音
v run crawler.v 詩    # 下載詩篇
v run crawler.v 創    # 下載創世記
```

### 下載所有書卷
```bash
v run crawler.v       # 下載全部66卷書
```

### 常用書卷代碼
- **新約**: 太、可、路、約、徒、羅、林前、林後、加、弗、腓、西、帖前、帖後、提前、提後、多、門、來、雅、彼前、彼後、約一、約二、約三、猶、啟
- **舊約**: 創、出、利、民、申、書、士、得、撒上、撒下、王上、王下、代上、代下、拉、尼、斯、伯、詩、箴、傳、歌、賽、耶、哀、結、但、何、珥、摩、俄、拿、彌、鴻、哈、番、該、亞、瑪

## 檔案結構

### 核心檔案
- `index.html` - 主要 HTML 檔案
- `vue-app.js` - Vue.js 應用程式邏輯
- `data-loader.js` - 聖經資料載入器
- `styles.css` - 樣式表

### 爬蟲工具
- `crawler.v` - V 語言聖經爬蟲 

### 資料目錄
- `bible_data/` - 聖經資料和音頻檔案
  - `{書卷}/chapter_{章節}.json` - 經文資料
  - `audio/{書卷}/chapter_{章節}.mp3` - 音頻檔案

## 技術規格

- **前端**: Vue.js 3 (CDN)
- **爬蟲**: V 語言
- **樣式**: 現代 CSS (Grid, Flexbox)
- **音頻**: Web Audio API
- **資料格式**: JSON

## 開發說明

1. 爬蟲從 [信望愛聖經網](https://bible.fhl.net/) 下載資料
2. 支援四種台語聖經版本及和合本
3. 自動建立目錄結構並儲存 JSON 格式資料
4. 包含延遲機制避免伺服器負載過重
5. **智慧音頻載入系統**：
   - 🎯 優先載入本地下載的音檔（`bible_data/audio/` 目錄）
   - 🌐 如果本地音檔不存在，自動切換到線上音檔
   - 📡 線上音檔來源：`https://media.fhl.net/wutai/{book_id}/{book_id}_{chapter:03d}.mp3`
   - 🔄 播放失敗時會自動重新嘗試載入和播放
   - 🎛️ 優化的浮動播放器設計，防止按鈕壓縮
   - 📱 完全響應式的音頻控制介面

## 系統需求

- [V 語言](https://vlang.io/) - 用於運行爬蟲
- 現代網頁瀏覽器 - 支援 ES6+ 和 Web Audio API
- 本地 HTTP 伺服器 - Python、Node.js 或 PHP

## 參考資料

- [信望愛聖經閱讀](https://bible.fhl.net/new/read.php?chineses=%E5%A4%AA&strongflag=0&SSS=0&nodic=0&VERSION1=unv&VERSION16=bklcl&VERSION27=tghg&VERSION32=bklcl&VERSION33=bklhl&TABFLAG=1&nodic=0&chap=1)
- [台語台南腔有聲聖經](https://bkbible.fhl.net/new/audio_hb.php?version=15)