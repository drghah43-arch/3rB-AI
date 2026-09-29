// ===============================
// 3rB AI - JavaScript
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ثابت 3rB AI
    // ===============================

    const AI_NAME = "3rB AI";
    const AI_IMAGE = "3rb-ai.png";

    // ===============================
    // Elements
    // ===============================

    const setupScreen = document.getElementById("setupScreen");
    const app = document.getElementById("app");

    const setupForm = document.getElementById("setupForm");

    const userNameInput = document.getElementById("userName");
    const userAvatarInput = document.getElementById("userAvatar");

    const sidebar = document.getElementById("sidebar");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeSidebar = document.getElementById("closeSidebar");

    const newChatBtn = document.getElementById("newChatBtn");
    const sendBtn = document.getElementById("sendBtn");

    const messageInput = document.getElementById("messageInput");
    const messages = document.getElementById("messages");

    const welcomeScreen = document.getElementById("welcomeScreen");

    const profileBtn = document.getElementById("profileBtn");
    const settingsBtn = document.getElementById("settingsBtn");

    const profileModal = document.getElementById("profileModal");
    const settingsModal = document.getElementById("settingsModal");

    const closeProfile = document.getElementById("closeProfile");
    const closeSettings = document.getElementById("closeSettings");

    const saveProfileBtn = document.getElementById("saveProfileBtn");

    const sidebarProfileName =
        document.getElementById("sidebarProfileName");

    const sidebarProfileAvatar =
        document.getElementById("sidebarProfileAvatar");

    const topAssistantName =
        document.getElementById("topAssistantName");

    const topAssistantAvatar =
        document.getElementById("topAssistantAvatar");

    const heroAssistantName =
        document.getElementById("heroAssistantName");

    const heroAssistantAvatar =
        document.getElementById("heroAssistantAvatar");

    const clearChatBtn =
        document.getElementById("clearChatBtn");

    const resetAppBtn =
        document.getElementById("resetAppBtn");

    // ===============================
    // User Data
    // ===============================

    let profile = {
        userName: "",
        userAvatar: ""
    };

    let chats = [];
    let currentChatId = null;

    // ===============================
    // Load Data
    // ===============================

    function loadData() {
        try {
            const savedProfile =
                localStorage.getItem("3rbAI_profile");

            const savedChats =
                localStorage.getItem("3rbAI_chats");

            if (savedProfile) {
                const data = JSON.parse(savedProfile);

                profile.userName =
                    data.userName || "";

                profile.userAvatar =
                    data.userAvatar || "";
            }

            if (savedChats) {
                chats = JSON.parse(savedChats);

                if (!Array.isArray(chats)) {
                    chats = [];
                }
            }

        } catch (error) {
            console.error(
                "Error loading 3rB AI data:",
                error
            );

            profile = {
                userName: "",
                userAvatar: ""
            };

            chats = [];
        }
    }

    // ===============================
    // Save Data
    // ===============================

    function saveData() {
        localStorage.setItem(
            "3rbAI_profile",
            JSON.stringify(profile)
        );

        localStorage.setItem(
            "3rbAI_chats",
            JSON.stringify(chats)
        );
    }

    // ===============================
    // Show Setup
    // ===============================

    function showSetup() {
        if (setupScreen) {
            setupScreen.style.display = "flex";
        }

        if (app) {
            app.style.display = "none";
        }
    }

    // ===============================
    // Show App
    // ===============================

    function showApp() {
        if (setupScreen) {
            setupScreen.style.display = "none";
        }

        if (app) {
            app.style.display = "flex";
        }

        updateUI();
    }

    // ===============================
    // Update UI
    // ===============================

    function updateUI() {

        // AI NAME ثابت
        if (topAssistantName) {
            topAssistantName.textContent = AI_NAME;
        }

        if (heroAssistantName) {
            heroAssistantName.textContent = AI_NAME;
        }

        // AI IMAGE ثابت
        if (topAssistantAvatar) {
            topAssistantAvatar.src = AI_IMAGE;
        }

        if (heroAssistantAvatar) {
            heroAssistantAvatar.src = AI_IMAGE;
        }

        // User Name
        if (sidebarProfileName) {
            sidebarProfileName.textContent =
                profile.userName || "أنت";
        }

        // User Image
        if (sidebarProfileAvatar) {

            if (profile.userAvatar) {
                sidebarProfileAvatar.src =
                    profile.userAvatar;
            } else {
                sidebarProfileAvatar.src =
                    createDefaultAvatar(
                        profile.userName || "أنت"
                    );
            }
        }
    }

    // ===============================
    // Default User Avatar
    // ===============================

    function createDefaultAvatar(name) {

        const letter =
            (name || "أ").charAt(0).toUpperCase();

        const svg = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 200 200"
            >
                <rect
                    width="200"
                    height="200"
                    rx="100"
                    fill="#17172a"
                />

                <text
                    x="100"
                    y="115"
                    text-anchor="middle"
                    font-size="90"
                    font-family="Arial"
                    fill="white"
                >
                    ${letter}
                </text>
            </svg>
        `;

        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg)
        );
    }

    // ===============================
    // Setup
    // ===============================

    if (setupForm) {

        setupForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                profile.userName =
                    userNameInput
                        ? userNameInput.value.trim()
                        : "";

                if (!profile.userName) {
                    profile.userName = "أنت";
                }

                saveData();
                showApp();
            }
        );
    }

    // ===============================
    // User Image From Files
    // ===============================

    if (userAvatarInput) {

        userAvatarInput.addEventListener(
            "change",
            (event) => {

                const file =
                    event.target.files &&
                    event.target.files[0];

                if (!file) {
                    return;
                }

                // التأكد إن الملف صورة
                if (!file.type.startsWith("image/")) {
                    alert("اختار ملف صورة فقط.");
                    return;
                }

                const reader = new FileReader();

                reader.onload = (e) => {

                    // حفظ الصورة المختارة
                    profile.userAvatar =
                        e.target.result;

                    saveData();

                    // تحديث الصورة فورًا
                    updateUI();
                };

                reader.onerror = () => {
                    alert("حصل خطأ أثناء قراءة الصورة.");
                };

                // قراءة الصورة من جهاز المستخدم
                reader.readAsDataURL(file);
            }
        );
    }

    // ===============================
    // Send Message
    // ===============================

    function sendMessage() {

        if (!messageInput || !messages) {
            return;
        }

        const text =
            messageInput.value.trim();

        if (!text) {
            return;
        }

        hideWelcome();

        addMessage(text, "user");

        messageInput.value = "";

        autoResize();

        saveCurrentChat();

        setTimeout(() => {

            const response =
                generateDemoResponse(text);

            addMessage(
                response,
                "assistant"
            );

            saveCurrentChat();

        }, 700);
    }

    // ===============================
    // Add Message
    // ===============================

    function addMessage(text, sender) {

        if (!messages) {
            return;
        }

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "message " + sender;

        // Avatar
        const avatar =
            document.createElement("img");

        avatar.className =
            "message-avatar";

        if (sender === "assistant") {

            // AI ثابت
            avatar.src = AI_IMAGE;
            avatar.alt = AI_NAME;

        } else {

            // User
            avatar.src =
                profile.userAvatar ||
                createDefaultAvatar(
                    profile.userName || "أنت"
                );

            avatar.alt =
                profile.userName || "أنت";
        }

        // Content
        const content =
            document.createElement("div");

        content.className =
            "message-content";

        // Name
        const name =
            document.createElement("div");

        name.className =
            "message-name";

        name.textContent =
            sender === "assistant"
                ? AI_NAME
                : profile.userName || "أنت";

        // Bubble
        const bubble =
            document.createElement("div");

        bubble.className =
            "message-bubble";

        bubble.textContent = text;

        content.appendChild(name);
        content.appendChild(bubble);

        messageElement.appendChild(avatar);
        messageElement.appendChild(content);

        messages.appendChild(messageElement);

        messages.scrollTop =
            messages.scrollHeight;
    }

    // ===============================
    // Demo AI
    // ===============================

    function generateDemoResponse(text) {

        const lowerText =
            text.toLowerCase();

        if (
            lowerText.includes("السلام عليكم") ||
            lowerText.includes("سلام عليكم")
        ) {
            return (
                "وعليكم السلام ورحمة الله وبركاته يا " +
                (profile.userName || "صديقي") +
                " 👋"
            );
        }

        if (
            lowerText.includes("اسمك") ||
            lowerText.includes("مين انت") ||
            lowerText.includes("من انت")
        ) {
            return (
                "أنا " +
                AI_NAME +
                " 🤖"
            );
        }

        if (
            lowerText.includes("عامل اي") ||
            lowerText.includes("عامل إيه") ||
            lowerText.includes("اخبارك") ||
            lowerText.includes("أخبارك")
        ) {
            return (
                "تمام الحمد لله 😎\n" +
                "جاهز أساعدك يا " +
                (profile.userName || "صديقي") +
                "."
            );
        }

        if (
            lowerText.includes("html") ||
            lowerText.includes("css") ||
            lowerText.includes("javascript") ||
            lowerText.includes("js")
        ) {
            return (
                "أقدر أساعدك في HTML و CSS و JavaScript 👨‍💻\n" +
                "ابعتلي الكود أو قولّي عايز تعمل إيه."
            );
        }

        return (
            "تمام يا " +
            (profile.userName || "صديقي") +
            " 👋\n" +
            "وصلتني رسالتك."
        );
    }

    // ===============================
    // Hide Welcome
    // ===============================

    function hideWelcome() {

        if (welcomeScreen) {
            welcomeScreen.style.display =
                "none";
        }
    }

    // ===============================
    // New Chat
    // ===============================

    function newChat() {

        if (messages) {
            messages.innerHTML = "";
        }

        if (welcomeScreen) {
            welcomeScreen.style.display =
                "flex";
        }

        currentChatId = Date.now();

        chats.push({
            id: currentChatId,
            title: "محادثة جديدة",
            messages: []
        });

        saveData();

        closeSidebarMobile();
    }

    if (newChatBtn) {
        newChatBtn.addEventListener(
            "click",
            newChat
        );
    }

    // ===============================
    // Save Current Chat
    // ===============================

    function saveCurrentChat() {

        if (!messages) {
            return;
        }

        const messageElements =
            messages.querySelectorAll(
                ".message"
            );

        const chatMessages = [];

        messageElements.forEach(
            (messageElement) => {

                const sender =
                    messageElement.classList.contains(
                        "user"
                    )
                        ? "user"
                        : "assistant";

                const bubble =
                    messageElement.querySelector(
                        ".message-bubble"
                    );

                if (bubble) {
                    chatMessages.push({
                        sender: sender,
                        text: bubble.textContent
                    });
                }
            }
        );

        if (!currentChatId) {

            currentChatId = Date.now();

            chats.push({
                id: currentChatId,
                title: "محادثة جديدة",
                messages: []
            });
        }

        const chat =
            chats.find(
                (item) =>
                    item.id === currentChatId
            );

        if (chat) {

            chat.messages =
                chatMessages;

            if (
                chatMessages.length > 0 &&
                chatMessages[0].sender === "user"
            ) {

                chat.title =
                    chatMessages[0]
                        .text
                        .substring(0, 30);
            }
        }

        saveData();
    }

    // ===============================
    // Send Button
    // ===============================

    if (sendBtn) {
        sendBtn.addEventListener(
            "click",
            sendMessage
        );
    }

    // ===============================
    // Message Input
    // ===============================

    if (messageInput) {

        messageInput.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();
                }
            }
        );

        messageInput.addEventListener(
            "input",
            autoResize
        );
    }

    function autoResize() {

        if (!messageInput) {
            return;
        }

        messageInput.style.height =
            "auto";

        messageInput.style.height =
            Math.min(
                messageInput.scrollHeight,
                160
            ) + "px";
    }

    // ===============================
    // Mobile Sidebar
    // ===============================

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                if (sidebar) {
                    sidebar.classList.add(
                        "active"
                    );
                }
            }
        );
    }

    if (closeSidebar) {

        closeSidebar.addEventListener(
            "click",
            closeSidebarMobile
        );
    }

    function closeSidebarMobile() {

        if (sidebar) {
            sidebar.classList.remove(
                "active"
            );
        }
    }

    // ===============================
    // Profile Modal
    // ===============================

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                if (profileModal) {
                    profileModal.classList.add(
                        "active"
                    );
                }
            }
        );
    }

    if (closeProfile) {

        closeProfile.addEventListener(
            "click",
            () => {

                if (profileModal) {
                    profileModal.classList.remove(
                        "active"
                    );
                }
            }
        );
    }

    // ===============================
    // Settings
    // ===============================

    if (settingsBtn) {

        settingsBtn.addEventListener(
            "click",
            () => {

                if (settingsModal) {
                    settingsModal.classList.add(
                        "active"
                    );
                }
            }
        );
    }

    if (closeSettings) {

        closeSettings.addEventListener(
            "click",
            () => {

                if (settingsModal) {
                    settingsModal.classList.remove(
                        "active"
                    );
                }
            }
        );
    }

    // ===============================
    // Save Profile
    // ===============================

    if (saveProfileBtn) {

        saveProfileBtn.addEventListener(
            "click",
            () => {

                const newName =
                    userNameInput
                        ? userNameInput.value.trim()
                        : "";

                if (newName) {
                    profile.userName =
                        newName;
                }

                saveData();
                updateUI();

                if (profileModal) {
                    profileModal.classList.remove(
                        "active"
                    );
                }

                if (settingsModal) {
                    settingsModal.classList.remove(
                        "active"
                    );
                }
            }
        );
    }

    // ===============================
    // Clear Chat
    // ===============================

    if (clearChatBtn) {

        clearChatBtn.addEventListener(
            "click",
            () => {

                if (messages) {
                    messages.innerHTML = "";
                }

                if (welcomeScreen) {
                    welcomeScreen.style.display =
                        "flex";
                }

                currentChatId = null;

                saveData();
            }
        );
    }

    // ===============================
    // Reset App
    // ===============================

    if (resetAppBtn) {

        resetAppBtn.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "هل تريد حذف بيانات المستخدم وإعادة البداية؟"
                    );

                if (!confirmed) {
                    return;
                }

                localStorage.removeItem(
                    "3rbAI_profile"
                );

                localStorage.removeItem(
                    "3rbAI_chats"
                );

                profile = {
                    userName: "",
                    userAvatar: ""
                };

                chats = [];
                currentChatId = null;

                showSetup();
            }
        );
    }

    // ===============================
    // Close Modals
    // ===============================

    window.addEventListener(
        "click",
        (event) => {

            if (
                profileModal &&
                event.target === profileModal
            ) {
                profileModal.classList.remove(
                    "active"
                );
            }

            if (
                settingsModal &&
                event.target === settingsModal
            ) {
                settingsModal.classList.remove(
                    "active"
                );
            }
        }
    );

    // ===============================
    // Start
    // ===============================

    loadData();

    if (!profile.userName) {
        showSetup();
    } else {
        showApp();
    }

});