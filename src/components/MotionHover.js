import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

MotionHover.propTypes = {
  children: PropTypes.node
};

export default function MotionHover({ children }) {
  return (
    <motion.div
      className="demo"
      whileHover={{
        scale: 1.1,
        opacity: 0.8,
        textShadow: '0px 0px 4px gray'
      }}
    >
      {children}
    </motion.div>
  );
}
