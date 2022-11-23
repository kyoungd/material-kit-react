import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

MotionFadeIn.propTypes = {
  children: PropTypes.node
};

export default function MotionFadeIn({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {children}
    </motion.div>
  );
}
