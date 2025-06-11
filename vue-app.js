// Vue.js 應用程式 - 台語聖經朗讀
const { createApp } = Vue;

// 聖經書卷對應表（新舊約全書66卷）
const BIBLE_BOOKS = {
    // 舊約
    '創': { chinese: '創世記', short: '創世記', english: 'Genesis', chapters: 50 },
    '出': { chinese: '出埃及記', short: '出埃及', english: 'Exodus', chapters: 40 },
    '利': { chinese: '利未記', short: '利未記', english: 'Leviticus', chapters: 27 },
    '民': { chinese: '民數記', short: '民數記', english: 'Numbers', chapters: 36 },
    '申': { chinese: '申命記', short: '申命記', english: 'Deuteronomy', chapters: 34 },
    '書': { chinese: '約書亞記', short: '約書亞', english: 'Joshua', chapters: 24 },
    '士': { chinese: '士師記', short: '士師記', english: 'Judges', chapters: 21 },
    '得': { chinese: '路得記', short: '路得記', english: 'Ruth', chapters: 4 },
    '撒上': { chinese: '撒母耳記上', short: '撒上', english: '1 Samuel', chapters: 31 },
    '撒下': { chinese: '撒母耳記下', short: '撒下', english: '2 Samuel', chapters: 24 },
    '王上': { chinese: '列王紀上', short: '王上', english: '1 Kings', chapters: 22 },
    '王下': { chinese: '列王紀下', short: '王下', english: '2 Kings', chapters: 25 },
    '代上': { chinese: '歷代志上', short: '代上', english: '1 Chronicles', chapters: 29 },
    '代下': { chinese: '歷代志下', short: '代下', english: '2 Chronicles', chapters: 36 },
    '拉': { chinese: '以斯拉記', short: '以斯拉', english: 'Ezra', chapters: 10 },
    '尼': { chinese: '尼希米記', short: '尼希米', english: 'Nehemiah', chapters: 13 },
    '斯': { chinese: '以斯帖記', short: '以斯帖', english: 'Esther', chapters: 10 },
    '伯': { chinese: '約伯記', short: '約伯記', english: 'Job', chapters: 42 },
    '詩': { chinese: '詩篇', short: '詩篇', english: 'Psalms', chapters: 150 },
    '箴': { chinese: '箴言', short: '箴言', english: 'Proverbs', chapters: 31 },
    '傳': { chinese: '傳道書', short: '傳道書', english: 'Ecclesiastes', chapters: 12 },
    '歌': { chinese: '雅歌', short: '雅歌', english: 'Song of Songs', chapters: 8 },
    '賽': { chinese: '以賽亞書', short: '以賽亞', english: 'Isaiah', chapters: 66 },
    '耶': { chinese: '耶利米書', short: '耶利米', english: 'Jeremiah', chapters: 52 },
    '哀': { chinese: '耶利米哀歌', short: '哀歌', english: 'Lamentations', chapters: 5 },
    '結': { chinese: '以西結書', short: '以西結', english: 'Ezekiel', chapters: 48 },
    '但': { chinese: '但以理書', short: '但以理', english: 'Daniel', chapters: 12 },
    '何': { chinese: '何西阿書', short: '何西阿', english: 'Hosea', chapters: 14 },
    '珥': { chinese: '約珥書', short: '約珥書', english: 'Joel', chapters: 3 },
    '摩': { chinese: '阿摩司書', short: '阿摩司', english: 'Amos', chapters: 9 },
    '俄': { chinese: '俄巴底亞書', short: '俄巴底', english: 'Obadiah', chapters: 1 },
    '拿': { chinese: '約拿書', short: '約拿書', english: 'Jonah', chapters: 4 },
    '彌': { chinese: '彌迦書', short: '彌迦書', english: 'Micah', chapters: 7 },
    '鴻': { chinese: '那鴻書', short: '那鴻書', english: 'Nahum', chapters: 3 },
    '哈': { chinese: '哈巴谷書', short: '哈巴谷', english: 'Habakkuk', chapters: 3 },
    '番': { chinese: '西番雅書', short: '西番雅', english: 'Zephaniah', chapters: 3 },
    '該': { chinese: '哈該書', short: '哈該書', english: 'Haggai', chapters: 2 },
    '亞': { chinese: '撒迦利亞書', short: '撒迦利', english: 'Zechariah', chapters: 14 },
    '瑪': { chinese: '瑪拉基書', short: '瑪拉基', english: 'Malachi', chapters: 4 },
    // 新約
    '太': { chinese: '馬太福音', short: '馬太', english: 'Matthew', chapters: 28 },
    '可': { chinese: '馬可福音', short: '馬可', english: 'Mark', chapters: 16 },
    '路': { chinese: '路加福音', short: '路加', english: 'Luke', chapters: 24 },
    '約': { chinese: '約翰福音', short: '約翰', english: 'John', chapters: 21 },
    '徒': { chinese: '使徒行傳', short: '使徒行傳', english: 'Acts', chapters: 28 },
    '羅': { chinese: '羅馬書', short: '羅馬書', english: 'Romans', chapters: 16 },
    '林前': { chinese: '哥林多前書', short: '林前', english: '1 Corinthians', chapters: 16 },
    '林後': { chinese: '哥林多後書', short: '林後', english: '2 Corinthians', chapters: 13 },
    '加': { chinese: '加拉太書', short: '加拉太', english: 'Galatians', chapters: 6 },
    '弗': { chinese: '以弗所書', short: '以弗所', english: 'Ephesians', chapters: 6 },
    '腓': { chinese: '腓立比書', short: '腓立比', english: 'Philippians', chapters: 4 },
    '西': { chinese: '歌羅西書', short: '歌羅西', english: 'Colossians', chapters: 4 },
    '帖前': { chinese: '帖撒羅尼迦前書', short: '帖前', english: '1 Thessalonians', chapters: 5 },
    '帖後': { chinese: '帖撒羅尼迦後書', short: '帖後', english: '2 Thessalonians', chapters: 3 },
    '提前': { chinese: '提摩太前書', short: '提前', english: '1 Timothy', chapters: 6 },
    '提後': { chinese: '提摩太後書', short: '提後', english: '2 Timothy', chapters: 4 },
    '多': { chinese: '提多書', short: '提多書', english: 'Titus', chapters: 3 },
    '門': { chinese: '腓利門書', short: '腓利門', english: 'Philemon', chapters: 1 },
    '來': { chinese: '希伯來書', short: '希伯來', english: 'Hebrews', chapters: 13 },
    '雅': { chinese: '雅各書', short: '雅各書', english: 'James', chapters: 5 },
    '彼前': { chinese: '彼得前書', short: '彼前', english: '1 Peter', chapters: 5 },
    '彼後': { chinese: '彼得後書', short: '彼後', english: '2 Peter', chapters: 3 },
    '約一': { chinese: '約翰一書', short: '約一', english: '1 John', chapters: 5 },
    '約二': { chinese: '約翰二書', short: '約二', english: '2 John', chapters: 1 },
    '約三': { chinese: '約翰三書', short: '約三', english: '3 John', chapters: 1 },
    '猶': { chinese: '猶大書', short: '猶大書', english: 'Jude', chapters: 1 },
    '啟': { chinese: '啟示錄', short: '啟示錄', english: 'Revelation', chapters: 22 }
};

// 書卷ID對應表（用於音檔路徑）
const BOOK_ID_MAP = {
    // 舊約 (39卷) - book_id 1-39
    '創': { book_id: 1 },
    '出': { book_id: 2 },
    '利': { book_id: 3 },
    '民': { book_id: 4 },
    '申': { book_id: 5 },
    '書': { book_id: 6 },
    '士': { book_id: 7 },
    '得': { book_id: 8 },
    '撒上': { book_id: 9 },
    '撒下': { book_id: 10 },
    '王上': { book_id: 11 },
    '王下': { book_id: 12 },
    '代上': { book_id: 13 },
    '代下': { book_id: 14 },
    '拉': { book_id: 15 },
    '尼': { book_id: 16 },
    '斯': { book_id: 17 },
    '伯': { book_id: 18 },
    '詩': { book_id: 19 },
    '箴': { book_id: 20 },
    '傳': { book_id: 21 },
    '歌': { book_id: 22 },
    '賽': { book_id: 23 },
    '耶': { book_id: 24 },
    '哀': { book_id: 25 },
    '結': { book_id: 26 },
    '但': { book_id: 27 },
    '何': { book_id: 28 },
    '珥': { book_id: 29 },
    '摩': { book_id: 30 },
    '俄': { book_id: 31 },
    '拿': { book_id: 32 },
    '彌': { book_id: 33 },
    '鴻': { book_id: 34 },
    '哈': { book_id: 35 },
    '番': { book_id: 36 },
    '該': { book_id: 37 },
    '亞': { book_id: 38 },
    '瑪': { book_id: 39 },
    // 新約 (27卷) - book_id 40-66
    '太': { book_id: 40 },
    '可': { book_id: 41 },
    '路': { book_id: 42 },
    '約': { book_id: 43 },
    '徒': { book_id: 44 },
    '羅': { book_id: 45 },
    '林前': { book_id: 46 },
    '林後': { book_id: 47 },
    '加': { book_id: 48 },
    '弗': { book_id: 49 },
    '腓': { book_id: 50 },
    '西': { book_id: 51 },
    '帖前': { book_id: 52 },
    '帖後': { book_id: 53 },
    '提前': { book_id: 54 },
    '提後': { book_id: 55 },
    '多': { book_id: 56 },
    '門': { book_id: 57 },
    '來': { book_id: 58 },
    '雅': { book_id: 59 },
    '彼前': { book_id: 60 },
    '彼後': { book_id: 61 },
    '約一': { book_id: 62 },
    '約二': { book_id: 63 },
    '約三': { book_id: 64 },
    '猶': { book_id: 65 },
    '啟': { book_id: 66 }
};

createApp({
    data() {
        return {
            // 聖經數據
            bibleBooks: BIBLE_BOOKS,
            bookIdMap: BOOK_ID_MAP,
            
            // 當前狀態
            selectedBook: '',
            inputChapter: 1,
            inputVerse: 1,
            currentBook: '',
            currentChapter: 1,
            currentVerse: null,
            currentChapterData: null, // 儲存當前章節的所有經文數據
            preloadedChapterData: null, // 預載的章節資料（用於經節選擇）
            
            // 音檔控制
            audioSrc: '',
            audioTitle: '請選擇章節播放音檔',
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            progressPercent: 0,
            currentAudioBook: '', // 當前載入音檔的書卷
            currentAudioChapter: 0, // 當前載入音檔的章節
            playbackRate: 1.0, // 播放速度
            showSpeedSettings: false, // 顯示速度設定
            
            // UI 狀態
            loading: false,
            showHelp: false,
            showBookmarks: false,
            isDarkTheme: false,
            networkStatus: '在線',
            
            // 書籤
            bookmarks: [],
            bookmarkName: '',
            
            // 歷史紀錄
            history: [],
            showHistory: false, // 預設顯示書籤頁面
            
            // 資料載入器
            dataLoader: null
        };
    },
    
    computed: {
        currentReference() {
            if (!this.currentVerse) return '';
            return `${this.bibleBooks[this.currentBook]?.chinese || this.currentBook} ${this.currentChapter}:${this.currentVerse.verse}`;
        },
        
        currentBookName() {
            if (!this.currentBook) return '';
            return this.bibleBooks[this.currentBook]?.chinese || this.currentBook;
        },
        
        currentVerseReference() {
            if (!this.currentVerse) return '';
            return `${this.currentChapter}:${this.currentVerse.verse}`;
        },
        
        canGoPrevious() {
            return this.currentVerse && this.currentVerse.verse > 1;
        },
        
        canGoNext() {
            if (!this.currentVerse || !this.currentBook || !this.currentChapterData) return false;
            
            // 檢查當前經文是否是該章的最後一節
            const maxVerse = Math.max(...this.currentChapterData.map(v => v.verse));
            return this.currentVerse.verse < maxVerse;
        },
        
        canGoPreviousChapter() {
            return this.currentBook && this.currentChapter > 1;
        },
        
        canGoNextChapter() {
            if (!this.currentBook) return false;
            const bookInfo = this.bibleBooks[this.currentBook];
            return bookInfo && this.currentChapter < bookInfo.chapters;
        },
        
        // 可用章節列表
        availableChapters() {
            if (!this.selectedBook) return [];
            const bookInfo = this.bibleBooks[this.selectedBook];
            if (!bookInfo) return [];
            
            const chapters = [];
            for (let i = 1; i <= bookInfo.chapters; i++) {
                chapters.push(i);
            }
            return chapters;
        },
        
        // 可用經節列表
        availableVerses() {
            if (!this.selectedBook || !this.inputChapter) return [];
            
            // 如果有當前章節的資料，使用實際的經節數
            if (this.currentChapterData && this.currentBook === this.selectedBook && this.currentChapter === this.inputChapter) {
                return this.currentChapterData.map(v => v.verse).sort((a, b) => a - b);
            }
            
            // 如果有預載的章節資料，使用它
            if (this.preloadedChapterData && this.selectedBook && this.inputChapter) {
                return this.preloadedChapterData.map(v => v.verse).sort((a, b) => a - b);
            }
            
            // 否則使用預設的經節數（簡化版，實際應該從資料獲取）
            const defaultVerseCount = this.getEstimatedVerseCount(this.selectedBook, this.inputChapter);
            const verses = [];
            for (let i = 1; i <= defaultVerseCount; i++) {
                verses.push(i);
            }
            return verses;
        },
        
        // 格式化的歷史紀錄（按日期分組）
        groupedHistory() {
            if (!this.history || this.history.length === 0) return [];
            
            const groups = {};
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
            
            this.history.forEach(item => {
                const itemDate = new Date(item.timestamp);
                const itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
                
                let groupKey;
                if (itemDay.getTime() === today.getTime()) {
                    groupKey = '今天';
                } else if (itemDay.getTime() === yesterday.getTime()) {
                    groupKey = '昨天';
                } else {
                    groupKey = itemDate.toLocaleDateString('zh-TW');
                }
                
                if (!groups[groupKey]) {
                    groups[groupKey] = [];
                }
                groups[groupKey].push(item);
            });
            
            // 轉換為數組並排序
            return Object.keys(groups).map(date => ({
                date: date,
                items: groups[date]
            })).sort((a, b) => {
                // 特殊處理今天和昨天
                if (a.date === '今天') return -1;
                if (b.date === '今天') return 1;
                if (a.date === '昨天') return -1;
                if (b.date === '昨天') return 1;
                return new Date(b.date) - new Date(a.date);
            });
        }
    },
    
    mounted() {
        this.initializeApp();
        this.setupKeyboardShortcuts();
        this.loadBookmarks();
        this.loadHistoryFromStorage();
        this.loadPlaybackSettings();
        this.loadTheme();
        
        // 預設載入太1:1用於測試
        this.selectedBook = '太';
        this.inputChapter = 1;
        this.inputVerse = 1;
    },
    
    methods: {
        async initializeApp() {
            console.log('初始化台語聖經朗讀應用程式...');
            
            // 初始化資料載入器
            if (typeof BibleDataLoader !== 'undefined') {
                this.dataLoader = new BibleDataLoader();
            }
            
            // 檢查網路狀態
            this.checkNetworkStatus();
            
            console.log('應用程式初始化完成');
        },
        
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // 如果在輸入框中，不處理快捷鍵
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
                
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (e.ctrlKey || e.metaKey) {
                            // Ctrl/Cmd + ← : 上一章
                            this.previousChapter();
                        } else {
                            // ← : 上一節
                            this.previousVerse();
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (e.ctrlKey || e.metaKey) {
                            // Ctrl/Cmd + → : 下一章
                            this.nextChapter();
                        } else {
                            // → : 下一節
                            this.nextVerse();
                        }
                        break;
                    case ' ':
                        e.preventDefault();
                        this.togglePlay();
                        break;
                    case 's':
                    case 'S':
                        e.preventDefault();
                        this.stopAudio();
                        break;
                    case 'Enter':
                        if (!e.target.closest('.modal')) {
                            e.preventDefault();
                            this.loadVerse();
                        }
                        break;
                    case 'Escape':
                        // ESC 鍵關閉打開的設定面板
                        e.preventDefault();
                        this.showSpeedSettings = false;
                        this.showBookmarks = false;
                        this.showHelp = false;
                        break;
                }
            });
            
            // 點擊外部關閉速度設定面板
            document.addEventListener('click', (e) => {
                if (this.showSpeedSettings && !e.target.closest('.speed-settings') && !e.target.closest('[title="播放速度設定"]')) {
                    this.showSpeedSettings = false;
                }
            });
        },
        
        checkNetworkStatus() {
            this.networkStatus = navigator.onLine ? '在線' : '離線';
            
            window.addEventListener('online', () => {
                this.networkStatus = '在線';
            });
            
            window.addEventListener('offline', () => {
                this.networkStatus = '離線';
            });
        },
        
        async onBookChange() {
            if (this.selectedBook) {
                this.inputChapter = 1;
                this.inputVerse = 1;
            }
        },
        
        async onChapterChange() {
            if (this.selectedBook && this.inputChapter) {
                this.inputVerse = 1;
                
                // 嘗試載入章節資料以更新可用經節列表
                try {
                    if (this.dataLoader) {
                        const chapterData = await this.dataLoader.loadChapter(this.selectedBook, this.inputChapter);
                        if (chapterData && chapterData.length > 0) {
                            // 暫存章節資料供 availableVerses 使用
                            this.preloadedChapterData = chapterData;
                        } else {
                            this.preloadedChapterData = null;
                        }
                    }
                } catch (error) {
                    console.warn('預載章節資料失敗:', error);
                    this.preloadedChapterData = null;
                }
            }
        },
        
        async loadVerse() {
            if (!this.selectedBook || !this.inputChapter) {
                alert('請選擇書卷和章節');
                return;
            }
            
            this.loading = true;
            
            try {
                const book = this.selectedBook;
                const chapter = this.inputChapter;
                const verse = this.inputVerse || 1;
                
                console.log(`載入 ${book} ${chapter}:${verse}`);
                
                // 使用資料載入器載入經文
                let verseData = null;
                let chapterData = null;
                if (this.dataLoader) {
                    try {
                        // 載入整章數據以便檢查章節邊界
                        chapterData = await this.dataLoader.loadChapter(book, chapter);
                        if (chapterData && chapterData.length > 0) {
                            verseData = chapterData.find(v => v.verse === verse);
                        }
                    } catch (error) {
                        console.warn('資料載入器載入失敗:', error);
                    }
                }
                
                if (!verseData) {
                    // 如果沒有資料載入器或載入失敗，使用預設資料
                    verseData = this.createDefaultVerseData(book, chapter, verse);
                    // 為預設資料創建簡單的章節數據
                    chapterData = [verseData];
                }
                
                this.currentBook = book;
                this.currentChapter = chapter;
                this.currentVerse = verseData;
                this.currentChapterData = chapterData; // 儲存章節數據
                
                // 添加到歷史紀錄
                this.addToHistory(book, chapter, verse);
                
                // 檢查是否需要載入新的音檔（章節改變時）
                if (this.currentAudioBook !== book || this.currentAudioChapter !== chapter) {
                    this.loadChapterAudio(book, chapter);
                }
                
                console.log('經文載入完成:', verseData);
                
            } catch (error) {
                console.error('載入經文時發生錯誤:', error);
                alert('載入失敗，請檢查網路連線或稍後再試');
            } finally {
                this.loading = false;
            }
        },
        
        createDefaultVerseData(book, chapter, verse) {
            return {
                book: book,
                chapter: chapter,
                verse: verse,
                versions: {
                    bklcl: `${book} ${chapter}:${verse} 白話字版本（請使用爬蟲程式下載實際內容）`,
                    bklhl: `${book} ${chapter}:${verse} 台語羅馬字版本（請使用爬蟲程式下載實際內容）`,
                    tghg: `${book} ${chapter}:${verse} 台語漢字版本（請使用爬蟲程式下載實際內容）`,
                    unv: `${book} ${chapter}:${verse} 和合本版本（請使用爬蟲程式下載實際內容）`
                }
            };
        },
        
        // 估算章節的經節數（簡化版本）
        getEstimatedVerseCount(book, chapter) {
            // 這是一個簡化的估算，實際應該從資料庫或API獲取
            // 大部分聖經章節都在20-50節之間
            if (book === '詩' && chapter === 119) return 176; // 詩篇119篇是最長的
            if (book === '詩') return 30; // 詩篇平均較長
            if (book === '箴') return 35; // 箴言也較長
            if (['太', '可', '路', '約'].includes(book)) return 40; // 福音書
            if (['創', '出', '利', '民', '申'].includes(book)) return 35; // 摩西五經
            
            return 25; // 默認值
        },
        
        async loadChapterAudio(book, chapter) {
            const bookInfo = this.bookIdMap[book];
            if (!bookInfo) {
                console.warn(`找不到書卷 ${book} 的ID對應`);
                return;
            }
            
            const bookId = bookInfo.book_id;
            const localAudioUrl = `bible_data/audio/${book}/chapter_${chapter}.mp3`;
            
            // 停止當前播放
            this.stopAudio();
            
            // 設定基本資訊
            this.audioTitle = `${this.bibleBooks[book]?.chinese || book}`;
            this.currentAudioBook = book;
            this.currentAudioChapter = chapter;
            
            // 嘗試載入音檔
            try {
                const audioSrc = await this.getAudioSource(book, chapter, localAudioUrl, bookId);
                if (audioSrc) {
                    this.audioSrc = audioSrc;
                    console.log(`載入音檔: ${audioSrc}`);
                    
                    // 更新audio元素的src
                    this.$nextTick(() => {
                        if (this.$refs.audioPlayer) {
                            this.$refs.audioPlayer.src = this.audioSrc;
                            this.$refs.audioPlayer.load();
                            
                            // 添加錯誤處理
                            this.$refs.audioPlayer.addEventListener('error', (e) => {
                                console.warn(`音檔載入失敗 (${this.audioSrc}):`, e);
                            }, { once: true });
                            
                            this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
                                console.log(`音檔載入成功: ${this.audioSrc}`);
                            }, { once: true });
                        }
                    });
                } else {
                    console.warn(`無法載入音檔: ${book} 第${chapter}章`);
                    this.audioSrc = '';
                }
            } catch (error) {
                console.error('載入音檔時發生錯誤:', error);
                this.audioSrc = '';
            }
        },
        
        async getAudioSource(book, chapter, localUrl, bookId) {
            // 首先嘗試本地音檔
            try {
                const response = await fetch(localUrl, { method: 'HEAD' });
                if (response.ok) {
                    console.log(`使用本地音檔: ${localUrl}`);
                    return localUrl;
                }
            } catch (error) {
                console.log(`本地音檔不存在: ${localUrl}`);
            }
            
            // 如果本地音檔不存在，直接返回線上音檔URL
            // 不進行HEAD檢查，因為跨域限制可能導致檢查失敗
            const onlineAudioUrl = `https://media.fhl.net/wutai/${bookId}/${bookId}_${chapter.toString().padStart(3, '0')}.mp3`;
            console.log(`嘗試使用線上音檔: ${onlineAudioUrl}`);
            
            // 直接返回線上URL，讓audio元素自己處理載入
            return onlineAudioUrl;
        },
        
        async togglePlay() {
            if (!this.audioSrc) return;
            
            const audio = this.$refs.audioPlayer;
            if (!audio) return;
            
            if (this.isPlaying) {
                audio.pause();
            } else {
                try {
                    await audio.play();
                } catch (error) {
                    console.error('播放音檔失敗:', error);
                    
                    // 如果播放失敗，嘗試重新載入音檔（可能需要切換到線上版本）
                    if (this.currentAudioBook && this.currentAudioChapter) {
                        console.log('嘗試重新載入音檔...');
                        await this.loadChapterAudio(this.currentAudioBook, this.currentAudioChapter);
                        
                        // 重新載入後再次嘗試播放
                        if (this.audioSrc) {
                            try {
                                await audio.play();
                                return;
                            } catch (retryError) {
                                console.error('重新載入後仍無法播放:', retryError);
                            }
                        }
                    }
                    
                    alert('音檔播放失敗，本地和線上音檔可能都無法存取');
                }
            }
        },
        
        stopAudio() {
            const audio = this.$refs.audioPlayer;
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            this.isPlaying = false;
            this.currentTime = 0;
            this.progressPercent = 0;
        },
        
        seekAudio(event) {
            const audio = this.$refs.audioPlayer;
            if (!audio || !this.duration) return;
            
            // 確保我們總是使用進度條容器來計算位置
            let progressBar = event.target;
            if (!progressBar.classList.contains('progress-bar')) {
                progressBar = progressBar.closest('.progress-bar');
            }
            
            if (!progressBar) return;
            
            const rect = progressBar.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const newTime = percent * this.duration;
            
            audio.currentTime = newTime;
        },
        
        onAudioLoaded() {
            const audio = this.$refs.audioPlayer;
            if (audio) {
                this.duration = audio.duration;
                // 應用播放速度設定
                audio.playbackRate = this.playbackRate;
                console.log(`音檔載入完成: ${this.audioSrc}, 時長: ${audio.duration.toFixed(2)}秒, 播放速度: ${this.playbackRate}x`);
            }
        },
        
        onTimeUpdate() {
            const audio = this.$refs.audioPlayer;
            if (audio) {
                this.currentTime = audio.currentTime;
                this.progressPercent = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
            }
        },
        
        onAudioEnded() {
            this.isPlaying = false;
            this.currentTime = 0;
            this.progressPercent = 0;
        },
        
        onAudioError(event) {
            console.error('音檔播放錯誤:', event);
            const audio = this.$refs.audioPlayer;
            if (audio && audio.error) {
                console.error('音檔錯誤詳情:', {
                    code: audio.error.code,
                    message: audio.error.message,
                    src: audio.src
                });
            }
        },
        
        onAudioLoadStart() {
            console.log('開始載入音檔:', this.audioSrc);
        },
        
        onAudioCanPlay() {
            console.log('音檔可以播放:', this.audioSrc);
        },
        
        // 播放速度控制
        setPlaybackRate(rate) {
            this.playbackRate = rate;
            const audio = this.$refs.audioPlayer;
            if (audio) {
                audio.playbackRate = rate;
            }
            this.showSpeedSettings = false;
            this.savePlaybackSettings();
        },
        
        toggleSpeedSettings() {
            this.showSpeedSettings = !this.showSpeedSettings;
        },
        
        savePlaybackSettings() {
            try {
                localStorage.setItem('taiwanese-bible-playback-rate', this.playbackRate.toString());
            } catch (error) {
                console.error('儲存播放設定失敗:', error);
            }
        },
        
        loadPlaybackSettings() {
            try {
                const saved = localStorage.getItem('taiwanese-bible-playback-rate');
                if (saved) {
                    this.playbackRate = parseFloat(saved);
                    // 如果有音檔正在播放，立即應用設定
                    const audio = this.$refs.audioPlayer;
                    if (audio) {
                        audio.playbackRate = this.playbackRate;
                    }
                }
            } catch (error) {
                console.error('載入播放設定失敗:', error);
            }
        },
        
        formatTime(seconds) {
            if (!seconds || isNaN(seconds)) return '0:00';
            
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        },
        
        async previousVerse() {
            if (!this.canGoPrevious) return;
            
            this.inputVerse = this.currentVerse.verse - 1;
            await this.loadVerse();
        },
        
        async nextVerse() {
            if (!this.canGoNext) return;
            
            // 檢查下一節是否存在於當前章節數據中
            const nextVerseNum = this.currentVerse.verse + 1;
            const nextVerseExists = this.currentChapterData && 
                                  this.currentChapterData.some(v => v.verse === nextVerseNum);
            
            if (nextVerseExists) {
                this.inputVerse = nextVerseNum;
                await this.loadVerse();
            }
        },
        
        async previousChapter() {
            if (!this.canGoPreviousChapter) return;
            
            this.inputChapter = this.currentChapter - 1;
            this.inputVerse = 1; // 回到第一節
            await this.loadVerse();
        },
        
        async nextChapter() {
            if (!this.canGoNextChapter) return;
            
            this.inputChapter = this.currentChapter + 1;
            this.inputVerse = 1; // 回到第一節
            await this.loadVerse();
        },
        
        // 書籤功能
        addBookmark() {
            if (!this.currentVerse) return;
            
            const bookmark = {
                book: this.currentBook,
                chapter: this.currentChapter,
                verse: this.currentVerse.verse,
                reference: this.currentReference,
                name: this.bookmarkName || this.currentReference,
                timestamp: Date.now()
            };
            
            this.bookmarks.unshift(bookmark);
            this.saveBookmarks();
            this.bookmarkName = '';
            
            alert('書籤已新增');
        },
        
        removeBookmark(index) {
            if (confirm('確定要刪除這個書籤嗎？')) {
                this.bookmarks.splice(index, 1);
                this.saveBookmarks();
            }
        },
        
        async loadBookmark(bookmark) {
            this.selectedBook = bookmark.book;
            this.inputChapter = bookmark.chapter;
            this.inputVerse = bookmark.verse;
            this.showBookmarks = false;
            
            await this.loadVerse();
        },
        
        saveBookmarks() {
            try {
                localStorage.setItem('taiwanese-bible-bookmarks', JSON.stringify(this.bookmarks));
            } catch (error) {
                console.error('儲存書籤失敗:', error);
            }
        },
        
        loadBookmarks() {
            try {
                const saved = localStorage.getItem('taiwanese-bible-bookmarks');
                if (saved) {
                    this.bookmarks = JSON.parse(saved);
                }
            } catch (error) {
                console.error('載入書籤失敗:', error);
                this.bookmarks = [];
            }
        },
        
        // 歷史紀錄功能
        addToHistory(book, chapter, verse) {
            const historyItem = {
                book: book,
                chapter: chapter,
                verse: verse,
                reference: `${this.bibleBooks[book]?.chinese || book} ${chapter}:${verse}`,
                timestamp: Date.now(),
                date: new Date().toLocaleString('zh-TW')
            };
            
            // 檢查是否已存在相同的紀錄，如果存在則更新時間戳
            const existingIndex = this.history.findIndex(item => 
                item.book === book && item.chapter === chapter && item.verse === verse
            );
            
            if (existingIndex !== -1) {
                // 更新現有紀錄的時間戳並移到最前面
                this.history.splice(existingIndex, 1);
            }
            
            // 將新紀錄加到最前面
            this.history.unshift(historyItem);
            
            // 限制歷史紀錄數量（最多保留100筆）
            if (this.history.length > 100) {
                this.history = this.history.slice(0, 100);
            }
            
            this.saveHistory();
        },
        
        async loadHistory(historyItem) {
            this.selectedBook = historyItem.book;
            this.inputChapter = historyItem.chapter;
            this.inputVerse = historyItem.verse;
            this.showBookmarks = false;
            
            await this.loadVerse();
        },
        
        removeHistoryItem(index) {
            if (confirm('確定要刪除這個歷史紀錄嗎？')) {
                this.history.splice(index, 1);
                this.saveHistory();
            }
        },
        
        clearHistory() {
            if (confirm('確定要清空所有歷史紀錄嗎？')) {
                this.history = [];
                this.saveHistory();
            }
        },
        
        saveHistory() {
            try {
                localStorage.setItem('taiwanese-bible-history', JSON.stringify(this.history));
            } catch (error) {
                console.error('儲存歷史紀錄失敗:', error);
            }
        },
        
        loadHistoryFromStorage() {
            try {
                const saved = localStorage.getItem('taiwanese-bible-history');
                if (saved) {
                    this.history = JSON.parse(saved);
                }
            } catch (error) {
                console.error('載入歷史紀錄失敗:', error);
                this.history = [];
            }
        },
        
        // 主題切換
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            document.body.classList.toggle('dark-theme', this.isDarkTheme);
            this.saveTheme();
        },
        
        saveTheme() {
            try {
                localStorage.setItem('taiwanese-bible-theme', this.isDarkTheme ? 'dark' : 'light');
            } catch (error) {
                console.error('儲存主題設定失敗:', error);
            }
        },
        
        loadTheme() {
            try {
                const saved = localStorage.getItem('taiwanese-bible-theme');
                if (saved === 'dark') {
                    this.isDarkTheme = true;
                    document.body.classList.add('dark-theme');
                }
            } catch (error) {
                console.error('載入主題設定失敗:', error);
            }
        },
        
        // 格式化相對時間
        formatRelativeTime(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            
            // 轉換為分鐘
            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (minutes < 1) {
                return '剛剛';
            } else if (minutes < 60) {
                return `${minutes}分鐘前`;
            } else if (hours < 24) {
                return `${hours}小時前`;
            } else if (days < 7) {
                return `${days}天前`;
            } else {
                // 超過一週顯示具體日期
                return new Date(timestamp).toLocaleDateString('zh-TW');
            }
        }
    }
}).mount('#app');
