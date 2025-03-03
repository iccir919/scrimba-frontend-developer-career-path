import { initialTweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const homePage = document.getElementById('home-page')
const repliesPage = document.getElementById('replies-page')
const tweetsDataFromLocalStorage = JSON.parse(localStorage.getItem('tweetsData'))
let focusTweetObj = null;
let tweetsData = initialTweetsData

if (tweetsDataFromLocalStorage) {
    tweetsData = tweetsDataFromLocalStorage
}


document.addEventListener('click', function(e){

    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if (e.target.id === 'back-btn') {
        homePage.style.display = 'block'
        repliesPage.style.display = 'none'
        focusTweetObj = null
    }
    else if (e.target.dataset.respond) {
        handleReplyBtnClick(e.target.dataset.respond)
    }
    else if (e.target.dataset.delete) {
        handleDeleteBtnClick(e.target.dataset.delete)
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = findTweet(tweetId)

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
    render() 
}

function handleReplyClick(tweetId){
    repliesPage.style.display = 'block'
    homePage.style.display = 'none'

    focusTweetObj = findTweet(tweetId)
    document.getElementById('focus-tweet').innerHTML = buildInnerTweetHtml(focusTweetObj)
    if (focusTweetObj.replies) {
        document.getElementById('replies').innerHTML = buildRepliesHtml(focusTweetObj.replies)
    }
    document.getElementById('reply-btn').setAttribute("data-respond", tweetId)

}

function handleReplyBtnClick(tweetId) {
    const replyInput = document.getElementById('reply-input')
    if (replyInput.value) {
        const tweet = findTweet(tweetId)
        tweet.replies.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: replyInput.value,
        })
        localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
        replyInput.value = ''
        render()
    }

    
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        tweetInput.value = ''
        localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
        render()
    }
}

function handleDeleteBtnClick(tweetId) {
    let updatedTweetsData = []

    tweetsData.forEach(function(tweet) {
        if (tweet.uuid !== tweetId) {
            updatedTweetsData.push(tweet)
        }
    })

    tweetsData = updatedTweetsData
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData))

    if (focusTweetObj) {
        homePage.style.display = 'block'
        repliesPage.style.display = 'none'
        focusTweetObj = null
    }
    render()
}

function getFeedHtml(){
    let feedHtml = ``

    tweetsData.forEach(function(tweet){
        
        feedHtml += `
            <div class="tweet">
                ${buildInnerTweetHtml(tweet)}            
            </div>
        `
   })
   return feedHtml 
}

function findTweet(tweetId) {
    return tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
}



function buildRepliesHtml(replies) {
    let repliesHtml = ''
    replies.forEach(function(reply) {
        repliesHtml += `
            <div class="tweet-reply" >
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>
        `
    })
    return repliesHtml
}

function buildInnerTweetHtml(tweet) {
    let likeIconClass = ''
        
    if (tweet.isLiked){
        likeIconClass = 'liked'
    }
    
    let retweetIconClass = ''
    
    if (tweet.isRetweeted){
        retweetIconClass = 'retweeted'
    }

    const deleteIconHtmlTemplate = `
        <span class="tweet-detail">
            <i class="fa-solid fa-trash"
            data-delete="${tweet.uuid}"
            ></i>
        </span>
    `
    let deleteIconHtml = ''

    if (tweet.handle === '@Scrimba') {
        deleteIconHtml = deleteIconHtmlTemplate
    }
    
    return `
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots"
                        data-reply="${tweet.uuid}"
                        ></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}"
                        data-like="${tweet.uuid}"
                        ></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}"
                        data-retweet="${tweet.uuid}"
                        ></i>
                        ${tweet.retweets}
                    </span>
                    ${deleteIconHtml}
                </div>   
            </div>            
        </div>
    `
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    if (focusTweetObj) {
        document.getElementById('focus-tweet').innerHTML = buildInnerTweetHtml(focusTweetObj)
        document.getElementById('replies').innerHTML = buildRepliesHtml(focusTweetObj.replies)
    }
}

render()