import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Number: FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(value);

  useEffect(() => {
    setCount(value);
  }, [value]);

  return (
    <div className="flex h-screen items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={count}
          className="p-4"
          initial={{ opacity: 0, y: count > value ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: count > value ? 10 : -10 }}
        >
          {count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Number;
