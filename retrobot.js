document.addEventListener("DOMContentLoaded", () => {
  const chatlogs = document.getElementById('chatlogs');
  const input = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const sessionList = document.getElementById('session-list');
  const searchInput = document.getElementById('session-search');

  let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
  let currentSession = [];

  const knowledgeBase = [
    { question: ["hi", "hello", "hey", "hiya", "yo", "good morning", "good afternoon", "good evening"], answer: "Hello! 👋 How can I help you today?" },
    { question: ["nice to meet you", "pleased to meet you"], answer: "Nice to meet you too! What would you like to ask?" },
    { question: ["how are you", "how's it going", "you good"], answer: "I’m doing great — ready to help! How about you?" },
    { question: ["what's up", "sup"], answer: "Just here to help you out. What do you want to know?" },
    { question: ["thank you", "thanks", "thx"], answer: "You’re welcome — happy to help! 😊" },
    { question: ["bye", "goodbye", "see you", "see ya"], answer: "Goodbye! Have a wonderful day." },
    { question: ["who are you", "what is your name", "your name"], answer: "I’m RetroBot — your friendly assistant for FAQs and quick help." },
    { question: ["who made you", "who created you", "developer"], answer: "I was built by your team — a lightweight retrieval-style chatbot for demos." },
    { question: ["what can you do", "capabilities", "features"], answer: "I can answer common questions, keep sessions, and help users with basic tasks." },
    { question: ["time", "current time", "what time is it"], answer: () => `The current time is ${getCurrentDateTime().time}.` },
    { question: ["date", "today's date", "what's the date"], answer: () => `Today is ${getCurrentDateTime().date}.` },
    { question: ["weather", "forecast"], answer: "I don't fetch live weather here, but quickly check a weather site or app for your location." },
    { question: ["reset password", "forgot password", "change password"], answer: "Use the 'Forgot Password' link on the login page to reset your password." },
    { question: ["login help", "can't login", "unable to login"], answer: "Make sure your email and password are correct. If still stuck, try password reset or contact support." },
    { question: ["how to book ticket", "book ticket", "booking"], answer: "Go to the booking page, choose your route and date, pick a seat, and complete payment." },
    { question: ["cancel booking", "cancel ticket", "cancel reservation"], answer: "Head to 'My Bookings', select the booking, and choose 'Cancel' if the policy allows." },
    { question: ["refund", "refund policy", "how to get refund"], answer: "Refunds follow the cancellation policy. If eligible, request a refund via the booking details." },
    { question: ["seat selection", "choose seat"], answer: "During booking you can select available seats. Some seat types may cost more." },
    { question: ["group booking", "book for group"], answer: "For group bookings, use the group booking option or contact sales for special handling." },
    { question: ["boarding pass", "e-ticket", "download ticket"], answer: "You can download your e-ticket from 'My Bookings' after purchase." },
    { question: ["payment methods", "pay with", "how to pay"], answer: "We accept cards, netbanking and popular UPI/wallet options (check payment page for exact options)." },
    { question: ["payment failed", "transaction failed"], answer: "If payment failed, check your bank or wallet and try again. If charged, contact support with the transaction ID." },
    { question: ["contact support", "customer support", "help center"], answer: "Contact support via support@yourcompany.com or use the 'Help' section in the app." },
    { question: ["promo", "coupon", "discount", "offer"], answer: "Enter promo codes at checkout. Offers vary by route and dates." },
    { question: ["student discount", "senior discount"], answer: "Some offers apply for students or seniors — check the fare rules when booking." },
    { question: ["cancellation policy", "terms", "policy"], answer: "Policies (cancellation, refund) are listed on the policy page. Check there for details." },
    { question: ["app not working", "site down", "bug"], answer: "Try clearing cache, using a private window, or switching browsers. Report persistent issues to support." },
    { question: ["how to clear cache", "clear browser cache"], answer: "Clear browser history/cache from settings, or use an Incognito/Private window." },
    { question: ["is my data safe", "privacy", "data security"], answer: "We follow standard practices to protect data — check the Privacy Policy for details." },
    { question: ["how to change email", "update email"], answer: "Go to account settings > edit profile to update email (some changes may require verification)." },
    { question: ["how to change phone", "update phone"], answer: "Update your phone number in account settings; you may need to verify the new number." },
    { question: ["help me", "i need help", "support me"], answer: "Sure — tell me what you need help with and I’ll try to guide you." },
    { question: ["features list", "what features"], answer: "Core features: search, bookings, session history, and simple Q&A via this bot." },
    { question: ["capital of france", "what is the capital of france"], answer: "The capital of France is Paris." },
    { question: ["capital of india"], answer: "The capital of India is New Delhi." },
    { question: ["largest country"], answer: "By area, Russia is the largest country in the world." },
    { question: ["largest ocean"], answer: "The Pacific Ocean is the largest ocean." },
    { question: ["longest river"], answer: "The Nile and Amazon are often cited; measurements vary depending on source." },
    { question: ["how to git commit", "git commit"], answer: "Use `git commit -m \"your message\"` after staging changes with `git add`." },
    { question: ["how to push", "git push"], answer: "Use `git push origin branch-name` to push commits to a remote repo." },
    { question: ["html css js", "frontend stack"], answer: "HTML structures pages, CSS styles them, and JavaScript makes them interactive." },
    { question: ["how to deploy", "deploy website"], answer: "You can deploy using platforms like Netlify, Vercel, GitHub Pages, or a VPS." },
    { question: ["sql vs nosql", "difference sql nosql"], answer: "SQL is relational (structured), NoSQL is non-relational (flexible schemas). Choose by data needs." },
    { question: ["what is ai", "define ai"], answer: "AI is the field of building machines that can perform tasks that normally require human intelligence." },
    { question: ["what is machine learning", "ml"], answer: "ML is a subset of AI where models learn patterns from data to make predictions." },
    { question: ["what is cloud computing", "cloud"], answer: "Cloud computing provides on-demand compute/storage over the internet instead of running locally." },
    { question: ["how to be productive", "productivity tips"], answer: "Try time-blocking, remove distractions, use small achievable goals, and take regular breaks." },
    { question: ["sleep tips", "how to sleep better"], answer: "Maintain a routine, avoid screens before bed, and keep the room cool and dark." },
    { question: ["exercise tips", "how to exercise"], answer: "Start with short, consistent sessions — walking, bodyweight exercises, or light cardio." },
    { question: ["quick recipe", "easy dinner"], answer: "Try pasta with olive oil, garlic, veggies, and grated cheese — quick and tasty." },
    { question: ["which continent is india in", "india continent"], answer: "India is in Asia." },
    { question: ["which continent is brazil in"], answer: "Brazil is in South America." },
    { question: ["recommend movie", "movie rec"], answer: "Try a well-reviewed film you haven't seen. 'The Grand Budapest Hotel' is a stylish pick." },
    { question: ["tell me a joke", "joke"], answer: "Why don't programmers like nature? Too many bugs. 😄" },
    { question: ["pun", "funny"], answer: "I used to be a baker, but I couldn't make enough dough. 🥐" },
    { question: ["riddle", "give me a riddle"], answer: "I have keys but no locks. I have space but no room. You can enter but can't leave. What am I? (Answer: Keyboard)" },
    { question: ["motivate me", "inspire me"], answer: "Small steps each day add up. Keep going — progress beats perfection." },
    { question: ["how to learn coding", "learn programming"], answer: "Start small, build projects, practice consistently, and read docs/tutorials." },
    { question: ["install extension", "browser extension"], answer: "Visit your browser's extension store and click install; check permissions before adding." },
    { question: ["track order", "order status"], answer: "Use the order tracking link in your confirmation email or check 'My Orders' in your account." },
    { question: ["spam email", "mark spam"], answer: "Mark unwanted messages as spam in your email client to filter similar messages later." },
    { question: ["two factor", "2fa", "enable 2fa"], answer: "Enable 2FA in account security settings to add an extra layer of protection." },
    { question: ["backup data", "how to backup"], answer: "Back up important data to cloud storage or external drives regularly." },
    { question: ["corporate booking", "enterprise"], answer: "Contact our sales team for corporate or bulk booking options and special rates." },
    { question: ["accessibility", "a11y"], answer: "We try to follow accessibility best practices — contact support for specific accommodations." },
    { question: ["api", "developer api", "open api"], answer: "We have an API for integrations — check developer docs or contact integrations team." },
    { question: ["how to test", "testing tips"], answer: "Write tests for critical paths, use automated test runners, and test in production-like environments." },
    { question: ["vpn", "use vpn"], answer: "A VPN encrypts traffic and masks your IP, useful on public networks for privacy." },
    { question: ["how to upload file", "upload file"], answer: "Use the upload feature on the page, or drag-and-drop (if supported) to attach files." },
    { question: ["receipt", "invoice", "download invoice"], answer: "You can download receipts from 'My Bookings' or the order details page." },
    { question: ["turn on notifications", "notifications"], answer: "You can enable notifications in app settings or browser prompts." },
    { question: ["languages supported", "multi language"], answer: "The site supports multiple languages—check the language selector in the footer." },
    { question: ["how to start", "getting started"], answer: "Create an account, verify email, and explore the dashboard to get started." },
    { question: ["tutorial", "guide", "how to use"], answer: "Check our help center for step-by-step tutorials and FAQs." },
    { question: ["delete account", "remove account"], answer: "Account deletion is in settings. Note that deletion is permanent—contact support if unsure." },
    { question: ["site slow", "slow loading"], answer: "Try a different browser or disable extensions; check network speed and try again." },
    { question: ["supported browsers", "browser support"], answer: "Modern browsers (Chrome, Firefox, Edge, Safari) work best. Keep them up to date." },
    { question: ["location", "nearest station", "nearest stop"], answer: "Use the location/search feature on the booking page to find routes near you." },
    { question: ["gift card", "voucher code"], answer: "Gift cards/vouchers are applied at checkout — check terms for validity." },
    { question: ["itinerary", "trip details"], answer: "Your itinerary is available under 'My Trips' with timings and stop details." },
    { question: ["baggage", "luggage rules"], answer: "Check baggage allowances and rules on the fare rules or FAQs page." },
    { question: ["travel with pet", "pets allowed"], answer: "Pet policies vary by route — check the pet policy or contact support for specifics." },
    { question: ["wifi", "onboard wifi"], answer: "Wi-Fi availability depends on the vehicle or operator; check the route details." },
    { question: ["food", "meals onboard"], answer: "Some services offer meals; check the onboard amenities for your selected route." },
    { question: ["emergency", "safety"], answer: "In an emergency, follow crew instructions and call local emergency services immediately." },
    { question: ["save card", "remember me"], answer: "You can save payment methods in your secure wallet in account settings." },
    { question: ["hola", "bonjour", "namaste"], answer: "¡Hola! Bonjour! नमस्ते — how can I help you today?" },
    { question: ["who is elon musk", "elon musk"], answer: "Elon Musk is an entrepreneur known for SpaceX, Tesla and other ventures." },
    { question: ["who is gandhi", "mahatma gandhi"], answer: "Mahatma Gandhi was a leader of India's independence movement and a proponent of non-violence." },
    { question: ["calculate", "what is 2+2", "2+2"], answer: "2 + 2 = 4." },
    { question: ["km to miles", "kilometer to mile"], answer: "1 kilometer ≈ 0.621371 miles." },
    { question: ["pdf to word", "convert pdf"], answer: "Use an online converter or software like Adobe Acrobat to convert PDF to Word." },
    { question: ["set reminder", "reminder"], answer: "I don't set reminders here yet — use your device's calendar/reminder app." },
    { question: ["social", "twitter", "facebook"], answer: "Find our social links in the footer or the About page." },
    { question: ["currency", "change currency"], answer: "Change currency in settings or on the booking page to view local prices." },
    { question: ["what is analytics", "define analytics"], answer: "Analytics is the process of collecting and analyzing data to gain insights." },
    { question: ["404", "not found", "page not found"], answer: "A 404 means the page can't be found. Try the home page or search for what you need." },
    { question: ["careers", "jobs", "work with us"], answer: "Check our Careers page for open positions and application details." },
    { question: ["newsletter", "subscribe"], answer: "Subscribe to our newsletter from the footer to get updates and offers." },
    { question: ["feedback", "suggestion"], answer: "We appreciate feedback — use the feedback form or contact support." },
    { question: ["help center", "faq", "support center"], answer: "Visit the Help Center for detailed FAQs and guides." },
    { question: ["terms of service", "tos", "terms"], answer: "Read our Terms of Service on the legal page for full details." },
    { question: ["partners", "affiliate"], answer: "We partner with selected operators. Contact partnerships for more info." },
    { question: ["demo", "trial"], answer: "Request a demo from our sales team for enterprise features and integrations." },
    { question: ["event", "promotion"], answer: "Promotions appear on the homepage or via email to subscribers." },
    { question: ["custom integration", "integration"], answer: "We offer integrations via API — contact integrations or developer docs." },
    { question: ["mobile app", "android", "ios"], answer: "We provide a mobile app for Android and iOS — check the store for availability." },
    { question: ["hi there", "hello there", "hey there"], answer: "Hey! I’m here — how can I assist?" },
    { question: ["i need help booking", "help booking"], answer: "Tell me your origin and destination and I can guide you through booking steps." },
    { question: ["how do i contact support", "where is support"], answer: "Email support@yourcompany.com or visit the Help Center for contact options." },
    { question: ["thank you very much", "many thanks"], answer: "Glad to help — anytime!" },
    { question: ["i don't understand", "not sure"], answer: "No worries — try rephrasing or ask something else. I'll do my best!" },
    { question: ["feature request", "add feature"], answer: "We welcome feature requests — please send them to our product team via feedback." },
    { question: ["helo", "helloo", "hell0"], answer: "Looks like you meant 'hello' — Hello! How can I assist?" },
    { question: ["version", "app version"], answer: "This demo bot is a local retrieval-based assistant — no external API calls." },
    { question: ["can you help me with refunds", "help with refunds"], answer: "I can explain refund steps; share details of your booking or visit 'My Bookings'." },
    { question: ["who discovered penicillin", "penicillin discovered"], answer: "Alexander Fleming discovered penicillin in 1928." },
    { question: ["speed of light"], answer: "The speed of light in vacuum is approximately 299,792 kilometres per second." },
    { question: ["who wrote hamlet", "hamlet author"], answer: "William Shakespeare wrote Hamlet." },
    { question: ["what is bitcoin"], answer: "Bitcoin is a decentralized digital currency introduced in 2009." },
    { question: ["what is blockchain"], answer: "Blockchain is a distributed ledger technology used in cryptocurrencies and beyond." },
    { question: ["what is html"], answer: "HTML is the markup language used to structure web pages." },
    { question: ["what is css"], answer: "CSS is used to style HTML elements and control layout and visuals." },
    { question: ["what is javascript"], answer: "JavaScript is a programming language that enables interactive web pages." },
    { question: ["pricing", "how much does it cost", "cost"], answer: "Costs vary by product/route — check the pricing or booking page for exact fares." },
    { question: ["refund time", "how long refund"], answer: "Refund processing time varies — usually within a few business days depending on payment method." },
    { question: ["where is my booking", "my booking"], answer: "Check 'My Bookings' in your account — you'll see current and past bookings there." },
    { question: ["how to change booking", "change booking"], answer: "If allowed, modify your booking from 'My Bookings' or contact support for assistance." },
    { question: ["late arrival", "delay", "delayed"], answer: "Delays can happen — check real-time updates on the booking or route page." },
    { question: ["connectivity problems", "can't connect", "connection error"], answer: "Check your internet, try a different network, or open a private window to retry." },
    { question: ["account locked", "locked account"], answer: "If your account is locked, follow the unlock instructions or contact support." },
    { question: ["who is the prime minister of india", "pm india"], answer: "The prime minister is the current political leader — check news for the latest name." },
    { question: ["who is the president of the usa", "us president"], answer: "The current US President may change — check a reliable news source for the latest." },
    { question: ["what languages do you speak", "languages"], answer: "I mainly respond in English here, but can include small phrases in other languages." },
    { question: ["are you offline", "offline bot"], answer: "Yes — this bot runs locally and uses a retrieval-style knowledge base." },
    { question: ["privacy policy", "data policy"], answer: "Read our Privacy Policy page to learn how your data is handled." },
    { question: ["how many entries do you have", "kb size"], answer: "This demo contains 100+ curated Q&A entries to help during the demo." }
  ];

  function getCurrentDateTime() {
    const now = new Date();
    const date = now.getFullYear() + '-' +
      (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
      now.getDate().toString().padStart(2, '0');
    const time = now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');
    return { date, time };
  }

  function saveSessions() {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }

  function sendMessage() {
    const userText = input.value.trim();
    if (!userText) return;
    addMessage(userText, 'user');
    input.value = '';

    let answerObj = knowledgeBase.find(item =>
      item.question.some(q => userText.toLowerCase().includes(q.toLowerCase()))
    );
    let answer = answerObj ? answerObj.answer : "Sorry, I didn't understand that.";
    displayTyping(answer);
  }

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  newChatBtn.addEventListener('click', () => {
    startNewSession();
  });

  function startNewSession() {
    let sessionName = prompt("Enter session name:", `Session ${sessions.length + 1}`);
    if (!sessionName) sessionName = `Session ${sessions.length + 1}`;

    if (currentSession.length > 0) {
      const { date, time } = getCurrentDateTime();
      sessions.push({ name: sessionName, messages: [...currentSession], lastUpdated: `${date} ${time}` });
      saveSessions();
      updateSessionList();
    }

    currentSession = [];
    chatlogs.innerHTML = '';
    addMessage(`New session started: ${sessionName}`, 'bot');
  }

  function addMessage(msg, sender) {
    const { time } = getCurrentDateTime();
    const p = document.createElement('div');
    p.className = 'message ' + (sender === 'user' ? 'user' : 'bot');

    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.innerText = sender === 'user' ? '🧑' : '🤖';
    p.appendChild(avatar);

    const text = document.createElement('span');
    text.className = 'message-text';
    text.innerText = msg;
    p.appendChild(text);

    const ts = document.createElement('span');
    ts.className = 'timestamp';
    ts.innerText = time;
    p.appendChild(ts);

    chatlogs.appendChild(p);
    currentSession.push({ sender, msg, time });

    setTimeout(() => {
      p.style.transition = 'opacity 0.4s ease';
      p.style.opacity = 1;
      chatlogs.scrollTo({ top: chatlogs.scrollHeight, behavior: 'smooth' });
    }, 10);
  }

  function displayTyping(msg) {
    const p = document.createElement('div');
    p.className = 'message typing';
    p.innerHTML = 'RetroBot is typing <span class="dots">.</span><span class="dots">.</span><span class="dots">.</span>';
    chatlogs.appendChild(p);
    chatlogs.scrollTo({ top: chatlogs.scrollHeight, behavior: 'smooth' });

    setTimeout(() => {
      p.remove();
      addMessage(msg, 'bot');
    }, 700);
  }

  function updateSessionList() {
    sessionList.innerHTML = '';
    sessions.forEach((sess, idx) => {
      const btn = document.createElement('button');
      btn.className = 'session-btn';
      const [name, datetime] = [sess.name, sess.lastUpdated || ''];
      btn.innerHTML = `
        <span class="session-name">${name}</span>
        <span class="session-datetime">${datetime}</span>`;
      btn.addEventListener('click', () => loadSession(idx));
      sessionList.appendChild(btn);
    });
  }

  function loadSession(idx) {
    const sessObj = sessions[idx];
    if (!sessObj) return;
    chatlogs.innerHTML = '';
    sessObj.messages.forEach(msgObj => {
      const p = document.createElement('div');
      p.className = 'message ' + (msgObj.sender === 'user' ? 'user' : 'bot');

      const avatar = document.createElement('span');
      avatar.className = 'avatar';
      avatar.innerText = msgObj.sender === 'user' ? '🧑' : '🤖';
      p.appendChild(avatar);

      const text = document.createElement('span');
      text.className = 'message-text';
      text.innerText = msgObj.msg;
      p.appendChild(text);

      const ts = document.createElement('span');
      ts.className = 'timestamp';
      ts.innerText = msgObj.time;
      p.appendChild(ts);

      chatlogs.appendChild(p);
      p.style.opacity = 0;
      setTimeout(() => { p.style.transition = 'opacity 0.4s ease'; p.style.opacity = 1; }, 10);
    });
    chatlogs.scrollTo({ top: chatlogs.scrollHeight, behavior: 'smooth' });
    currentSession = [...sessObj.messages];
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const btns = sessionList.querySelectorAll('.session-btn');
    btns.forEach((btn, idx) => {
      const name = sessions[idx].name.toLowerCase();
      btn.style.display = name.includes(query) ? 'flex' : 'none';
    });
  });

  updateSessionList();
});
