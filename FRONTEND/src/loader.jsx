import { motion } from "framer-motion";
import LoadingImg from "./assets/loader.png";

const Loader = () => {
  return (
    <div className="flex pt-20 items-center justify-center min-h-screen backdrop-blur-sm bg-white/10">
      <motion.img
        src={LoadingImg}
        alt="Loading..."
        className="w-24 h-24 object-contain"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
