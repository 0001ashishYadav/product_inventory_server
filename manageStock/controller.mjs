const products = (req, res, next) => {
  res.json({ message: "Products retrieved successfully" });
};

const addProduct = (req, res, next) => {
  res.json({ message: "Product added successfully" });
};

const productEntry = (req, res, next) => {
  res.json({ message: "Product entry recorded successfully" });
};

const productExit = (req, res, next) => {
  res.json({ message: "Product exit recorded successfully" });
};

export { products, addProduct, productEntry, productExit };
