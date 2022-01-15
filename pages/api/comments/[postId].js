import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../lib/db-util';

const handler = async (req, res) => {
  const postId = req.query.postId;

  // CONNECT TO MONGODB
  let client;

  try {
    client = await connectDatabase('posts');
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    return;
  }

  // 1) POST COMMENT
  if (req.method === 'POST') {
    // GET INPUT
    const { postId, email, name, commentDetail, date } = req.body;

    // VALIDATE INPUT
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !commentDetail ||
      commentDetail.trim() === ''
    ) {
      // SENDING ERROR RESPONSE
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    // NEW COMMENT DATA
    const newComment = {
      postId,
      email,
      name,
      commentDetail,
      date,
    };

    // INSERT DOCUMENT TO COLLECTIONS
    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment.id = result.insertedId;
      // SENDING RESPONSE
      res
        .status(201)
        .json({ message: 'Successfully commented!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Storing comment data failed!' });
    }
  }

  // 2) GET COMMENTS
  if (req.method === 'GET') {
    // GET DATABASE
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { postId: postId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }

  // CLOSING CONNECTION
  client.close();
};

export default handler;
