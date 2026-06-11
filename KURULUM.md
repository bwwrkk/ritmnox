# Keke Asistan V2 — Kurulum Rehberi

## Bu sürümde neler var?

| Modül | Özellikler |
|-------|-----------|
| 🏠 Bugün | Görevler (öncelik: yüksek/normal/düşük), Ruh hali takibi, Pomodoro timer (titreşimli), Günlük motivasyon sözü |
| 🏋️ Gym | Antrenman günlüğü, egzersiz listesi (Push/Pull/Legs şablonları), set/tekrar/ağırlık takibi, haftalık takvim |
| 🔥 Rutinler | Gün sonu otomatik sıfırlama, seri (streak) takibi, ikon seçici |
| 💧 Su | Bardak animasyonu (dokunarak ekle), haftalık grafik, günlük ipuçları |
| 💰 Bütçe | Kategori dağılımı, aylık bütçe barı, bugün/tümü filtresi, 7 kategori |
| 📝 Notlar | Sabitleme (pin), tarih damgası, çok satırlı |

---

## Kurulum (Windows)

### Adım 1 — Node.js
1. https://nodejs.org → LTS indir → kur → bilgisayarı yeniden başlat
2. Kontrol: `node -v` → `v20.x.x` görünmeli

### Adım 2 — Expo hesabı (ücretsiz)
https://expo.dev/signup

### Adım 3 — Projeyi hazırla
Zip'i çıkart, klasörün içinde PowerShell aç (Shift + Sağ Tık):

```powershell
npm install
npm install -g eas-cli
eas login
```

### Adım 4 — APK build
```powershell
eas build -p android --profile preview
```

Sorulara:
- `automatically create an EAS project` → **Y**
- `generate a new keystore` → **Y**

5-10 dakika sonra link gelir → expo.dev'den APK indir.

### Adım 5 — Telefona yükle
APK'yı telefona aktar → "Bilinmeyen kaynak" iznini ver → Yükle → Aç 🎉

---

## Proje yapısı
```
KekeV2/
├── App.js                   ← 6 sekme navigasyon
├── src/
│   ├── database.js          ← SQLite (8 tablo)
│   └── components.js        ← Tasarım sistemi
├── screens/
│   ├── DashboardScreen.js   ← Görev + Pomodoro + Ruh hali
│   ├── GymScreen.js         ← Antrenman takibi
│   ├── RoutinesScreen.js    ← Rutin + streak
│   ├── WaterScreen.js       ← Su + haftalık grafik
│   ├── FinanceScreen.js     ← Bütçe + kategori analizi
│   └── NotesScreen.js       ← Hızlı notlar
└── KURULUM.md
```
