const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]
const totalPostsContainer = document.getElementById("total-posts-container")


function render(posts) {

    for(let i = 0; i < posts.length; i++) {
        const postData = posts[i]

        const postHTML = `
            <section class="post-container">
                <header class="post-header-container">
                    <img class="profile-img" src="${postData.avatar}">
                    <div class="post-details">
                        <p class="profile-name bold">${postData.name}</p>
                        <p class="location-name">${postData.location}</p>
                    </div>
                </header>
                <img class="post-img" src="${postData.post}">
                <div class="post-interactions-container">
                    <div class="interactions-btns-container">
                        <button onclick="handleLike(${i})" class="interaction-btn">
                            <img class="interaction-icon" src="images/icon-heart.png">
                        </button>
                        <button class="interaction-btn">
                            <img class="interaction-icon" src="images/icon-comment.png">
                        </button>
                        <button class="interaction-btn">
                            <img class="interaction-icon" src="images/icon-dm.png">
                        </button>
                        <p id="post-${i}-likes-text" class="likes-text bold">${postData.likes} likes</p>
                        <p class="comment-text"><span class="bold">${postData.username}</span> ${postData.comment}</p>
                    </div>
                </div>
            </section>
        `

        totalPostsContainer.innerHTML += postHTML
    }
}

render(posts)

function handleLike(idx) {
    const postData = posts[idx]
    postData.likes += 1
    const likesText = document.getElementById("post-" + idx + "-likes-text")
    likesText.textContent = `${postData.likes} likes`
}