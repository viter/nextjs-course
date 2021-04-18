function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.email);
  }
}

export default handler;
