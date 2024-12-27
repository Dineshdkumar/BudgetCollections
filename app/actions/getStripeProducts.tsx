import Stripe from "stripe";

export const FetchProducts = async () => {
  const getProducts = async () => {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16",
      });

      const products = await stripe.products.list({ limit: 99 });
      console.log("Stripe products fetched:", products);

      const priceMap = new Map();

      const prices = await stripe.prices.list({ limit: 99 });
      prices.data.forEach((price) => {
        if (price.product) {
          if (!priceMap.has(price.product)) {
            priceMap.set(price.product, price);
          } else {
            const existingPrice = priceMap.get(price.product);
            if (price.created > existingPrice.created) {
              priceMap.set(price.product, price);
            }
          }
        }
      });
      console.log("Products from Stripe:", products);

      const allProducts = products.data.map((product) => {
        const price = priceMap.get(product.id);

        return {
          id: product.id,
          name: product.name,
          price_id: price ? price.id : null,
          unit_amount: price ? price.unit_amount : null,
          image: product.images[0],
          currency: price ? price.currency : null,
          description: product.description,
          metadata: product.metadata,
        };
      });

      return allProducts;
    } catch (error) {
      console.error("Error fetching products from Stripe:", error);
      throw new Error("Failed to fetch products from Stripe");
    }
  };

  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array or handle the error as needed
  }
};
