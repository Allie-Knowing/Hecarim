const expiresTime = () => {
  const now = new Date();

  now.setHours(now.getHours() + 2);

  return now.toISOString();
};

export default expiresTime;
