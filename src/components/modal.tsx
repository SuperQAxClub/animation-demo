import { FC, useEffect, useRef, useState } from "react";
import './modal.sass';

export const ModalPage:FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [contentSize, setContentSize] = useState<number[]>([300, 300]);
  const [fullHeight, setFullHeight] = useState<boolean>(false);
  const bodyRef = useRef<any>(null);
  useEffect(() => {
    if(!loading) {
      setTimeout(() => {
        const getContentEl = bodyRef.current.getBoundingClientRect();
        setContentSize([getContentEl.width, getContentEl.height]);
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
        setOpenModal(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        break;
      case "close":
        setOpenModal(false);
        setTimeout(() => {
          setLoading(true);
          setShowContent(false);
          setContentSize([300, 300]);
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
      <div className={`modal-container ${openModal ? "open" : ""}`}>
        <div className="modal-backdrop"></div>
        <div className={`modal-content ${fullHeight ? "full-height" : ""}`} style={{width: `${contentSize[0]}px`, height: `${contentSize[1]}px`}}>
          <div className={`content-loading ${loading ? "show" : ""}`}>
            <div className="loading"></div>
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
  )
}