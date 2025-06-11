// 聖經資料載入器
class BibleDataLoader {
    constructor() {
        this.dataCache = new Map();
        this.baseUrl = './bible_data/'; // 假設資料存放在 bible_data 目錄
    }

    // 檢查是否為離線模式
    isOffline() {
        return !navigator.onLine;
    }

    // 獲取網路狀態訊息
    getNetworkStatus() {
        if (this.isOffline()) {
            return '離線模式：僅能使用已快取的資料';
        }
        return '線上模式';
    }

    // 載入指定書卷的指定章節
    async loadChapter(book, chapter) {
        const cacheKey = `${book}_${chapter}`;
        
        // 檢查快取
        if (this.dataCache.has(cacheKey)) {
            return this.dataCache.get(cacheKey);
        }

        // 如果離線且沒有快取，直接使用模擬資料
        if (this.isOffline()) {
            console.warn('離線模式：使用模擬資料');
            const mockData = this.generateMockData(book, chapter);
            this.dataCache.set(cacheKey, mockData);
            return mockData;
        }

        try {
            // 嘗試從本地JSON檔案載入
            const response = await fetch(`${this.baseUrl}${book}/chapter_${chapter}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            // 驗證資料格式
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('資料格式錯誤或章節為空');
            }
            
            // 快取資料
            this.dataCache.set(cacheKey, data);
            
            return data;
        } catch (error) {
            console.warn(`無法載入本地資料 ${book} ${chapter}:`, error);
            
            // 如果本地資料不存在，使用模擬資料
            const mockData = this.generateMockData(book, chapter);
            this.dataCache.set(cacheKey, mockData);
            return mockData;
        }
    }

    // 產生模擬資料（用於開發測試）
    generateMockData(book, chapter) {
        const verses = [];
        const verseCount = this.getVerseCount(book, chapter);
        
        for (let verse = 1; verse <= verseCount; verse++) {
            verses.push({
                book: book,
                chapter: chapter,
                verse: verse,
                versions: {
                    unv: `【和合本】${BIBLE_BOOKS[book]?.chinese || book} ${chapter}:${verse} 的經文內容。這是一段模擬的聖經經文，用來展示網頁的功能和排版效果。`,
                    bklcl: `【白話字】Chit-khoán sī ${BIBLE_BOOKS[book]?.chinese || book} ${chapter}:${verse} ê peh-ōe-jī keng-bûn. Sī chit-tōaⁿ bô̤-gí ê sèng-keng keng-bûn.`,
                    tghg: `【台語漢字】這是 ${BIBLE_BOOKS[book]?.chinese || book} ${chapter}:${verse} 的台語漢字經文。這是一段台語的聖經經文內容。`,
                    bklhl: `【台語羅馬字】Chit-khoán sī ${BIBLE_BOOKS[book]?.chinese || book} ${chapter}:${verse} ê tâi-gí lô-má-jī keng-bûn. Sī chit-tōaⁿ tâi-gí ê sèng-keng keng-bûn.`
                }
            });
        }
        
        return verses;
    }

    // 獲取指定章節的經文節數（簡化版本，實際應該從資料庫或API獲取）
    getVerseCount(book, chapter) {
        // 這裡返回一個合理的節數，實際應該查詢真實的聖經資料
        const commonVerseCounts = {
            1: 31, 2: 25, 3: 24, 4: 26, 5: 32, 6: 22, 7: 24, 8: 22, 9: 29, 10: 32,
            11: 32, 12: 20, 13: 18, 14: 24, 15: 21, 16: 16, 17: 27, 18: 33, 19: 38, 20: 18,
            21: 34, 22: 24, 23: 20, 24: 67, 25: 34, 26: 35, 27: 46, 28: 22
        };
        
        return commonVerseCounts[chapter] || 20;
    }

    // 獲取指定書卷的章數
    getChapterCount(book) {
        return BIBLE_BOOKS[book]?.chapters || 1;
    }

    // 獲取指定章節的最大節數
    async getMaxVerse(book, chapter) {
        try {
            const verses = await this.loadChapter(book, chapter);
            return verses.length;
        } catch (error) {
            console.warn('無法獲取章節資訊:', error);
            return this.getVerseCount(book, chapter);
        }
    }

    // 載入指定的單一經節
    async loadVerse(book, chapter, verse) {
        const verses = await this.loadChapter(book, chapter);
        return verses.find(v => v.verse === verse);
    }

    // 線上抓取資料（如果需要即時抓取）
    async fetchOnlineData(book, chapter) {
        // 構建抓取URL
        const encodedBook = encodeURIComponent(book);
        const url = `https://bible.fhl.net/new/read.php?chineses=${encodedBook}&strongflag=0&SSS=0&nodic=0&VERSION1=unv&VERSION16=bklcl&VERSION27=tghg&VERSION32=bklcl&VERSION33=bklhl&TABFLAG=1&nodic=0&chap=${chapter}`;
        
        try {
            // 注意：由於CORS限制，直接從瀏覽器抓取可能會失敗
            // 實際部署時需要使用代理伺服器或預先抓取資料
            const response = await fetch(url);
            const html = await response.text();
            
            return this.parseHtmlContent(html, book, chapter);
        } catch (error) {
            console.error('線上抓取失敗:', error);
            throw error;
        }
    }

    // 解析HTML內容（簡化版本）
    parseHtmlContent(html, book, chapter) {
        // 這裡應該實作完整的HTML解析邏輯
        // 由於這是一個複雜的過程，這裡只提供基本框架
        console.warn('HTML解析功能需要進一步實作');
        return this.generateMockData(book, chapter);
    }

    // 清除快取
    clearCache() {
        this.dataCache.clear();
    }

    // 預載入常用書卷
    async preloadCommonBooks() {
        const commonBooks = ['太', '可', '路', '約']; // 四福音書
        const promises = [];
        
        for (const book of commonBooks) {
            for (let chapter = 1; chapter <= 3; chapter++) { // 預載入前3章
                promises.push(this.loadChapter(book, chapter));
            }
        }
        
        try {
            await Promise.all(promises);
            console.log('常用書卷預載入完成');
        } catch (error) {
            console.warn('預載入部分失敗:', error);
        }
    }
}

// 匯出給其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BibleDataLoader;
}
