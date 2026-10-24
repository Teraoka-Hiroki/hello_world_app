/**
 * storageService.js
 * ブラウザ LocalStorage による完全フロントエンド履歴・メモ管理モジュール
 * サーバーへデータを一切送信しないため、プライバシーとセキュリティが100%保護されます。
 */

const STORAGE_KEYS = {
  NOTES: 'shihyou_app_notes_v1',
  DRAFT: 'shihyou_app_draft_v1',
  USER_PREFS: 'shihyou_app_prefs_v1',
  HISTORY_LOG: 'shihyou_app_history_log_v1',
};

/** 探究メモ一覧を取得 */
export function getSavedNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load notes from localStorage', e);
    return [];
  }
}

/** 探究メモを保存 */
export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes to localStorage', e);
  }
}

/** メモを1件追加または更新 */
export function upsertNote(note) {
  const notes = getSavedNotes();
  const existingIdx = notes.findIndex(n => n.id === note.id);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    notes[existingIdx] = {
      ...notes[existingIdx],
      ...note,
      updatedAt: now,
    };
  } else {
    notes.unshift({
      id: note.id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
      ...note,
    });
  }

  saveNotes(notes);
  return notes;
}

/** メモを削除 */
export function deleteNote(id) {
  const notes = getSavedNotes().filter(n => n.id !== id);
  saveNotes(notes);
  return notes;
}

/** 入力中の草稿（ドラフト）を取得 */
export function getDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFT);
    return raw ? JSON.parse(raw) : { text: '', category: 'all', title: '' };
  } catch (e) {
    return { text: '', category: 'all', title: '' };
  }
}

/** 草稿を保存 */
export function saveDraft(draft) {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft));
  } catch (e) {
    // ignore
  }
}

/** ユーザー環境設定（前回の都市、前回のタブ等）を取得 */
export function getUserPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PREFS);
    return raw ? JSON.parse(raw) : {
      lastCityId: 'tokyo',
      lastTab: 'weather',
      lastVisitTime: new Date().toISOString(),
      theme: 'dark'
    };
  } catch (e) {
    return {
      lastCityId: 'tokyo',
      lastTab: 'weather',
      lastVisitTime: new Date().toISOString(),
      theme: 'dark'
    };
  }
}

/** ユーザー環境設定を保存 */
export function saveUserPrefs(prefs) {
  try {
    const current = getUserPrefs();
    localStorage.setItem(STORAGE_KEYS.USER_PREFS, JSON.stringify({
      ...current,
      ...prefs,
      lastVisitTime: new Date().toISOString()
    }));
  } catch (e) {
    // ignore
  }
}

/** 探究アクセス履歴を記録 */
export function logAccessHistory(entry) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY_LOG);
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift({
      timestamp: new Date().toISOString(),
      ...entry
    });
    // 直近30件のみ保持
    const trimmed = logs.slice(0, 30);
    localStorage.setItem(STORAGE_KEYS.HISTORY_LOG, JSON.stringify(trimmed));
  } catch (e) {
    // ignore
  }
}

/** 探究アクセス履歴を取得 */
export function getAccessHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY_LOG);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
