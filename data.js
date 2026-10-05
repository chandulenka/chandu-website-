const CATEGORY_SEEDS = [
  {
    id: "ai-tools", name: "AI Tools", icon: "🤖", desc: "Chat assistants, image makers, writing helpers, and creative AI.", usage: "chat, research, write, and create with AI",
    apps: [["ChatGPT", "https://chat.openai.com"], ["Gemini", "https://gemini.google.com"], ["Claude", "https://claude.ai"], ["Perplexity", "https://perplexity.ai"], ["Midjourney", "https://midjourney.com"], ["DALL-E", "https://openai.com/dall-e-3"], ["Leonardo", "https://leonardo.ai"], ["Runway", "https://runwayml.com"], ["ElevenLabs", "https://elevenlabs.io"], ["Suno", "https://suno.ai"]]
  },
  {
    id: "photo-editing", name: "Photo Editing", icon: "📸", desc: "Retouch portraits, design graphics, and polish photos on any device.", usage: "edit, retouch, and design photos",
    apps: [["Photoshop", "https://photoshop.adobe.com"], ["Lightroom", "https://lightroom.adobe.com"], ["Canva", "https://canva.com"], ["Picsart", "https://picsart.com"], ["Snapseed", "https://snapseed.online"], ["Remini", "https://remini.ai"], ["Remove.bg", "https://remove.bg"]]
  },
  {
    id: "video-editing", name: "Video Editing", icon: "🎬", desc: "Cut clips, add effects, and publish polished videos.", usage: "edit clips and create videos",
    apps: [["CapCut", "https://capcut.com"], ["VN", "https://vlognow.me"], ["Clipchamp", "https://clipchamp.com"], ["InVideo", "https://invideo.io"], ["Veed", "https://veed.io"], ["Adobe Premiere", "https://www.adobe.com/products/premiere.html"], ["DaVinci Resolve", "https://www.blackmagicdesign.com/products/davinciresolve"]]
  },
  {
    id: "movies-ott", name: "Movies & OTT", icon: "🎥", desc: "Stream films and series or find a show in cinemas.", usage: "stream movies, series, and entertainment",
    apps: [["Netflix", "https://netflix.com"], ["Prime Video", "https://primevideo.com"], ["Hotstar", "https://hotstar.com"], ["Aha", "https://aha.video"], ["Zee5", "https://zee5.com"], ["SonyLIV", "https://sonyliv.com"], ["JioCinema", "https://jiocinema.com"], ["BookMyShow", "https://bookmyshow.com"]]
  },
  {
    id: "jobs", name: "Jobs", icon: "💼", desc: "Find full-time roles, internships, and professional opportunities.", usage: "search for jobs and career opportunities",
    apps: [["Naukri", "https://naukri.com"], ["LinkedIn Jobs", "https://linkedin.com/jobs"], ["Indeed", "https://indeed.com"], ["Apna", "https://apna.co"], ["Internshala", "https://internshala.com"], ["Foundit", "https://foundit.in"], ["Glassdoor", "https://glassdoor.com"], ["WorkIndia", "https://workindia.in"]]
  },
  {
    id: "food", name: "Food", icon: "🍔", desc: "Order meals, groceries, and quick essentials for delivery.", usage: "order food and everyday groceries",
    apps: [["Swiggy", "https://swiggy.com"], ["Zomato", "https://zomato.com"], ["Domino's", "https://dominos.co.in"], ["Blinkit", "https://blinkit.com"], ["Zepto", "https://zepto.com"], ["Instamart", "https://swiggy.com/instamart"], ["EatSure", "https://eatsure.com"]]
  },
  {
    id: "travel", name: "Travel", icon: "✈️", desc: "Plan train, bus, and flight trips or find a place to stay.", usage: "plan trips, book transport, and find stays",
    apps: [["IRCTC", "https://irctc.co.in"], ["MakeMyTrip", "https://makemytrip.com"], ["Goibibo", "https://goibibo.com"], ["RedBus", "https://redbus.in"], ["IndiGo", "https://goindigo.in"], ["Booking.com", "https://booking.com"], ["Airbnb", "https://airbnb.com"]]
  },
  {
    id: "music", name: "Music", icon: "🎵", desc: "Listen to songs, playlists, radio, and podcasts.", usage: "stream music, playlists, and podcasts",
    apps: [["Spotify", "https://spotify.com"], ["JioSaavn", "https://jiosaavn.com"], ["YouTube Music", "https://music.youtube.com"], ["Wynk", "https://wynk.in"], ["Gaana", "https://gaana.com"], ["Apple Music", "https://music.apple.com"], ["SoundCloud", "https://soundcloud.com"]]
  },
  {
    id: "shopping", name: "Shopping", icon: "🛒", desc: "Browse fashion, electronics, beauty, and everyday products.", usage: "shop for fashion, electronics, and essentials",
    apps: [["Amazon India", "https://amazon.in"], ["Flipkart", "https://flipkart.com"], ["Myntra", "https://myntra.com"], ["Meesho", "https://meesho.com"], ["Ajio", "https://ajio.com"], ["Nykaa", "https://nykaa.com"], ["Tata CLiQ", "https://tatacliq.com"]]
  },
  {
    id: "social", name: "Social", icon: "💬", desc: "Connect with friends, communities, and conversations online.", usage: "message friends and join communities",
    apps: [["Instagram", "https://instagram.com"], ["WhatsApp Web", "https://web.whatsapp.com"], ["Telegram Web", "https://web.telegram.org"], ["X", "https://x.com"], ["Reddit", "https://reddit.com"], ["Discord", "https://discord.com"], ["Facebook", "https://facebook.com"]]
  },
  {
    id: "finance", name: "Finance", icon: "💰", desc: "Make payments, manage money, and explore investing services.", usage: "make payments and manage money",
    apps: [["PhonePe", "https://phonepe.com"], ["Paytm", "https://paytm.com"], ["Google Pay", "https://pay.google.com"], ["CRED", "https://cred.club"], ["Zerodha", "https://zerodha.com"], ["Groww", "https://groww.in"], ["PayPal", "https://paypal.com"]]
  },
  {
    id: "health", name: "Health", icon: "🏥", desc: "Book appointments, order medicine, and build healthy routines.", usage: "find care, order medicine, and track wellness",
    apps: [["Practo", "https://practo.com"], ["Tata 1mg", "https://1mg.com"], ["Apollo 24|7", "https://apollo247.com"], ["Cult.fit", "https://cult.fit"], ["HealthifyMe", "https://healthifyme.com"], ["PharmEasy", "https://pharmeasy.in"], ["Netmeds", "https://netmeds.com"]]
  },
  {
    id: "study", name: "Study", icon: "📚", desc: "Learn new skills, prepare for exams, and practice languages.", usage: "learn skills and study at your own pace",
    apps: [["Unacademy", "https://unacademy.com"], ["BYJU'S", "https://byjus.com"], ["Coursera", "https://coursera.org"], ["Udemy", "https://udemy.com"], ["Khan Academy", "https://khanacademy.org"], ["Physics Wallah", "https://pw.live"], ["Duolingo", "https://duolingo.com"]]
  },
  {
    id: "coding", name: "Coding", icon: "💻", desc: "Build software, collaborate on code, and practice programming.", usage: "write code, collaborate, and ship projects",
    apps: [["GitHub", "https://github.com"], ["Replit", "https://replit.com"], ["VS Code for Web", "https://vscode.dev"], ["Stack Overflow", "https://stackoverflow.com"], ["LeetCode", "https://leetcode.com"], ["Vercel", "https://vercel.com"], ["Netlify", "https://netlify.com"]]
  },
  {
    id: "news", name: "News", icon: "📰", desc: "Follow breaking news, local headlines, and global reporting.", usage: "read current news and headlines",
    apps: [["NDTV", "https://ndtv.com"], ["The Times of India", "https://timesofindia.indiatimes.com"], ["The Hindu", "https://thehindu.com"], ["Inshorts", "https://inshorts.com"], ["BBC News", "https://bbc.com/news"], ["Way2News", "https://way2news.com"], ["The Indian Express", "https://indianexpress.com"]]
  },
  {
    id: "weather", name: "Weather", icon: "🌦️", desc: "Check forecasts, radar, and weather conditions around the world.", usage: "check forecasts and local conditions",
    apps: [["AccuWeather", "https://accuweather.com"], ["Weather.com", "https://weather.com"], ["Windy", "https://windy.com"], ["Mausam", "https://mausam.imd.gov.in"], ["Yr", "https://yr.no"], ["Google Weather", "https://google.com/search?q=weather"], ["Ventusky", "https://ventusky.com"]]
  },
  {
    id: "real-estate", name: "Real Estate", icon: "🏠", desc: "Search homes for rent or sale and explore property listings.", usage: "search properties for rent or sale",
    apps: [["99acres", "https://99acres.com"], ["Magicbricks", "https://magicbricks.com"], ["Housing.com", "https://housing.com"], ["NoBroker", "https://nobroker.in"], ["Square Yards", "https://squareyards.com"], ["CommonFloor", "https://commonfloor.com"], ["Realtor.com", "https://realtor.com"]]
  },
  {
    id: "government", name: "Government", icon: "🏛️", desc: "Access public services, documents, and official information.", usage: "access official services and public information",
    apps: [["DigiLocker", "https://digilocker.gov.in"], ["UMANG", "https://web.umang.gov.in"], ["Aadhaar", "https://uidai.gov.in"], ["Income Tax e-Filing", "https://incometax.gov.in"], ["Passport Seva", "https://passportindia.gov.in"], ["MyGov India", "https://mygov.in"], ["EPFO", "https://epfindia.gov.in"]]
  },
  {
    id: "transport", name: "Transport", icon: "🚌", desc: "Navigate city rides, public transit, and everyday commutes.", usage: "book local rides and navigate transit",
    apps: [["Uber", "https://uber.com"], ["Ola", "https://olacabs.com"], ["Rapido", "https://rapido.bike"], ["Chalo", "https://chalo.com"], ["Ridlr", "https://ridlr.in"], ["Delhi Metro Rail", "https://delhimetrorail.com"], ["Tummoc", "https://tummoc.com"]]
  },
  {
    id: "productivity", name: "Productivity", icon: "✅", desc: "Organize tasks, notes, calendars, and team projects.", usage: "organize tasks, notes, and team work",
    apps: [["Notion", "https://notion.so"], ["Google Workspace", "https://workspace.google.com"], ["Microsoft 365", "https://microsoft365.com"], ["Trello", "https://trello.com"], ["Todoist", "https://todoist.com"], ["Evernote", "https://evernote.com"], ["Slack", "https://slack.com"]]
  },
  {
    id: "design", name: "Design", icon: "✏️", desc: "Create layouts, prototypes, illustrations, and brand assets.", usage: "design graphics, prototypes, and layouts",
    apps: [["Figma", "https://figma.com"], ["Adobe Express", "https://express.adobe.com"], ["Framer", "https://framer.com"], ["Dribbble", "https://dribbble.com"], ["Behance", "https://behance.net"], ["Photopea", "https://photopea.com"], ["VistaCreate", "https://create.vista.com"]]
  },
  {
    id: "sports", name: "Sports", icon: "🏏", desc: "Follow live scores, teams, match highlights, and sports news.", usage: "follow live scores and sports news",
    apps: [["ESPNcricinfo", "https://espncricinfo.com"], ["Cricbuzz", "https://cricbuzz.com"], ["ESPN", "https://espn.com"], ["FIFA", "https://fifa.com"], ["Olympics", "https://olympics.com"], ["FanCode", "https://fancode.com"], ["The Athletic", "https://theathletic.com"]]
  },
  {
    id: "auto", name: "Auto", icon: "🚗", desc: "Compare vehicles, browse listings, and find automotive advice.", usage: "research vehicles and automotive services",
    apps: [["CarDekho", "https://cardekho.com"], ["CarWale", "https://carwale.com"], ["BikeDekho", "https://bikedekho.com"], ["Spinny", "https://spinny.com"], ["Cars24", "https://cars24.com"], ["ZigWheels", "https://zigwheels.com"], ["Park+", "https://parkplus.io"]]
  },
  {
    id: "beauty", name: "Beauty", icon: "💄", desc: "Discover beauty products, grooming advice, and salon services.", usage: "browse beauty, makeup, and grooming products",
    apps: [["Nykaa", "https://nykaa.com"], ["Tira Beauty", "https://tirabeauty.com"], ["Sephora", "https://sephora.com"], ["Purplle", "https://purplle.com"], ["Mamaearth", "https://mamaearth.in"], ["Sugar Cosmetics", "https://www.sugarcosmetics.com"], ["Urban Company", "https://urbancompany.com"]]
  },
  {
    id: "home-services", name: "Home Services", icon: "🧰", desc: "Book trusted help for cleaning, repairs, and home improvement.", usage: "book home repairs and everyday services",
    apps: [["Urban Company", "https://urbancompany.com"], ["NoBroker Services", "https://nobroker.in"], ["Housejoy", "https://housejoy.in"], ["Mr Right", "https://mrright.in"], ["Sulekha", "https://sulekha.com"], ["Justdial", "https://justdial.com"], ["Livspace", "https://livspace.com"]]
  },
  {
    id: "kids", name: "Kids", icon: "🧸", desc: "Explore learning, stories, and family-friendly activities for kids.", usage: "find learning and entertainment for children",
    apps: [["Epic!", "https://getepic.com"], ["PBS Kids", "https://pbskids.org"], ["Khan Academy Kids", "https://learn.khanacademy.org/khan-academy-kids"], ["ABCmouse", "https://abcmouse.com"], ["Duolingo ABC", "https://abc.duolingo.com"], ["National Geographic Kids", "https://kids.nationalgeographic.com"], ["StoryWeaver", "https://storyweaver.org.in"]]
  },
  {
    id: "books", name: "Books", icon: "📖", desc: "Find your next read, browse ebooks, and listen to audiobooks.", usage: "discover, read, and listen to books",
    apps: [["Kindle", "https://read.amazon.com"], ["Google Play Books", "https://play.google.com/store/books"], ["Audible", "https://audible.com"], ["Goodreads", "https://goodreads.com"], ["Storytel", "https://storytel.com"], ["Wattpad", "https://wattpad.com"], ["Project Gutenberg", "https://gutenberg.org"]]
  },
  {
    id: "events", name: "Events", icon: "🎟️", desc: "Discover concerts, local experiences, and things happening nearby.", usage: "find tickets and local experiences",
    apps: [["BookMyShow", "https://bookmyshow.com"], ["District", "https://district.in"], ["Insider", "https://insider.in"], ["Eventbrite", "https://eventbrite.com"], ["Meetup", "https://meetup.com"], ["Townscript", "https://townscript.com"], ["SkillBox", "https://skillboxes.com"]]
  },
  {
    id: "matrimony", name: "Matrimony", icon: "💍", desc: "Meet people and explore matchmaking communities and services.", usage: "explore matchmaking and matrimonial services",
    apps: [["Shaadi.com", "https://shaadi.com"], ["BharatMatrimony", "https://bharatmatrimony.com"], ["Jeevansathi", "https://jeevansathi.com"], ["Matrimonials India", "https://matrimonialsindia.com"], ["SimplyMarry", "https://simplymarry.com"], ["CommunityMatrimony", "https://communitymatrimony.com"], ["EliteMatrimony", "https://elitematrimony.com"]]
  },
  {
    id: "astrology", name: "Astrology", icon: "🔮", desc: "Explore horoscopes, birth charts, and astrology consultations.", usage: "read horoscopes and explore astrology",
    apps: [["AstroTalk", "https://astrotalk.com"], ["AstroSage", "https://astrosage.com"], ["GaneshaSpeaks", "https://ganeshaspeaks.com"], ["Astroyogi", "https://astroyogi.com"], ["ClickAstro", "https://clickastro.com"], ["Prokerala Astrology", "https://prokerala.com/astrology"], ["Sanctuary", "https://sanctuaryworld.co"]]
  },
  {
    id: "devotional", name: "Devotional", icon: "🪔", desc: "Listen to devotional music and explore spiritual resources.", usage: "listen to devotional music and spiritual content",
    apps: [["Sri Mandir", "https://srimandir.com"], ["ISKCON Desire Tree", "https://iskcondesiretree.com"], ["Sadhguru", "https://isha.sadhguru.org"], ["Art of Living", "https://artofliving.org"], ["Gaana Bhakti", "https://gaana.com/genre/devotional"], ["Dharma", "https://dharma.org"], ["Bhajan Clubbing", "https://bhajanclubbing.com"]]
  },
  {
    id: "gaming", name: "Gaming", icon: "🕹️", desc: "Play, discover, and connect with gaming communities.", usage: "discover games and gaming communities",
    apps: [["Steam", "https://store.steampowered.com"], ["Epic Games Store", "https://store.epicgames.com"], ["Xbox Cloud Gaming", "https://xbox.com/play"], ["PlayStation", "https://playstation.com"], ["Roblox", "https://roblox.com"], ["Twitch", "https://twitch.tv"], ["itch.io", "https://itch.io"]]
  },
  {
    id: "maps", name: "Maps & Navigation", icon: "🗺️", desc: "Get directions, explore places, and plan routes.", usage: "find places and plan routes",
    apps: [["Google Maps", "https://maps.google.com"], ["Apple Maps", "https://maps.apple.com"], ["Mappls", "https://mappls.com"], ["OpenStreetMap", "https://openstreetmap.org"], ["HERE WeGo", "https://wego.here.com"], ["Waze", "https://waze.com"], ["Rome2Rio", "https://rome2rio.com"]]
  },
  {
    id: "utilities", name: "Utilities", icon: "🔧", desc: "Use handy online tools for files, conversions, and everyday tasks.", usage: "handle everyday digital tasks and file tools",
    apps: [["Google Translate", "https://translate.google.com"], ["DeepL", "https://deepl.com"], ["Smallpdf", "https://smallpdf.com"], ["iLovePDF", "https://ilovepdf.com"], ["Speedtest", "https://speedtest.net"], ["WeTransfer", "https://wetransfer.com"], ["Internet Archive", "https://archive.org"]]
  },
  {
    id: "cloud-storage", name: "Cloud Storage", icon: "☁️", desc: "Store, sync, and share files securely across your devices.", usage: "store and share files across devices",
    apps: [["Google Drive", "https://drive.google.com"], ["Dropbox", "https://dropbox.com"], ["OneDrive", "https://onedrive.live.com"], ["iCloud", "https://icloud.com"], ["Box", "https://box.com"], ["MEGA", "https://mega.io"], ["pCloud", "https://pcloud.com"]]
  }
];

const RATINGS = ["4.8", "4.7", "4.9", "4.6", "4.8", "4.5", "4.7"];

const CATEGORIES = CATEGORY_SEEDS.map((category, categoryIndex) => ({
  id: category.id,
  name: category.name,
  icon: category.icon,
  desc: category.desc,
  subcategories: [{
    name: "Popular picks",
    apps: category.apps.map(([name, link], appIndex) => ({
      name,
      link,
      domain: new URL(link).hostname.replace(/^www\./, ""),
      rating: RATINGS[(categoryIndex + appIndex) % RATINGS.length],
      usage: `Use it to ${category.usage}.`,
      info: `${name} brings together services for people who want to ${category.usage}. Visit the official site to explore its current features and availability.`,
      categoryId: category.id,
      categoryName: category.name
    }))
  }]
}));
