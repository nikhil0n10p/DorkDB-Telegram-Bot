<p align="center"><img src="https://socialify.git.ci/akifdora/DorkDB-Telegram-Bot/image?description=1&amp;font=Jost&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Plus&amp;pulls=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

# DorkDB (🇺🇸)

**DorkDB Bot** is a collaborative database for Google hack dorks, where users can contribute, view, and discover various dorks. The project is built around community-driven growth, ensuring each entry is reviewed and approved by a bot admin before it becomes visible.

## Key Features:
- **Add New Dorks:** Users can add their own dorks to the database.
- **Approval Mechanism:** A bot admin reviews each new dork to maintain quality and accuracy.
- **Top Contributors:** A leaderboard that displays the top 10 users contributing the most dorks.
- **Notification System:** Notifies a designated group or channel when a new dork is added and approved.

## Installation
1. Clone the repository:
```
   git clone https://github.com/akifdora/DorkDB-Telegram-Bot.git
```
2. Install dependencies:
```
   cd DorkDB-Telegram-Bot
   npm install
```
3. Add your Telegram bot token to the `bot.js` file:
```
  const token = 'BOT_TOKEN';
```
4. Add your Telegram User ID to the `commands.js` file:
```
  const adminId = ADMIN_ID;
```
5. Add your Notification Channel/Group ID to the `messages.js` file:
```
  bot.sendMessage(NOTIFICATION_CHANNEL_ID, `Yeni dork eklendi:\nDork: ${dork}\nKategori: ${category}\nEkleyen: ${addedBy}`);
```
6. Run the bot:
```
  start.bat
```

---

# DorkDB (🇹🇷)

**DorkDB Bot**, Google hack dorkları için topluluk tarafından geliştirilen bir veritabanıdır. Kullanıcılar yeni dorklar ekleyebilir, mevcut dorkları görebilir ve keşfedebilir. Her yeni dork, bot admini tarafından onaylanarak kalite kontrolünden geçer.

## Ana Özellikler:
- **Yeni Dork Ekleme:** Kullanıcılar kendi dorklarını veritabanına ekleyebilir.
- **Onay Mekanizması:** Her yeni dork, doğruluk ve kaliteyi sağlamak için bir bot admini tarafından incelenir.
- **Top Listesi:** En çok dork ekleyen ilk 10 kullanıcıyı gösteren bir liste.
- **Bildirim Sistemi:** Yeni bir dork eklendiğinde veya onaylandığında belirlenen bir grup veya kanala bildirim gönderir.

## Kurulum
1. Depoyu klonlayın:
```
   git clone https://github.com/akifdora/DorkDB-Telegram-Bot.git
```
2. Bağımlılıkları yükleyin:
```
   cd DorkDB-Telegram-Bot
   npm install
```
3. Telegram bot tokeninizi `bot.js` dosyasına ekleyin:
```
  const token = 'BOT_TOKEN';
```
4. Telegram Kullanıcı ID'nizi `commands.js` dosyasına ekleyin:
```
  const adminId = ADMIN_ID;
```
5. Bildirim Kanal/Grup ID'sini `messages.js` dosyasına ekleyin:
```
  bot.sendMessage(NOTIFICATION_CHANNEL_ID, `Yeni dork eklendi:\nDork: ${dork}\nKategori: ${category}\nEkleyen: ${addedBy}`);
```
6. Botu çalıştırın:
```
  start.bat
```

---

<p align="center"><img src="https://github.com/akifdora/DorkDB-Telegram-Bot/blob/main/screenshots.jpg" alt="project-image"></p>
