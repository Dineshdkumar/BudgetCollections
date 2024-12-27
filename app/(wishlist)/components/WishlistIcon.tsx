import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { useWishlistStore } from "@/store/useWishlistStore";
import { FC } from "react";

interface WishlistIconProps extends React.HTMLProps<SVGElement> {
  className?: string;
}
const WishlistIcon: FC<WishlistIconProps> = ({ className, ...props }) => {
  const wishlistStore = useWishlistStore();
  return (
    <Link
      href={"/wishlist"}
      className={`${wishlistStore.wishList.length > 0 ? "text-red-700" : null}`}
    >
      <AiOutlineHeart />
    </Link>
  );
};

export default WishlistIcon;
