import { FC, useEffect, useRef, useState } from "react";
import './modal2.sass';

export const Modal2Page:FC = () => {
  const [openModalBackdrop, setOpenModalBackdrop] = useState<boolean>(false);
  const [openModalContent, setOpenModalContent] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [contentSize, setContentSize] = useState<number[]>([300, 80]);
  const [fullHeight, setFullHeight] = useState<boolean>(false);
  const bodyRef = useRef<any>(null);
  useEffect(() => {
    if(!loading) {
      setTimeout(() => {
        const getContentEl = bodyRef.current.getBoundingClientRect();
        setContentSize([getContentEl.width, getContentEl.height]);
        setOpenModalBackdrop(true);
        setOpenModal(true);
        setTimeout(() => {
          setShowContent(true);
          setTimeout(() => {
            setFullHeight(true);
          }, 500);
        }, 400);
      }, 300);
    }
  }, [loading])
  const toggleModal = (type:string) => {
    switch (type) {
      case "open":
        setOpenModalContent(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        break;
      case "close":
        setOpenModalContent(false);
        setOpenModalBackdrop(false);
        setOpenModal(false);
        setTimeout(() => {
          setLoading(true);
          setShowContent(false);
          setContentSize([300, 80]);
          setFullHeight(false);
        }, 500);
        break;
    
      default:
        break;
    }
  }
  return (
    <div>
      <button onClick={() => toggleModal("open")}>open modal</button>
      <div className={`modal-container-2 ${openModal ? "open-manual" : ""}`}>
        <div className={`modal-backdrop ${openModalBackdrop ? "open-manual" : ""}`}></div>
        <div className={`modal-content-container ${openModal ? "open-manual" : ""}`}>
          <div className={`modal-content ${fullHeight ? "full-height" : ""} ${openModalContent ? "open-manual" : ""}`} style={{width: `${contentSize[0]}px`, height: `${contentSize[1]}px`}}>
            <div className={`content-loading ${loading ? "show" : ""}`}>
              <div className="loading-container">
                <div className="loading-spinner">
                  <div className="loading"></div>
                </div>
                <div className="loading-text">Loading modal...</div>
              </div>
            </div>
            {!loading ? (
              <div className={`content ${showContent ? "show" : ""}`} ref={bodyRef}>
                <div className="content-header">
                  <div className="header-title">Modal title</div>
                  <div className="header-action">
                    <button onClick={() => toggleModal("close")}>Close</button>
                  </div>
                </div>
                <div className="content-body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus, tempore modi incidunt numquam aperiam alias harum animi ratione. Vitae nostrum soluta enim voluptatum atque voluptatibus accusantium nobis veritatis voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus, tempore modi incidunt numquam aperiam alias harum animi ratione. Vitae nostrum soluta enim voluptatum atque voluptatibus accusantium nobis veritatis voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus, tempore modi incidunt numquam aperiam alias harum animi ratione. Vitae nostrum soluta enim voluptatum atque voluptatibus accusantium nobis veritatis voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus, tempore modi incidunt numquam aperiam alias harum animi ratione. Vitae nostrum soluta enim voluptatum atque voluptatibus accusantium nobis veritatis voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus, tempore modi incidunt numquam aperiam alias harum animi ratione. Vitae nostrum soluta enim voluptatum atque voluptatibus accusantium nobis veritatis voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus, tempore modi incidunt numquam aperiam alias harum animi ratione. Vitae nostrum soluta enim voluptatum atque voluptatibus accusantium nobis veritatis voluptas.
                </div>
              </div>
            ) : ""}
          </div>
        </div>
      </div>
    </div>
  )
}