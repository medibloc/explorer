import Account from './model';

export const get = async (req, res) => {
  const account = await Account.findById(req.params.id);
  res.json({ data: account });
};

export const list = async (req, res) => {
  const accounts = await Account.findByAll();
  res.json({ data: accounts });
};
