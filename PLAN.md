# Guess The Day — Plan Implementasi (React + Tailwind) v4

## Ringkasan
- **Rentang tanggal**: 1500–2500.
- **Alur game**: 10 soal per sesi. Pilih hari → Konfirmasi → (lihat hasil + pembahasan expandable) → Next. Setelah 10 soal, tampilkan ringkasan skor dan daftar semua soal beserta pembahasan (expandable).
- **Info Doomsday**: Card expandable dengan 2 section: Section Tahun (anchor day 1500–2500) dan Section Tanggal (tanggal-tanggal Doomsday per bulan).
- **Styling**: Tailwind CSS dengan desain modern, card dengan border-radius tumpul, UI yang enak dilihat.

## Stack
- Vite + React + TypeScript + Tailwind CSS
- Mobile-first responsive design

## Fitur Utama
- Generator tanggal acak UTC 1500–2500 (uniform by day).
- Grid 7 kartu hari: Senin–Minggu dengan desain modern.
- Tombol: Mulai, Konfirmasi (aktif jika sudah memilih), Next (muncul setelah konfirmasi).
- Card Pembahasan: hanya muncul setelah menjawab; expandable, default tertutup.
- Info Doomsday Card: selalu tersedia, expandable; 2 section — Tahun dan Tanggal.
- Skor: 10 soal per game; ringkasan akhir menampilkan skor dan seluruh soal + pembahasan per soal (expandable per item).
- Skor tertinggi (opsional) via `localStorage`.

## Design System (Tailwind)
- **Color Palette**:
  - Primary: `blue-600`, `blue-700`, `blue-800`
  - Success: `green-500`, `green-600`
  - Error: `red-500`, `red-600`
  - Neutral: `gray-50`, `gray-100`, `gray-200`, `gray-800`, `gray-900`
  - Background: `white`, `gray-50`
- **Border Radius**: `rounded-xl` (12px) untuk card utama, `rounded-lg` (8px) untuk elemen kecil
- **Shadows**: `shadow-lg`, `shadow-xl` untuk depth
- **Spacing**: `p-6`, `p-8` untuk padding card, `gap-4`, `gap-6` untuk grid
- **Typography**: `text-2xl`, `text-3xl`, `text-4xl` untuk heading, `font-semibold`, `font-bold`

## State & Mekanika
- Representasi hari: 0=Senin … 6=Minggu.
- `GameState`:
  - `phase`: `"idle" | "question" | "answered" | "summary"`
  - `currentDate`: `Date` (UTC)
  - `correctDayIndex`: `number`
  - `selectedDayIndex`: `number | null`
  - `questionIndex`: `number` (0..9)
  - `history`: `Array<{ date: Date; correctDayIndex: number; selectedDayIndex: number; isCorrect: boolean; explanation: Explanation }>`
  - `scoreCorrect`: `number`
- UI state:
  - `isExplanationOpen`: `boolean` (untuk soal aktif; default false)
  - `isInfoOpen`: `boolean`
  - `infoSection`: `"tahun" | "tanggal"`
  - Di halaman ringkasan: `expandedItems: Set<number>` untuk kontrol expand per soal.

## Doomsday Technique
- Anchor day per abad (1500–2500):
  - 1500-an: Rabu, 1600-an: Selasa, 1700-an: Minggu, 1800-an: Jumat,
    1900-an: Rabu, 2000-an: Selasa, 2100-an: Minggu, 2200-an: Jumat,
    2300-an: Rabu, 2400-an: Selasa, 2500-an: Minggu.
- Tahun `yy`:
  - `a = floor(yy/12)`, `b = yy % 12`, `c = floor(b/4)`, `d = a + b + c`
  - `doomsdayYear = (anchorCentury + d) mod 7`
- Tanggal Doomsday per bulan:
  - Jan: 3 (normal), 4 (kabisat); Feb: 28 (normal), 29 (kabisat); Mar: 14; Apr: 4; Mei: 9; Jun: 6; Jul: 11; Agu: 8; Sep: 5; Okt: 10; Nov: 7; Des: 12.
- `Explanation` berisi: `anchorCentury`, `a,b,c,d`, `doomsdayYearIndex`, `monthAnchorDate`, `offset`, `finalDayIndex`, plus label hari dan format tanggal untuk ditampilkan.

## UX Alur
1. **Idle**: Judul, tombol Mulai, Info Doomsday Card (expandable), grid hari disembunyikan.
2. **Question**: Tanggal besar, grid hari ditampilkan, Konfirmasi (disabled sampai memilih).
3. **Answered**: Tampilkan benar/salah + highlight, tampilkan Card Pembahasan (collapsed), tombol Next.
4. Setelah soal ke-10 → **Summary**:
   - Skor: X/10 dan akurasi.
   - Daftar 10 item: setiap item menampilkan tanggal, status benar/salah, jawaban benar vs jawaban user, dan Card Pembahasan per item (expandable per item).
   - Tombol "Main Lagi" untuk reset sesi baru.

## Info Doomsday Card (2 Section)
- **Section Tahun**: daftar anchor day per abad 1500–2500 dalam format:
  - "Tahun 1500-an: Rabu", …, "Tahun 2500-an: Minggu".
- **Section Tanggal**: daftar tanggal Doomsday per bulan:
  - "3 Januari (4 Januari di tahun kabisat)", "28 Februari (29 Februari di tahun kabisat)", "14 Maret", "4 April", "9 Mei", "6 Juni", "11 Juli", "8 Agustus", "5 September", "10 Oktober", "7 November", "12 Desember".

## Struktur Proyek
```
/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css (Tailwind imports)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── DayCardGrid.tsx
│   │   ├── DayCard.tsx
│   │   ├── Controls.tsx
│   │   ├── ExplanationCard.tsx
│   │   ├── InfoModal.tsx
│   │   ├── Summary.tsx
│   │   └── SummaryItem.tsx
│   ├── lib/
│   │   ├── randomDate.ts
│   │   ├── doomsday.ts
│   │   ├── dateFormat.ts
│   │   └── storage.ts
│   ├── state/
│   │   ├── gameReducer.ts
│   │   └── types.ts
│   └── hooks/
│       └── useGame.ts
```

## Komponen Design (Tailwind Classes)

### DayCard
```tsx
// Default state
className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-200"

// Selected state
className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 text-center cursor-pointer shadow-lg"

// Correct state
className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center shadow-lg"

// Incorrect state
className="bg-red-50 border-2 border-red-500 rounded-xl p-6 text-center shadow-lg"
```

### Main Container
```tsx
className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
```

### Card Container
```tsx
className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto"
```

### Button Primary
```tsx
className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
```

### Button Secondary
```tsx
className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
```

### Info Card (Expandable)
```tsx
className="bg-white rounded-xl shadow-lg border border-gray-200"
```

### Info Card Content
```tsx
className="p-6 space-y-4"
```

## API Internal Utama
- `initGame()` → set `phase="question"`, reset skor, reset history, `questionIndex=0`, generate tanggal.
- `newQuestion()` → generate tanggal baru, reset `selectedDayIndex`, `isExplanationOpen=false`.
- `selectDay(index)`
- `confirmAnswer()` → evaluasi, simpan ke `history` dengan `explanation`, update skor, `phase="answered"`.
- `next()` → jika `questionIndex<9` → `newQuestion()`, else `phase="summary"`.
- `restart()` → kembali ke `initGame()`.
- `computeDoomsday(date): Explanation`
- `toggleInfo()`, `setInfoSection(section)`

## Aksesibilitas
- Kartu: `role="button"`, `tabIndex=0`, `aria-pressed`, navigasi panah + Enter/Space.
- Card Pembahasan: `aria-expanded`, `aria-controls`.
- Info Card: `aria-expanded`, `aria-controls`.
- Focus states dengan `focus:ring-2 focus:ring-blue-500 focus:outline-none`

## Responsive Design
- Mobile: `grid-cols-2` untuk day cards, `text-lg` untuk tanggal
- Tablet: `grid-cols-3` untuk day cards, `text-xl` untuk tanggal  
- Desktop: `grid-cols-7` untuk day cards, `text-2xl` untuk tanggal
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`

## DoD
- 10 soal per sesi, ringkasan akhir menampilkan skor dan daftar 10 soal beserta pembahasan expandable per soal.
- Tanggal acak 1500–2500, perhitungan Doomsday akurat.
- Card pembahasan hanya setelah menjawab, default tertutup.
- Info Doomsday Card memiliki 2 section: Tahun (anchor 1500–2500) dan Tanggal (doomsday dates per bulan).
- UI modern dengan Tailwind CSS, border-radius tumpul, responsive design.
- 0 error console, navigasi keyboard berfungsi.

## Roadmap
1. Setup Vite React + TS + Tailwind CSS
2. Komponen UI modern: Header, DayCardGrid, Controls, ExplanationCard, InfoCard, Summary
3. Reducer + alur Mulai → Konfirmasi → Next (10 soal) → Summary
4. `doomsday.ts` + `randomDate.ts` + format tanggal ID
5. Integrasi pembahasan per soal, simpan di `history`
6. Ringkasan: render list 10 soal + expandable explanation
7. Responsive design + a11y + mobile polish
8. Test edge cases + visual polish
9. Add copyright footer: "Dibuat oleh Aditya Erlangga Wibowo"
