import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  forwardRef,
  useContext,
} from "react";
import { DNDContext } from "./DNDContext";

export const GridElement = forwardRef(
  ({ leftOffset = 0, topOffset = 0, dndIndex, children }, ref) => {
    const {
      gridState,
      setDraggedItemInfo,
      setDragEnd,
      isDragEnabled,
    } = useContext(DNDContext);
    const [wasWiggleAnimationPlayed, setWasWiggleAnimationPlayed] = useState(
      false
    );
    const longPressTimer = useRef(null);

    const enableDragging = useCallback(
      ({
        byTouch = false,
        initialTouchClientX = null,
        initialTouchClientY = null,
      }) => {
        if (byTouch) {
          setDraggedItemInfo({
            clientX: leftOffset,
            clientY: topOffset,
            initialTouchClientX,
            initialTouchClientY,
            dndIndex,
            byTouch,
          });
        } else {
          setDraggedItemInfo({
            clientX: leftOffset,
            clientY: topOffset,
            dndIndex,
            byTouch,
          });
        }
      },
      [leftOffset, topOffset, dndIndex, setDraggedItemInfo]
    );

    const onMouseDown = useCallback(() => {
      if (isDragEnabled) {
        enableDragging({});
      }
    }, [isDragEnabled, enableDragging]);

    const onMouseUp = useCallback(() => {
      if (isDragEnabled) {
        setDragEnd();
      }
    }, [setDragEnd, isDragEnabled]);

    useEffect(() => {
      if (isDragEnabled) {
        setTimeout(() => {
          setWasWiggleAnimationPlayed(true);
        }, 500);
      } else {
        setWasWiggleAnimationPlayed(false);
      }
    }, [isDragEnabled]);

    const onTouchStart = useCallback(
      (event) => {
        if (isDragEnabled) {
          const initialTouchClientX = event.nativeEvent.touches[0].clientX;
          const initialTouchClientY = event.nativeEvent.touches[0].clientY;
          longPressTimer.current = setTimeout(() => {
            enableDragging({
              byTouch: true,
              initialTouchClientX,
              initialTouchClientY,
            });
          }, 1000);
        }
      },
      [longPressTimer, isDragEnabled, enableDragging]
    );

    const onTouchEnd = useCallback(() => {
      if (isDragEnabled) {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
        setDragEnd();
      }
    }, [longPressTimer, isDragEnabled, setDragEnd]);

    return (
      <>
        <div
          className={`draggable${
            isDragEnabled && !wasWiggleAnimationPlayed
              ? " wiggle-animation"
              : ""
          }`}
          ref={ref}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div className="children">{children}</div>
        </div>
        <style jsx>
          {`
            .draggable {
              cursor: pointer;
              position: absolute;
              transition: all 0.5s;
              ${isDragEnabled
                ? `
                          opacity: 0.6;
                          `
                : ``}
              ${gridState.draggedElementIndex === dndIndex
                ? `
                              transition: none;
                              left: ${gridState.clientX}px;
                              top: ${gridState.clientY - 10}px;
                              z-index: 1;
                              opacity: 1;
                              touch-action: none;
                          `
                : `
                              left: ${leftOffset}px;
                              top: ${topOffset}px;
                          `}
                      -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              touch-callout: none;
              -webkit-tap-highlight-color: transparent;
            }
            .draggable:active,
            .draggable:focus {
              outline: none;
            }

            .wiggle-animation {
              animation: DragEnabledWiggleAnimation 0.5s;
            }
            @keyframes DragEnabledWiggleAnimation {
              0% {
                transform: rotate(0deg);
                opacity: 1;
              }
              25% {
                transform: rotate(-1deg) scale(1.02);
                opacity: 1;
              }
              75% {
                transform: rotate(1deg) scale(1.02);
                opacity: 1;
              }
              100% {
                transform: rotate(0deg) scale(1);
                opacity: 0.6;
              }
            }
            .children {
              ${isDragEnabled
                ? `
                          pointer-events: none;
                          `
                : ``}
            }
          `}
        </style>
      </>
    );
  }
);
