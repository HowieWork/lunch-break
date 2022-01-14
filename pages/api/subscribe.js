const handler = (req, res) => {
  if (req.method === 'POST') {
    // GET INPUT
    const { email } = req.body;
    // VALIDATE INPUT
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    // DO SOMETHING WITH INPUT
    console.log(email);
    res.status(201).json({ message: 'Successfully subscribed!' });
  }
};

export default handler;
