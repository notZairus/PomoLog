import React, { ReactPortal } from 'react'
import ReactDom from "react-dom";
import { AnimatePresence, motion } from "motion/react";


interface ModalProps {
  children: React.ReactNode,
  isOpen: boolean,
  handleClose: () => void 
}




export default function modal({ children, isOpen, handleClose }: ModalProps): ReactPortal {
  return ReactDom.createPortal(
    <>
      <AnimatePresence>
        {
          isOpen && (
            <motion.div 
              className='fixed inset-0 bg-black/40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <div className='absolute top-1/2 left-1/2 -translate-1/2 aspect-square'>
                {children}
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </>, document.getElementById('portal')
  )
}
