import LoaderSvg from "../assets/loader.svg?react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90">
      <img src={LoaderSvg} alt="Loading..." className="h-16 w-16" />
    </div>
  );
};

export default Loader;
