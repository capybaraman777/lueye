// Firebase 初始化
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, orderBy, query } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔥 Firebase 配置（請填入你的 Firebase 設定）
const firebaseConfig = {
    apiKey: "AIzaSyBdpDe32VGIgI4jm3qCixYmLshe1J84D6Y",
    authDomain: "myproject-c6a8b.firebaseapp.com",
    databaseURL: "https://myproject-c6a8b-default-rtdb.firebaseio.com",
    projectId: "myproject-c6a8b",
    storageBucket: "myproject-c6a8b.appspot.com",
    messagingSenderId: "683127505459",
    appId: "1:683127505459:web:9eb8eefba788cafbda5946",
    measurementId: "G-QREJXQHYYF"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 取得 DOM 元素
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");

// 送出留言
sendButton.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    if (message) {
        await addDoc(collection(db, "messages"), {
            text: message,
            timestamp: serverTimestamp()
        });
        messageInput.value = "";
        loadMessages(); // 重新載入留言
    }
});

// 讀取留言
async function loadMessages() {
    messagesDiv.innerHTML = ""; // 清空留言區
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = data.text;
        messagesDiv.appendChild(messageElement);
    });
}

// 初始載入留言
loadMessages();
