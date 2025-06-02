const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors");
const { Browser, Builder } = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
const chrome = require('selenium-webdriver/chrome');

let topComment;
let topCommentAuthor;
let PostTitleVariable;

/////////////////////////////////////////
let topComments = []
let topCommentAuthors = []
let PostTitleVariables = []

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

const port = 3003;

let InputFrom1;
let commentcount = 3;
let mainLink = "test"

//////////////////////////////////////////////////////////////////////////////////////////////////////duckduckgosearchfiltersection

let duckduckStart = "https://duckduckgo.com/?t=h_&q="
let duckduckEnd = "+site%3Areddit.com&t=h_&ia=web"


const TurnToRedditDuckGo = (sentence) => {  // sentence example such as: ("how to eat chicken without being messy")
  let outputSentence = `${duckduckStart}` + sentence.replaceAll(" ", "+") + `${duckduckEnd}`
  console.log(outputSentence)
  mainLink = outputSentence;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////duckduckgosearchfiltersection




app.post("/main", async (req, res) => {
  InputFrom1 = req.body.message;
  commentcount = req.body.commentcount;
  await seleniumFunction()
  res.sendStatus(200)
})


/////////////////////////////////////////////////////////////////////////////////////////////////////FETCHREDDITJSONFROMLINK



const getRedditLinkTopComment = async (REDDIT) => {
    try {

        let response = await fetch(`${REDDIT}.json`)
        let responseJSON = await response.json()
        let data = responseJSON;

        let POST_TITLE = data[0].data.children[0].data.title
        let POST_SUBREDDIT = data[0].data.children[0].data.subreddit
        let TOP_COMMENT = data[1].data.children[0].data.body
        let TOP_COMMENT_AUTHOR = data[1].data.children[0].data.author

        return TOP_COMMENT;

    } catch(error) {
        console.log(`EROOOOOOOOOOOOOOOOOOOOOR ${error}`)
    }
}

const getRedditLinkTopCommentAuthor = async (REDDIT) => {
  try {

      let response = await fetch(`${REDDIT}.json`)
      let responseJSON = await response.json()
      let data = responseJSON;

      let POST_TITLE = data[0].data.children[0].data.title
      let POST_SUBREDDIT = data[0].data.children[0].data.subreddit
      let TOP_COMMENT = data[1].data.children[0].data.body
      let TOP_COMMENT_AUTHOR = data[1].data.children[0].data.author

      return TOP_COMMENT_AUTHOR;

  } catch(error) {
      console.log(`EROOOOOOOOOOOOOOOOOOOOOR ${error}`)
  }
}

const getRedditLinkPostTitle = async (REDDIT) => {
  try {

      let response = await fetch(`${REDDIT}.json`)
      let responseJSON = await response.json()
      let data = responseJSON;

      let POST_TITLE = data[0].data.children[0].data.title
      let POST_SUBREDDIT = data[0].data.children[0].data.subreddit
      let TOP_COMMENT = data[1].data.children[0].data.body
      let TOP_COMMENT_AUTHOR = data[1].data.children[0].data.author

      return POST_TITLE;

  } catch(error) {
      console.log(`EROOOOOOOOOOOOOOOOOOOOOR ${error}`)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////FETCHREDDITJSONFROMLINK


///////////////////////////////////////////////////////////////////////////////////////////////SELENIUMSELENIUMSELENIUM

const seleniumFunction = async () => {

  topComments = [];
  topCommentAuthors = [];
  PostTitleVariables = [];

  const options = new chrome.Options();
  options.addArguments('--headless'); // Runs Chrome in headless mode
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeOptions(options)
  .build();


  TurnToRedditDuckGo(InputFrom1);
  console.log(mainLink);
  
  await driver.get(`${mainLink}`);
  
const linkArray = await driver.executeScript(`
  return Array.from(document.querySelectorAll('[data-testid="result-title-a"]'))
    .map(a => a.href)
    .filter(href => href.includes("reddit.com") && !href.includes("search"));
`);



  for (let i=0; i<commentcount; i++) {
    console.log("Found Reddit links:", linkArray);
    //push the topcomments
    topComments.push(await getRedditLinkTopComment(linkArray[i]))
    topCommentAuthors.push(await getRedditLinkTopCommentAuthor(linkArray[i]))
    PostTitleVariables.push(await getRedditLinkPostTitle(linkArray[i]))
  }

  await driver.quit();
};


///////////////////////////////////////////////////////////////////////////////////////////////SELENIUMSELENIUMSELENIUM


app.get("/main", (req, res) => {
  res.json({
    topCommentV: topComments,
    topCommentAuthorV: topCommentAuthors,
    postTitleV: PostTitleVariables
  })
})




app.listen(port, () => {
  console.log("listening....")
})