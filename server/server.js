const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const isUnsafeContent = (title) => {
    // List of keywords related to unsafe or explicit content
    const unsafeKeywords = ['adult', 'explicit', 'unsafe', '18+' , 'free'];
  
    // Check if any of the keywords are present in the title or description
    const containsUnsafeKeyword = unsafeKeywords.some(keyword =>
      title.toLowerCase().includes(keyword)
    );
  
    return containsUnsafeKeyword;
  };
  
  app.use(cors()); // Enable CORS for all routes
  app.use(bodyParser.json());
  
  app.post('/api/checkForSafety', (req, res) => {
    const droppedCards = req.body.droppedCards;
  
    // Extract titles and descriptions from dropped cards
    const titles = droppedCards.map(card => card.title);
  console.log(titles);
    // Perform safety check based on keywords
    const isUnsafe = titles.some((title, index) => isUnsafeContent(title));
  
    if (isUnsafe) {
      res.json({ success: false, message: 'Content contains unsafe keywords' });
    } else {
      res.json({ success: true, message: 'Safety check successful' });
    }
  });

app.listen(8000, () => {
    console.log('Server started on port 8000');
});