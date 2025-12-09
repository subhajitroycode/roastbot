import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-center items-center mt-4 mb-8">
      <Image src="/logo.webp" alt="RoastBot logo" width={300} height={100} />
    </header>
  );
};

export default Header;
