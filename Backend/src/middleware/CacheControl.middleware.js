const cacheControl = (options = {}) => {
  const { maxAge = 0, isPrivate = false, exclude = [] } = options;

  return (req, res, next) => {
    if (exclude.includes(req.path)) {
      return next(); // Skip caching for excluded routes
    }

    const cacheHeader = isPrivate
      ? `private, max-age=${maxAge}`
      : `public, max-age=${maxAge}`;
    res.set("Cache-Control", cacheHeader);
    next();
  };
};

export { cacheControl}
