import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  createRef,
} from "react";
import { DNDContext } from "./DNDContext";

const getInitialGridState = () => {
  return {
    draggedElementIndex: null,
    clientX: 0,
    clientY: 0,
    byTouch: false,
    initialClientX: null,
    initialClientY: null,
    initialTouchClientX: null,
    initialTouchClientY: null,
  };
};

const getOverlapCoefficient = ({
  draggedX,
  draggedY,
  draggedWidth,
  draggedHeight,
  targetX,
  targetY,
}) => {
  const deltaX = Math.abs(targetX - draggedX);
  const deltaY = Math.abs(targetY - draggedY);
  const totalDelta = deltaX + deltaY;
  const percentageFromTotalPossible =
    (totalDelta / (draggedWidth + draggedHeight)) * 100;
  const direction = targetX - draggedX > 0 ? "LEFT" : "RIGHT";
  let overlapCoefficient;
  //TODO: Make this changeable
  if (percentageFromTotalPossible < 20) {
    overlapCoefficient = totalDelta;
  } else {
    overlapCoefficient = -1;
  }
  return { overlapCoefficient, direction };
};

const getNumberOfRows = ({ numberOfElementsPerRow, numberOfElements }) => {
  return Math.ceil(numberOfElements / numberOfElementsPerRow);
};

const getNumberOfElementsPerRow = ({ gridWidth, childWidth, gap }) => {
  return Math.floor(gridWidth / (childWidth + gap));
};

const getEffectiveGridWidth = ({
  childWidth,
  numberOfElementsPerRow,
  gap,
  insidePadding,
}) => {
  return (
    Math.ceil((childWidth + gap) * numberOfElementsPerRow) + 2 * insidePadding
  );
};

export const Grid = ({
  children,
  gap = 0,
  onElementMove = ({ sourceIndex, targetIndex }) => {},
  wrapperCSS = "",
  scrollable = false,
  fixedHeight = null,
  insidePadding = 0,
  isDragEnabled = true,
  centeredHorizontally = false,
}) => {
  const [gridState, setGridState] = useState(getInitialGridState());
  const gridContainerRef = useRef(null);
  const [gridHeight, setGridHeight] = useState(0);
  const [effectiveGridWidth, setEffectiveGridWidth] = useState(0);
  const childrenRefs = useRef([]);
  const [elementPositions, setElementPositions] = useState({});
  const [spaceBeforeIndex, setSpaceBeforeIndex] = useState(null);
  const [spaceAfterIndex, setSpaceAfterIndex] = useState(null);
  const [maskedElementSpaceIndex, setMaskedElementSpaceIndex] = useState(null);
  const [isScrollingUpNeeded, setIsScrollingUpNeeded] = useState(false);
  const [isScrollingDownNeeded, setIsScrollingDownNeeded] = useState(false);
  const [gridScrollX, setGridScrollX] = useState(null);
  const [gridScrollXLimit, setGridScrollXLimit] = useState(null);
  const scrollTimer = useRef(null);

  const LayoutElements = useCallback(() => {
    if (gridContainerRef.current && childrenRefs.current) {
      const childWidth = Math.ceil(
        childrenRefs.current[0]
          ? childrenRefs.current[0].current.getBoundingClientRect().width
          : 0
      );
      const childHeight = Math.ceil(
        childrenRefs.current[0]
          ? childrenRefs.current[0].current.getBoundingClientRect().height
          : 0
      );

      const gridWidth =
        Math.floor(gridContainerRef.current.getBoundingClientRect().width) -
        2 * insidePadding;

      const numberOfElementsPerRow =
        getNumberOfElementsPerRow({ gridWidth, childWidth, gap }) || 1;

      const effectiveGridWidth = getEffectiveGridWidth({
        childWidth,
        numberOfElementsPerRow,
        gap,
        insidePadding,
      });
      setEffectiveGridWidth(effectiveGridWidth);

      const numberOfRows = getNumberOfRows({
        numberOfElementsPerRow,
        numberOfElements: childrenRefs.current.length,
      });
      if (gridState.draggedElementIndex == null) {
        const gridHeight =
          numberOfRows * childHeight +
          2 * insidePadding +
          gap * (numberOfRows - 1);
        setGridHeight(gridHeight);
      }
      childrenRefs.current.forEach((childRef, index) => {
        let indexInCalculation = index;

        if (spaceBeforeIndex != null && index >= spaceBeforeIndex) {
          indexInCalculation++;
        }

        if (spaceAfterIndex != null && index >= spaceAfterIndex + 1) {
          indexInCalculation++;
        }

        if (
          maskedElementSpaceIndex != null &&
          index > maskedElementSpaceIndex
        ) {
          indexInCalculation--;
        }

        const rowNumberOfElement = Math.floor(
          indexInCalculation / numberOfElementsPerRow
        );
        const numberOfElementInRow =
          indexInCalculation % numberOfElementsPerRow;

        const offsetX =
          numberOfElementInRow * (childWidth + gap) + insidePadding;
        const offsetY =
          rowNumberOfElement * childHeight +
          rowNumberOfElement * gap +
          insidePadding;

        setElementPositions((elementPositions) => {
          return {
            ...elementPositions,
            [index]: {
              offsetX,
              offsetY,
            },
          };
        });
      });
    }
  }, [
    childrenRefs,
    spaceBeforeIndex,
    spaceAfterIndex,
    maskedElementSpaceIndex,
    insidePadding,
    gridContainerRef,
    gridState,
  ]);

  useEffect(() => {
    LayoutElements();
  }, [
    childrenRefs,
    spaceBeforeIndex,
    spaceAfterIndex,
    maskedElementSpaceIndex,
    children,
  ]);

  useEffect(() => {
    const listener = () => {
      LayoutElements();
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [LayoutElements]);

  const setDraggedItemInfo = useCallback(
    ({
      clientX,
      clientY,
      dndIndex,
      byTouch = false,
      initialTouchClientX = null,
      initialTouchClientY = null,
    }) => {
      if (isDragEnabled) {
        if (byTouch) {
          setGridState((gridState) => ({
            ...gridState,
            initialClientY: clientY,
            initialClientX: clientX,
            clientX,
            clientY,
            initialTouchClientX,
            initialTouchClientY,
            draggedElementIndex: dndIndex,
            byTouch,
          }));
        } else {
          setGridState((gridState) => ({
            ...gridState,
            clientX,
            clientY,
            draggedElementIndex: dndIndex,
            byTouch,
          }));
        }
        setMaskedElementSpaceIndex(dndIndex);
      }
    },
    [isDragEnabled]
  );

  const setDragEnd = useCallback(() => {
    let targetIndex = null;
    if (spaceBeforeIndex != null) {
      targetIndex = spaceBeforeIndex;
    } else {
      if (spaceAfterIndex != null) {
        targetIndex = spaceAfterIndex + 1;
      }
    }
    if (targetIndex != null) {
      onElementMove({
        sourceIndex: gridState.draggedElementIndex,
        targetIndex,
      });
    }
    setGridState(getInitialGridState());
    setMaskedElementSpaceIndex(null);
    setSpaceBeforeIndex(null);
    setSpaceAfterIndex(null);
  }, [gridState, spaceBeforeIndex, spaceAfterIndex, onElementMove]);

  const verifyOverlappingItems = useCallback(() => {
    const draggedItemBoundingRect = childrenRefs.current[
      gridState.draggedElementIndex
    ].current.getBoundingClientRect();
    const overlappedElements = childrenRefs.current
      .map((child, index) => ({
        boundingRect: child.current.getBoundingClientRect(),
        index,
      }))
      .filter((element) => element.index != gridState.draggedElementIndex)
      .map((element) => {
        return {
          index: element.index,
          overlapInformation: getOverlapCoefficient({
            draggedX: draggedItemBoundingRect.x,
            draggedY: draggedItemBoundingRect.y,
            draggedWidth: draggedItemBoundingRect.width,
            draggedHeight: draggedItemBoundingRect.height,
            targetX: element.boundingRect.x,
            targetY: element.boundingRect.y,
          }),
        };
      })
      .filter((element) => element.overlapInformation.overlapCoefficient != -1)
      .sort(
        (a, b) =>
          a.overlapInformation.overlapCoefficient -
          b.overlapInformation.overlapCoefficient
      );
    const overlappedElement =
      overlappedElements.length > 0 ? overlappedElements[0] : null;
    if (overlappedElement != null) {
      if (overlappedElement.overlapInformation.direction === "LEFT") {
        setSpaceBeforeIndex(overlappedElement.index);
        setSpaceAfterIndex(null);
      } else {
        setSpaceAfterIndex(overlappedElement.index);
        setSpaceBeforeIndex(null);
      }
    }
  }, [childrenRefs.current, gridState]);

  //Smooth scrolling here! (setTimeout always re-triggering this function if needed)
  useEffect(() => {
    if (gridScrollX != null) {
      const {
        top: topOffsetRelativeToWindow,
        height: childHeight,
      } = childrenRefs.current[
        gridState.draggedElementIndex
      ].current.getBoundingClientRect();
      if (isScrollingUpNeeded) {
        if (topOffsetRelativeToWindow < 50 && gridScrollX >= 0) {
          scrollTimer.current = setTimeout(() => {
            const difference = -1;
            setGridScrollX(gridScrollX + difference);
            gridContainerRef.current.scrollTop += difference;
            setGridState((gridState) => ({
              ...gridState,
              clientY: gridState.clientY + difference,
            }));
          }, 10);
        }
      }
      if (isScrollingDownNeeded) {
        const {
          bottom: bottomOffsetContainerRelativeToWindow,
          height: gridContainerHeight,
        } = gridContainerRef.current.getBoundingClientRect();
        if (
          topOffsetRelativeToWindow + childHeight >
            bottomOffsetContainerRelativeToWindow &&
          gridScrollXLimit >= gridScrollX + gridContainerHeight
        ) {
          scrollTimer.current = setTimeout(() => {
            const difference = 1;
            setGridScrollX(gridScrollX + difference);
            gridContainerRef.current.scrollTop += difference;
            setGridState((gridState) => ({
              ...gridState,
              clientY: gridState.clientY + difference,
            }));
          }, 10);
        }
      }
    }
  }, [gridScrollX]);

  const scrollIfNeeded = useCallback(() => {
    const {
      top: topOffsetRelativeToWindow,
      height: childHeight,
    } = childrenRefs.current[
      gridState.draggedElementIndex
    ].current.getBoundingClientRect();
    const parentScrollTop = gridContainerRef.current.scrollTop;
    const {
      bottom: bottomOffsetContainerRelativeToWindow,
    } = gridContainerRef.current.getBoundingClientRect();

    if (topOffsetRelativeToWindow < 50 && parentScrollTop > 0) {
      setIsScrollingUpNeeded(true);
      setGridScrollX(parentScrollTop);
    } else {
      if (
        topOffsetRelativeToWindow + childHeight >
        bottomOffsetContainerRelativeToWindow
      ) {
        setIsScrollingDownNeeded(true);
        setGridScrollX(parentScrollTop);
        setGridScrollXLimit(gridContainerRef.current.scrollHeight);
      } else {
        setGridScrollX(null);
        setIsScrollingDownNeeded(false);
        setIsScrollingUpNeeded(false);
        setGridScrollXLimit(null);
      }
    }
  }, [
    gridState,
    childrenRefs.current,
    gridContainerRef.current,
    isScrollingUpNeeded,
    isScrollingDownNeeded,
    scrollTimer.current,
  ]);

  const onMouseMove = useCallback(
    (event) => {
      if (gridState.draggedElementIndex != null && isDragEnabled) {
        event.preventDefault();
        const { movementX, movementY } = event.nativeEvent;
        setGridState((gridState) => ({
          ...gridState,
          clientX: gridState.clientX + movementX,
          clientY: gridState.clientY + movementY,
        }));
        verifyOverlappingItems();
        scrollIfNeeded();
      }
    },
    [gridState, isDragEnabled, scrollIfNeeded]
  );

  const onTouchMove = useCallback(
    (event) => {
      if (gridState.draggedElementIndex != null && isDragEnabled) {
        event.preventDefault();
        const movementX =
          gridState.initialTouchClientX - event.nativeEvent.touches[0].clientX;
        const movementY =
          gridState.initialTouchClientY - event.nativeEvent.touches[0].clientY;
        setGridState((gridState) => ({
          ...gridState,
          clientX: gridState.initialClientX - movementX,
          clientY: gridState.initialClientY - movementY,
        }));
        verifyOverlappingItems();
        scrollIfNeeded();
      }
    },
    [gridState, isDragEnabled, scrollIfNeeded]
  );

  return (
    <>
      <DNDContext.Provider
        value={{ gridState, setDraggedItemInfo, setDragEnd, isDragEnabled }}
      >
        <div className="wrapper" ref={gridContainerRef}>
          <div
            className="grid"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
          >
            {React.Children.map(children, (child, index) => {
              let childRef = childrenRefs.current[index];
              //we assign it a ref if it doesn't have one
              if (!childRef) {
                childRef = createRef();
                childrenRefs.current[index] = childRef;
              }
              return React.cloneElement(child, {
                ref: childRef,
                leftOffset: elementPositions[index]
                  ? elementPositions[index].offsetX
                  : 0,
                topOffset: elementPositions[index]
                  ? elementPositions[index].offsetY
                  : 0,
                dndIndex: index,
              });
            })}
          </div>
        </div>
      </DNDContext.Provider>
      <style jsx>
        {`
                  .wrapper {
                      width: 100%;
                      height: ${fixedHeight ? fixedHeight : `${gridHeight}px`};
                      ${
                        centeredHorizontally
                          ? `
                      display: flex;
                      justify-content: center;`
                          : ``
                      }
                       ${scrollable ? `overflow: auto;` : ``}
                      ${wrapperCSS}
                  }
                  .grid {
                      width: ${
                        effectiveGridWidth ? `${effectiveGridWidth}px` : "100%"
                      };
                      position: relative;
                      ${insidePadding ? `padding: ${insidePadding}px;` : ``}
                      transition: all 0.3s;
                      ${
                        fixedHeight || gridHeight > 0
                          ? `
                          opacity: 1;
                          `
                          : `
                          opacity: 0;
                          `
                      }
                  }
              `}
      </style>
    </>
  );
};
