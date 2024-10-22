import { FC, memo, useEffect, useRef, useState } from "react";
import './toast.sass';

type ToastType = {
  id: number,
  title: string,
  desc: string
}

type ToastItemType = {
  toast: ToastType,
  removeToast: (id:number) => void
}

const ToastItem:FC<ToastItemType> = memo(({toast, removeToast}) => {
  const toastItemRef = useRef<any>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastHeight, setToastHeight] = useState<number>(0);
  useEffect(() => {
    const getToastEl = toastItemRef.current.getBoundingClientRect();
    setToastHeight(getToastEl.height);
    setShowToast(true);
  }, [])
  const closeToast = () => {
    setShowToast(false);
    setToastHeight(0);
    setTimeout(() => {
      removeToast(toast.id)
    }, 500);
  }
  return (
    <div
      className={`custom-toast-item-container ${showToast ? "show" : ""}`}
      style={{height: `${toastHeight}px`}}
    >
      <div className="custom-toast-item" ref={toastItemRef}>
        <div className="custom-toast-content success">
          <div className="item-message">
            <div className="item-title">
              <div className="title-text">{toast.title}</div>
              <div className="close-btn">
                <button className="btn btn-none icon-only" onClick={() => closeToast()}>Close</button>
              </div>
            </div>
            <div className="item-desc">{toast.desc}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export const ToastPage:FC = () => {
  const [toastList, setToastList] = useState<ToastType[]>([]);
  const openToast = (type:string) => {
    let newId = 1;
    if(toastList.length) {
      newId = toastList[0].id + 1;
    }
    let newToast:ToastType = {
      id: newId,
      title: "",
      desc: ""
    }
    switch (type) {
      case "short":
        newToast.title = "Short title";
        newToast.desc = "This is a short toast."
        break;
      case "long":
        newToast.title = "Long long title";
        newToast.desc = "This is a longer toast that will be cut into 2 lines I hope."
        break;
      case "exLong":
        newToast.title = "Extra long title";
        newToast.desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nostrum nisi corporis amet eveniet excepturi eius repudiandae velit quas, provident ipsam iure dicta a dolore deserunt quod explicabo omnis perferendis!"
        break;
      default:
        break;
    }
    setToastList((prev) => [newToast, ...prev])
  }
  const removeToast = (id:number) => {
    setToastList(prev => prev.filter(item => item.id !== id));
  }
  return (
    <>
      <button onClick={() => openToast("short")}>short text</button>
      <button onClick={() => openToast("long")}>long text</button>
      <button onClick={() => openToast("exLong")}>extra long text</button>
      <div className="custom-toast-container stack">
        {toastList.map(toastItem => {
          return (
            <ToastItem
              key={toastItem.id}
              toast={toastItem}
              removeToast={(id:number) => {removeToast(id)}}
            />
          )
        })}
      </div>
    </>
  )
}