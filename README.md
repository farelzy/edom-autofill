# EDOM Autofill

Script JavaScript kecil untuk mengisi otomatis formulir **evaluasi dosen (EDOM)** di portal akademik kampus, langsung dari Console browser. Tanpa instalasi, tanpa ekstensi.

✅ **Sudah dicoba di iGracias Telkom University Purwokerto.** Portal kampus lain mungkin perlu penyesuaian selektor (lihat [Struktur halaman yang diharapkan](#struktur-halaman-yang-diharapkan)).

Script ini akan:

1. Memilih jawaban **"Puas"** di setiap pertanyaan pilihan ganda.
2. Mencari kolom **"Masukan / saran untuk dosen"** dan mengisinya dengan `NULL`.
3. Memeriksa bahwa semua isian sudah benar (6 jawaban "Puas" + kolom saran terisi).
4. Kalau lolos pemeriksaan, menekan tombol **Simpan**. Kalau tidak, formulir **tidak** disimpan.

## Cara pakai

1. Login ke iGracias (atau portal akademik kampusmu), lalu buka halaman kuesioner evaluasi untuk satu dosen/mata kuliah.
2. Buka **Developer Tools**: tekan `F12` (atau `Ctrl+Shift+J` di Chrome/Edge, `Ctrl+Shift+K` di Firefox), lalu pilih tab **Console**.
3. Salin seluruh isi [`edom-autofill.js`](edom-autofill.js), tempel ke Console, lalu tekan `Enter`.
4. Lihat log di Console. Kalau semuanya beres, formulir langsung tersimpan.
5. Ulangi untuk dosen/mata kuliah berikutnya.

> Chrome kadang menolak tempel pertama kali dan meminta kamu mengetik `allow pasting`. Ketik itu, tekan `Enter`, lalu tempel ulang.

## Arti pesan di Console

| Pesan | Artinya |
|---|---|
| `Jawaban Puas: 6` | Keenam pertanyaan berhasil dipilih "Puas". |
| `Kolom saran: <nama> NULL` | Kolom saran ditemukan dan diisi `NULL`. |
| `Semua siap, menyimpan formulir...` | Pemeriksaan lolos, tombol Simpan diklik. |
| `Form #form1 tidak ditemukan!` | Kamu belum berada di halaman formulir evaluasi. |
| `Kolom saran belum ditemukan!` | Teks pertanyaan saran berbeda dari yang dicari script. |
| `Form belum lengkap. Tidak disimpan.` | Jumlah jawaban "Puas" bukan 6, jadi script berhenti demi keamanan. |
| `Tombol Simpan tidak ditemukan!` | Tombol Simpan di halaman berbeda dari selektor script. |

## Struktur halaman yang diharapkan

Script ditulis untuk struktur HTML berikut. Kalau portal kampusmu berbeda, sesuaikan selektornya.

| Bagian | Selektor |
|---|---|
| Formulir | `#form1` |
| Label pilihan jawaban | `li .answerlist1` (teks `Puas`) |
| Radio button jawaban | `li .answerlist2 input.opt[type="radio"]` |
| Teks pertanyaan saran | `.tb` yang berisi "Masukan / saran untuk dosen" |
| Kolom saran | `textarea` atau `input[type="text"]` terdekat dari teks pertanyaan |
| Tombol Simpan | `input.floatL3[type="image"]` |

## Menyesuaikan

- **Jumlah pertanyaan bukan 6?** Ubah angka `6` di bagian verifikasi (`berhasil !== 6`).
- **Mau jawaban lain?** Ganti `'puas'` dengan label lain, misalnya `'sangat puas'` (huruf kecil semua).
- **Mau isi saran sungguhan?** Ganti kedua `'NULL'` di langkah 3 dan langkah 4 dengan teks saranmu.
- **Mau cek dulu sebelum simpan?** Hapus atau beri komentar pada baris `tombol.click();`, lalu tekan Simpan sendiri.

## Catatan

- Script hanya berjalan di tab browser yang sedang kamu buka, dengan sesi login milikmu sendiri. Tidak ada data yang dikirim ke tempat lain.
- Evaluasi dosen dipakai kampus untuk memperbaiki pengajaran. Kalau ada dosen yang memang perlu masukan, sebaiknya isi formulirnya secara manual dengan jawaban yang jujur.
- Tampilan portal bisa berubah sewaktu-waktu. Kalau script berhenti bekerja, cek ulang selektor di tabel di atas.

## Lisensi

[MIT](LICENSE)
