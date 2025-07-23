//Post Feture
// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBVprwDo6-D2Kiew1t9HUFwArc3kee1098",
  authDomain: "database-fa911.firebaseapp.com",
  databaseURL: "https://database-fa911-default-rtdb.firebaseio.com",
  projectId: "database-fa911",
  storageBucket: "database-fa911.appspot.com",
  messagingSenderId: "252546770882",
  appId: "1:252546770882:web:05d722d1107f2d95fa585b",
  measurementId: "G-XPXGY7R0NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form Elements
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const imageUrlInput = document.getElementById('imageUrl');
const feed = document.getElementById('feed');

// Post Submit Handler
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const imageUrl = imageUrlInput.value.trim();

  if (!title) return;

  await push(ref(database, 'posts'), {
    title,
    imageUrl: imageUrl || null,
    timestamp: Date.now()
  });

  postForm.reset();
});

// Display Posts
const postsRef = ref(database, 'posts');
onValue(postsRef, (snapshot) => {
  const data = snapshot.val();
  feed.innerHTML = ''; // Clear existing feed

  if (data) {
    const sorted = Object.entries(data).sort((a, b) => b[1].timestamp - a[1].timestamp);

    sorted.forEach(([id, post]) => {
      const postDiv = document.createElement('div');
      postDiv.className = "bg-gray-800 rounded-lg shadow p-4";

      postDiv.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image" class="rounded w-40 h-40 max-h-96 object-cover">` : ''}
      `;

      feed.appendChild(postDiv);
    });
  }
});
