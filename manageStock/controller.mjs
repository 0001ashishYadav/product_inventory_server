import { ServerError } from "../error.mjs";
import { DB_ERR_CODES, prisma } from "../prisma/db.mjs";

const getProducts = async (req, res, next) => {
  // const products = await prisma.product.findMany();

  try {
    const products = await prisma.product.findMany({
      include: {
        inventory: {
          select: { quantity: true },
        },
        entry: {
          orderBy: { entryDate: "desc" },
          take: 1, // get only the latest entry (for latest price)
          select: { price: true, quantity: true },
        },
      },
    });

    res.json({ message: "Products retrieved successfully", products });
  } catch (error) {
    console.error(error);
    throw new ServerError(500, "unable to fetch products");
  }
};

const getAllInventory = async (req, res, next) => {
  try {
    const inventories = await prisma.inventory.findMany({
      include: {
        product: {
          select: {
            name: true,
            category: true,
            minQuantity: true,
            entry: {
              orderBy: { entryDate: "desc" },
              take: 1, // get only the latest entry (for latest price)
              select: { price: true },
            },
          },
        },
      },
    });

    res.json({ message: "All inventories", inventories });
  } catch (error) {
    console.error(error);
    throw new ServerError(500, "unable to fetch inventories");
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany();

    res.json({ message: "All Team Members", allUsers });
  } catch (error) {
    console.log(error);
    throw new ServerError(500, "unable to fetch users");
  }
};

const getAllEntries = async (req, res, next) => {
  try {
    const enteries = await prisma.entry.findMany({
      include: {
        product: {
          select: { name: true },
        },
        user: {
          select: { id: true, name: true },
        },
      },
    });

    res.json({ message: "Get all entries successfully", enteries });
  } catch (error) {
    console.log(error);
    throw new ServerError(500, "unable to fetch entries");
  }
};

const getAllExits = async (req, res, next) => {
  try {
    const exits = await prisma.exit.findMany({
      include: {
        product: {
          select: { name: true },
        },
        user: {
          select: { id: true, name: true },
        },
      },
    });

    res.json({ message: "Get all exits", exits });
  } catch (error) {}
};

const addProduct = async (req, res, next) => {
  try {
    const { name, skuId, description, minQuantity, category } = req.body;

    // Step 1: Create the Product
    const product = await prisma.product.create({
      data: {
        name,
        skuId,
        description,
        minQuantity,
        category,
      },
    });

    // Step 2: Automatically create Inventory record for this product
    const inventory = await prisma.inventory.create({
      data: {
        productId: product.id,
        quantity: 0, // default quantity
        location: null, // or set default if you have one
      },
    });

    console.log({ product, inventory });

    // Step 3: Respond
    res.json({
      message: "Product and inventory created successfully",
      product,
      inventory,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    next(error);
  }
};

const productEntry = async (req, res, next) => {
  const { productId, quantity, price, notes, addedBy } = req.body;

  console.log(req.body); // ✅ check these are not undefined

  // When adding an entry
  try {
    const newEntry = await prisma.$transaction(async (tx) => {
      await tx.entry.create({
        data: { productId, quantity, price, notes, addedBy },
      });

      await tx.inventory.upsert({
        where: { productId: productId },
        update: { quantity: { increment: quantity } },
        create: { productId: productId, quantity: quantity },
      });
    });

    res.json({ message: "Product entry recorded successfully", newEntry });
  } catch (error) {
    console.log(error);
    throw new ServerError(500, "unable to record product entry");
  }
};

const productExit = async (req, res, next) => {
  const { productId, quantity, price, reason, removedBy } = req.body;

  console.log(req.body); // ✅ check these are not undefined

  try {
    const exitItem = await prisma.$transaction(async (tx) => {
      const inventory = await tx.inventory.findUnique({
        where: { productId: productId },
        select: { quantity: true },
      });

      if (!inventory || inventory.quantity < quantity) {
        throw new Error("Not enough stock to remove");
      }

      const exit = await tx.exit.create({
        data: { productId, quantity, price, reason, removedBy },
      });

      await tx.inventory.update({
        where: { productId: productId },
        data: { quantity: { decrement: quantity } },
      });

      return exit;
    });

    res.json({ message: "Product exit recorded successfully", exitItem });
  } catch (error) {
    console.log(error);
    throw new ServerError(500, "unable to record product exit");
  }
};

export {
  getProducts,
  getAllInventory,
  getAllUsers,
  getAllEntries,
  getAllExits,
  addProduct,
  productEntry,
  productExit,
};
