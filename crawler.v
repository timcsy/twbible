// V 語言聖經爬蟲 - 台語聖經資料下載工具
import net.http
import json
import os
import time

// 書卷資訊結構
struct BookInfo {
	chinese   string
	chapters  int
	audio_id  int
}

// 聖經書卷對應表（包含音檔 ID）
fn get_bible_books() map[string]BookInfo {
	return {
		// 舊約
		'創': BookInfo{ chinese: '創世記', chapters: 50, audio_id: 1 }
		'出': BookInfo{ chinese: '出埃及記', chapters: 40, audio_id: 2 }
		'利': BookInfo{ chinese: '利未記', chapters: 27, audio_id: 3 }
		'民': BookInfo{ chinese: '民數記', chapters: 36, audio_id: 4 }
		'申': BookInfo{ chinese: '申命記', chapters: 34, audio_id: 5 }
		'書': BookInfo{ chinese: '約書亞記', chapters: 24, audio_id: 6 }
		'士': BookInfo{ chinese: '士師記', chapters: 21, audio_id: 7 }
		'得': BookInfo{ chinese: '路得記', chapters: 4, audio_id: 8 }
		'撒上': BookInfo{ chinese: '撒母耳記上', chapters: 31, audio_id: 9 }
		'撒下': BookInfo{ chinese: '撒母耳記下', chapters: 24, audio_id: 10 }
		'王上': BookInfo{ chinese: '列王紀上', chapters: 22, audio_id: 11 }
		'王下': BookInfo{ chinese: '列王紀下', chapters: 25, audio_id: 12 }
		'代上': BookInfo{ chinese: '歷代志上', chapters: 29, audio_id: 13 }
		'代下': BookInfo{ chinese: '歷代志下', chapters: 36, audio_id: 14 }
		'拉': BookInfo{ chinese: '以斯拉記', chapters: 10, audio_id: 15 }
		'尼': BookInfo{ chinese: '尼希米記', chapters: 13, audio_id: 16 }
		'斯': BookInfo{ chinese: '以斯帖記', chapters: 10, audio_id: 17 }
		'伯': BookInfo{ chinese: '約伯記', chapters: 42, audio_id: 18 }
		'詩': BookInfo{ chinese: '詩篇', chapters: 150, audio_id: 19 }
		'箴': BookInfo{ chinese: '箴言', chapters: 31, audio_id: 20 }
		'傳': BookInfo{ chinese: '傳道書', chapters: 12, audio_id: 21 }
		'歌': BookInfo{ chinese: '雅歌', chapters: 8, audio_id: 22 }
		'賽': BookInfo{ chinese: '以賽亞書', chapters: 66, audio_id: 23 }
		'耶': BookInfo{ chinese: '耶利米書', chapters: 52, audio_id: 24 }
		'哀': BookInfo{ chinese: '耶利米哀歌', chapters: 5, audio_id: 25 }
		'結': BookInfo{ chinese: '以西結書', chapters: 48, audio_id: 26 }
		'但': BookInfo{ chinese: '但以理書', chapters: 12, audio_id: 27 }
		'何': BookInfo{ chinese: '何西阿書', chapters: 14, audio_id: 28 }
		'珥': BookInfo{ chinese: '約珥書', chapters: 3, audio_id: 29 }
		'摩': BookInfo{ chinese: '阿摩司書', chapters: 9, audio_id: 30 }
		'俄': BookInfo{ chinese: '俄巴底亞書', chapters: 1, audio_id: 31 }
		'拿': BookInfo{ chinese: '約拿書', chapters: 4, audio_id: 32 }
		'彌': BookInfo{ chinese: '彌迦書', chapters: 7, audio_id: 33 }
		'鴻': BookInfo{ chinese: '那鴻書', chapters: 3, audio_id: 34 }
		'哈': BookInfo{ chinese: '哈巴谷書', chapters: 3, audio_id: 35 }
		'番': BookInfo{ chinese: '西番雅書', chapters: 3, audio_id: 36 }
		'該': BookInfo{ chinese: '哈該書', chapters: 2, audio_id: 37 }
		'亞': BookInfo{ chinese: '撒迦利亞書', chapters: 14, audio_id: 38 }
		'瑪': BookInfo{ chinese: '瑪拉基書', chapters: 4, audio_id: 39 }
		
		// 新約
		'太': BookInfo{ chinese: '馬太福音', chapters: 28, audio_id: 40 }
		'可': BookInfo{ chinese: '馬可福音', chapters: 16, audio_id: 41 }
		'路': BookInfo{ chinese: '路加福音', chapters: 24, audio_id: 42 }
		'約': BookInfo{ chinese: '約翰福音', chapters: 21, audio_id: 43 }
		'徒': BookInfo{ chinese: '使徒行傳', chapters: 28, audio_id: 44 }
		'羅': BookInfo{ chinese: '羅馬書', chapters: 16, audio_id: 45 }
		'林前': BookInfo{ chinese: '哥林多前書', chapters: 16, audio_id: 46 }
		'林後': BookInfo{ chinese: '哥林多後書', chapters: 13, audio_id: 47 }
		'加': BookInfo{ chinese: '加拉太書', chapters: 6, audio_id: 48 }
		'弗': BookInfo{ chinese: '以弗所書', chapters: 6, audio_id: 49 }
		'腓': BookInfo{ chinese: '腓立比書', chapters: 4, audio_id: 50 }
		'西': BookInfo{ chinese: '歌羅西書', chapters: 4, audio_id: 51 }
		'帖前': BookInfo{ chinese: '帖撒羅尼迦前書', chapters: 5, audio_id: 52 }
		'帖後': BookInfo{ chinese: '帖撒羅尼迦後書', chapters: 3, audio_id: 53 }
		'提前': BookInfo{ chinese: '提摩太前書', chapters: 6, audio_id: 54 }
		'提後': BookInfo{ chinese: '提摩太後書', chapters: 4, audio_id: 55 }
		'多': BookInfo{ chinese: '提多書', chapters: 3, audio_id: 56 }
		'門': BookInfo{ chinese: '腓利門書', chapters: 1, audio_id: 57 }
		'來': BookInfo{ chinese: '希伯來書', chapters: 13, audio_id: 58 }
		'雅': BookInfo{ chinese: '雅各書', chapters: 5, audio_id: 59 }
		'彼前': BookInfo{ chinese: '彼得前書', chapters: 5, audio_id: 60 }
		'彼後': BookInfo{ chinese: '彼得後書', chapters: 3, audio_id: 61 }
		'約一': BookInfo{ chinese: '約翰一書', chapters: 5, audio_id: 62 }
		'約二': BookInfo{ chinese: '約翰二書', chapters: 1, audio_id: 63 }
		'約三': BookInfo{ chinese: '約翰三書', chapters: 1, audio_id: 64 }
		'猶': BookInfo{ chinese: '猶大書', chapters: 1, audio_id: 65 }
		'啟': BookInfo{ chinese: '啟示錄', chapters: 22, audio_id: 66 }
	}
}

struct VerseData {
mut:
	book     string
	chapter  int
	verse    int
	versions map[string]string
}

// 建立目錄結構
fn ensure_dir(path string) {
	if !os.exists(path) {
		os.mkdir_all(path) or { 
			eprintln('無法建立目錄: ${path}') 
			return
		}
		println('建立目錄: ${path}')
	}
}

// URL 編碼函數
fn url_encode(text string) string {
	// 簡單的 URL 編碼
	encoded := text.replace(' ', '%20')
		.replace('!', '%21')
		.replace('"', '%22')
		.replace('#', '%23')
		.replace('$', '%24')
		.replace('%', '%25')
		.replace('&', '%26')
		.replace("'", '%27')
		.replace('(', '%28')
		.replace(')', '%29')
		.replace('*', '%2A')
		.replace('+', '%2B')
		.replace(',', '%2C')
		.replace('-', '%2D')
		.replace('.', '%2E')
		.replace('/', '%2F')
	return encoded
}

// 從 HTML 中提取文字內容
fn extract_text_from_html(html_content string) string {
	mut text := html_content
	
	// 移除 HTML 標籤
	mut in_tag := false
	mut result := ''
	
	for c in text {
		if c == `<` {
			in_tag = true
		} else if c == `>` {
			in_tag = false
		} else if !in_tag {
			result += c.ascii_str()
		}
	}
	
	// 清理多餘的空白字符
	result = result.replace('&nbsp;', ' ')
		.replace('&lt;', '<')
		.replace('&gt;', '>')
		.replace('&amp;', '&')
		.replace('&quot;', '"')
		.trim_space()
	
	return result
}

// 下載並解析聖經章節資料
fn download_chapter(book string, chapter int) []VerseData {
	// 使用您提供的網頁 URL 格式
	encoded_book := url_encode(book)
	url := 'https://bible.fhl.net/new/read.php?chineses=${encoded_book}&strongflag=0&SSS=0&nodic=0&VERSION1=unv&VERSION16=bklcl&VERSION27=tghg&VERSION32=bklcl&VERSION33=bklhl&TABFLAG=1&nodic=0&chap=${chapter}'
	
	println('下載: ${book} 第${chapter}章 - ${url}')
	
	// 發送 HTTP 請求
	resp := http.get(url) or {
		eprintln('HTTP 請求失敗: ${err}')
		return []VerseData{}
	}
	
	if resp.status_code != 200 {
		eprintln('HTTP 狀態碼錯誤: ${resp.status_code}')
		return []VerseData{}
	}
	
	println('成功取得網頁資料，開始解析 HTML...')
	
	mut verses := []VerseData{}
	html_content := resp.body
	
	// 按 <tr><td align="center"><b> 分割，找到經文行
	tr_parts := html_content.split('<tr><td align="center"><b>')
	
	// 跳過第一個部分（是頭部內容）
	for i in 1..tr_parts.len {
		part := tr_parts[i]
		
		// 尋找節號
		end_b_pos := part.index('</b>') or { continue }
		verse_ref := part[..end_b_pos]
		
		// 解析章節號（格式為 "1:1"）
		if colon_pos := verse_ref.index(':') {
			chapter_str := verse_ref[..colon_pos]
			verse_str := verse_ref[colon_pos+1..]
			
			parsed_chapter := chapter_str.int()
			parsed_verse := verse_str.int()
			
			// 確保章節號正確
			if parsed_chapter == chapter && parsed_verse > 0 {
				mut verse_data := VerseData{
					book: book
					chapter: chapter
					verse: parsed_verse
					versions: map[string]string{}
				}
				
				// 分割出各個 <td> 單元格
				td_parts := part.split('</td><td ')
				
				if td_parts.len >= 5 {
					// 提取各版本內容
					for j in 1..5 { // 只需要前4個版本（和合本、全羅、台漢、漢羅）
						if j < td_parts.len {
							td_content := td_parts[j]
							
							// 找到內容開始位置（跳過屬性）
							mut content_start := 0
							if gt_pos := td_content.index('>') {
								content_start = gt_pos + 1
							}
							
							// 找到內容結束位置
							mut content_end := td_content.len
							if td_end_pos := td_content.index('</td>') {
								content_end = td_end_pos
							}
							
							if content_end > content_start {
								raw_content := td_content[content_start..content_end]
								clean_content := extract_text_from_html(raw_content)
								
								// 根據列的順序分配版本
								match j {
									1 { verse_data.versions['unv'] = clean_content }        // 和合本
									2 { verse_data.versions['bklcl'] = clean_content }      // 巴克禮全羅
									3 { verse_data.versions['tghg'] = clean_content }       // 聖經公會台漢本
									4 { verse_data.versions['bklhl'] = clean_content }      // 巴克禮漢羅
									else { }
								}
							}
						}
					}
					
					verses << verse_data
				}
			}
		}
	}
	
	println('成功解析 ${verses.len} 節經文')
	return verses
}

// 儲存章節資料為 JSON 檔案
fn save_chapter_data(book string, chapter int, verses []VerseData) {
	book_dir := 'bible_data/${book}'
	ensure_dir(book_dir)
	
	file_path := '${book_dir}/chapter_${chapter}.json'
	
	// 轉換為 JSON 格式
	json_data := json.encode(verses)
	
	// 寫入檔案
	os.write_file(file_path, json_data) or {
		eprintln('無法寫入檔案: ${file_path} - ${err}')
		return
	}
	
	println('儲存完成: ${file_path}')
}

// 下載音檔
fn download_audio(book string, chapter int) {
	bible_books := get_bible_books()
	
	// 取得書卷的 audio_id
	book_info := bible_books[book] or {
		eprintln('找不到書卷資訊: ${book}')
		return
	}
	
	audio_id := book_info.audio_id
	
	audio_dir := 'bible_data/audio/${book}'
	ensure_dir(audio_dir)
	
	audio_file := '${audio_dir}/chapter_${chapter}.mp3'
	
	// 如果音檔已存在，跳過下載
	if os.exists(audio_file) {
		println('音檔已存在，跳過: ${audio_file}')
		return
	}
	
	// 使用正確的台語朗讀音檔 URL 格式
	audio_url := 'https://media.fhl.net/wutai/${audio_id}/${audio_id}_${chapter:03d}.mp3'
	
	println('下載音檔: ${book} 第${chapter}章 (audio_id: ${audio_id}) - ${audio_url}')
	
	// 下載音檔
	resp := http.get(audio_url) or {
		eprintln('音檔下載失敗: ${err}')
		return
	}
	
	if resp.status_code != 200 {
		eprintln('音檔 HTTP 狀態碼錯誤: ${resp.status_code}')
		return
	}
	
	// 儲存音檔
	os.write_file(audio_file, resp.body) or {
		eprintln('無法儲存音檔: ${audio_file} - ${err}')
		return
	}
	
	println('音檔儲存完成: ${audio_file}')
}

// 下載單一書卷的所有章節（包含經文和音檔）
fn download_book(book string, download_audio_flag bool) {
	bible_books := get_bible_books()
	
	if book_info := bible_books[book] {
		chapters := book_info.chapters
		println('\n=== 開始下載 ${book} (${book_info.chinese}) - 共 ${chapters} 章 ===')
		
		for chapter in 1 .. chapters + 1 {
			// 下載經文資料
			verses := download_chapter(book, chapter)
			
			if verses.len > 0 {
				save_chapter_data(book, chapter, verses)
			}
			
			// 下載音檔（如果啟用）
			if download_audio_flag {
				download_audio(book, chapter)
			}
			
			// 添加延遲避免過於頻繁的請求
			time.sleep(800 * time.millisecond)
		}
		
		println('=== ${book} 下載完成 ===\n')
	} else {
		eprintln('找不到書卷: ${book}')
	}
}

// 主函數
fn main() {
	println('台語聖經資料爬蟲啟動')
	println('使用方法: v run crawler.v [書卷名稱] [選項]')
	println('例如: v run crawler.v 太')
	println('下載音檔: v run crawler.v 太 --audio')
	println('留空下載所有書卷: v run crawler.v')
	println('下載所有書卷含音檔: v run crawler.v --audio')
	println('')
	
	// 建立基本目錄結構
	ensure_dir('bible_data')
	ensure_dir('bible_data/audio')
	
	args := os.args[1..]
	
	// 檢查是否要下載音檔
	mut download_audio_flag := false
	mut book_name := ''
	
	for arg in args {
		if arg == '--audio' || arg == '-a' {
			download_audio_flag = true
		} else if !arg.starts_with('-') {
			book_name = arg
		}
	}
	
	if download_audio_flag {
		println('🎵 音檔下載模式已啟用')
	}
	
	if book_name == '' {
		// 下載所有書卷
		println('開始下載所有聖經書卷...')
		
		// 優先下載舊約
		old_testament := ['創', '出', '利', '民', '申', '書', '士', '得', '撒上', '撒下',
		                  '王上', '王下', '代上', '代下', '拉', '尼', '斯', '伯', '詩', '箴',
		                  '傳', '歌', '賽', '耶', '哀', '結', '但', '何', '珥', '摩', '俄',
		                  '拿', '彌', '鴻', '哈', '番', '該', '亞', '瑪']
		
		for book in old_testament {
			download_book(book, download_audio_flag)
		}
		
		// 然後下載新約
		new_testament := ['太', '可', '路', '約', '徒', '羅', '林前', '林後', '加', '弗', 
		                  '腓', '西', '帖前', '帖後', '提前', '提後', '多', '門', '來', 
		                  '雅', '彼前', '彼後', '約一', '約二', '約三', '猶', '啟']
		
		for book in new_testament {
			download_book(book, download_audio_flag)
		}
		
	} else {
		// 下載指定書卷
		download_book(book_name, download_audio_flag)
	}
	
	println('下載完成！')
}
