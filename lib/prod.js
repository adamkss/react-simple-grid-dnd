'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _JSXStyle = _interopDefault(require('styled-jsx/style'));
var React = require('react');
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DNDContext = React.createContext(null);

var getInitialGridState = function getInitialGridState() {
  return {
    draggedElementIndex: null,
    clientX: 0,
    clientY: 0,
    byTouch: false,
    initialClientX: null,
    initialClientY: null,
    initialTouchClientX: null,
    initialTouchClientY: null
  };
};

var getOverlapCoefficient = function getOverlapCoefficient(_ref) {
  var draggedX = _ref.draggedX,
      draggedY = _ref.draggedY,
      draggedWidth = _ref.draggedWidth,
      draggedHeight = _ref.draggedHeight,
      targetX = _ref.targetX,
      targetY = _ref.targetY;
  var deltaX = Math.abs(targetX - draggedX);
  var deltaY = Math.abs(targetY - draggedY);
  var totalDelta = deltaX + deltaY;
  var percentageFromTotalPossible = totalDelta / (draggedWidth + draggedHeight) * 100;
  var direction = targetX - draggedX > 0 ? "LEFT" : "RIGHT";
  var overlapCoefficient; //TODO: Make this changeable

  if (percentageFromTotalPossible < 20) {
    overlapCoefficient = totalDelta;
  } else {
    overlapCoefficient = -1;
  }

  return {
    overlapCoefficient: overlapCoefficient,
    direction: direction
  };
};

var getNumberOfRows = function getNumberOfRows(_ref2) {
  var numberOfElementsPerRow = _ref2.numberOfElementsPerRow,
      numberOfElements = _ref2.numberOfElements;
  return Math.ceil(numberOfElements / numberOfElementsPerRow);
};

var getNumberOfElementsPerRow = function getNumberOfElementsPerRow(_ref3) {
  var gridWidth = _ref3.gridWidth,
      childWidth = _ref3.childWidth,
      gap = _ref3.gap;
  return Math.floor(gridWidth / (childWidth + gap));
};

var getEffectiveGridWidth = function getEffectiveGridWidth(_ref4) {
  var childWidth = _ref4.childWidth,
      numberOfElementsPerRow = _ref4.numberOfElementsPerRow,
      gap = _ref4.gap,
      insidePadding = _ref4.insidePadding;
  return Math.ceil((childWidth + gap) * numberOfElementsPerRow) + 2 * insidePadding;
};

var Grid = function Grid(_ref5) {
  var children = _ref5.children,
      _ref5$gap = _ref5.gap,
      gap = _ref5$gap === void 0 ? 0 : _ref5$gap,
      _ref5$onElementMove = _ref5.onElementMove,
      onElementMove = _ref5$onElementMove === void 0 ? function (_ref6) {
    var sourceIndex = _ref6.sourceIndex,
        targetIndex = _ref6.targetIndex;
  } : _ref5$onElementMove,
      _ref5$wrapperCSS = _ref5.wrapperCSS,
      wrapperCSS = _ref5$wrapperCSS === void 0 ? "" : _ref5$wrapperCSS,
      _ref5$scrollable = _ref5.scrollable,
      scrollable = _ref5$scrollable === void 0 ? false : _ref5$scrollable,
      _ref5$fixedHeight = _ref5.fixedHeight,
      fixedHeight = _ref5$fixedHeight === void 0 ? null : _ref5$fixedHeight,
      _ref5$insidePadding = _ref5.insidePadding,
      insidePadding = _ref5$insidePadding === void 0 ? 0 : _ref5$insidePadding,
      _ref5$isDragEnabled = _ref5.isDragEnabled,
      isDragEnabled = _ref5$isDragEnabled === void 0 ? true : _ref5$isDragEnabled,
      _ref5$centeredHorizon = _ref5.centeredHorizontally,
      centeredHorizontally = _ref5$centeredHorizon === void 0 ? false : _ref5$centeredHorizon;

  var _useState = React.useState(getInitialGridState()),
      _useState2 = _slicedToArray(_useState, 2),
      gridState = _useState2[0],
      setGridState = _useState2[1];

  var gridContainerRef = React.useRef(null);

  var _useState3 = React.useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      gridHeight = _useState4[0],
      setGridHeight = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      effectiveGridWidth = _useState6[0],
      setEffectiveGridWidth = _useState6[1];

  var childrenRefs = React.useRef([]);

  var _useState7 = React.useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      elementPositions = _useState8[0],
      setElementPositions = _useState8[1];

  var _useState9 = React.useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      spaceBeforeIndex = _useState10[0],
      setSpaceBeforeIndex = _useState10[1];

  var _useState11 = React.useState(null),
      _useState12 = _slicedToArray(_useState11, 2),
      spaceAfterIndex = _useState12[0],
      setSpaceAfterIndex = _useState12[1];

  var _useState13 = React.useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      maskedElementSpaceIndex = _useState14[0],
      setMaskedElementSpaceIndex = _useState14[1];

  var _useState15 = React.useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isScrollingUpNeeded = _useState16[0],
      setIsScrollingUpNeeded = _useState16[1];

  var _useState17 = React.useState(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isScrollingDownNeeded = _useState18[0],
      setIsScrollingDownNeeded = _useState18[1];

  var _useState19 = React.useState(null),
      _useState20 = _slicedToArray(_useState19, 2),
      gridScrollX = _useState20[0],
      setGridScrollX = _useState20[1];

  var _useState21 = React.useState(null),
      _useState22 = _slicedToArray(_useState21, 2),
      gridScrollXLimit = _useState22[0],
      setGridScrollXLimit = _useState22[1];

  var scrollTimer = React.useRef(null);
  var LayoutElements = React.useCallback(function () {
    if (gridContainerRef.current && childrenRefs.current) {
      var childWidth = Math.ceil(childrenRefs.current[0] ? childrenRefs.current[0].current.getBoundingClientRect().width : 0);
      var childHeight = Math.ceil(childrenRefs.current[0] ? childrenRefs.current[0].current.getBoundingClientRect().height : 0);
      var gridWidth = Math.floor(gridContainerRef.current.getBoundingClientRect().width) - 2 * insidePadding;
      var numberOfElementsPerRow = getNumberOfElementsPerRow({
        gridWidth: gridWidth,
        childWidth: childWidth,
        gap: gap
      }) || 1;

      var _effectiveGridWidth = getEffectiveGridWidth({
        childWidth: childWidth,
        numberOfElementsPerRow: numberOfElementsPerRow,
        gap: gap,
        insidePadding: insidePadding
      });

      setEffectiveGridWidth(_effectiveGridWidth);
      var numberOfRows = getNumberOfRows({
        numberOfElementsPerRow: numberOfElementsPerRow,
        numberOfElements: childrenRefs.current.length
      });

      if (gridState.draggedElementIndex == null) {
        var _gridHeight = numberOfRows * childHeight + 2 * insidePadding + gap * (numberOfRows - 1);

        setGridHeight(_gridHeight);
      }

      childrenRefs.current.forEach(function (childRef, index) {
        var indexInCalculation = index;

        if (spaceBeforeIndex != null && index >= spaceBeforeIndex) {
          indexInCalculation++;
        }

        if (spaceAfterIndex != null && index >= spaceAfterIndex + 1) {
          indexInCalculation++;
        }

        if (maskedElementSpaceIndex != null && index > maskedElementSpaceIndex) {
          indexInCalculation--;
        }

        var rowNumberOfElement = Math.floor(indexInCalculation / numberOfElementsPerRow);
        var numberOfElementInRow = indexInCalculation % numberOfElementsPerRow;
        var offsetX = numberOfElementInRow * (childWidth + gap) + insidePadding;
        var offsetY = rowNumberOfElement * childHeight + rowNumberOfElement * gap + insidePadding;
        setElementPositions(function (elementPositions) {
          return _objectSpread2(_objectSpread2({}, elementPositions), {}, _defineProperty({}, index, {
            offsetX: offsetX,
            offsetY: offsetY
          }));
        });
      });
    }
  }, [childrenRefs, spaceBeforeIndex, spaceAfterIndex, maskedElementSpaceIndex, insidePadding, gridContainerRef, gridState]);
  React.useEffect(function () {
    LayoutElements();
  }, [childrenRefs, spaceBeforeIndex, spaceAfterIndex, maskedElementSpaceIndex, children]);
  React.useEffect(function () {
    var listener = function listener() {
      LayoutElements();
    };

    window.addEventListener("resize", listener);
    return function () {
      window.removeEventListener("resize", listener);
    };
  }, [LayoutElements]);
  var setDraggedItemInfo = React.useCallback(function (_ref7) {
    var clientX = _ref7.clientX,
        clientY = _ref7.clientY,
        dndIndex = _ref7.dndIndex,
        _ref7$byTouch = _ref7.byTouch,
        byTouch = _ref7$byTouch === void 0 ? false : _ref7$byTouch,
        _ref7$initialTouchCli = _ref7.initialTouchClientX,
        initialTouchClientX = _ref7$initialTouchCli === void 0 ? null : _ref7$initialTouchCli,
        _ref7$initialTouchCli2 = _ref7.initialTouchClientY,
        initialTouchClientY = _ref7$initialTouchCli2 === void 0 ? null : _ref7$initialTouchCli2;

    if (isDragEnabled) {
      if (byTouch) {
        setGridState(function (gridState) {
          return _objectSpread2(_objectSpread2({}, gridState), {}, {
            initialClientY: clientY,
            initialClientX: clientX,
            clientX: clientX,
            clientY: clientY,
            initialTouchClientX: initialTouchClientX,
            initialTouchClientY: initialTouchClientY,
            draggedElementIndex: dndIndex,
            byTouch: byTouch
          });
        });
      } else {
        setGridState(function (gridState) {
          return _objectSpread2(_objectSpread2({}, gridState), {}, {
            clientX: clientX,
            clientY: clientY,
            draggedElementIndex: dndIndex,
            byTouch: byTouch
          });
        });
      }

      setMaskedElementSpaceIndex(dndIndex);
    }
  }, [isDragEnabled]);
  var setDragEnd = React.useCallback(function () {
    var targetIndex = null;

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
        targetIndex: targetIndex
      });
    }

    setGridState(getInitialGridState());
    setMaskedElementSpaceIndex(null);
    setSpaceBeforeIndex(null);
    setSpaceAfterIndex(null);
  }, [gridState, spaceBeforeIndex, spaceAfterIndex, onElementMove]);
  var verifyOverlappingItems = React.useCallback(function () {
    var draggedItemBoundingRect = childrenRefs.current[gridState.draggedElementIndex].current.getBoundingClientRect();
    var overlappedElements = childrenRefs.current.map(function (child, index) {
      return {
        boundingRect: child.current.getBoundingClientRect(),
        index: index
      };
    }).filter(function (element) {
      return element.index != gridState.draggedElementIndex;
    }).map(function (element) {
      return {
        index: element.index,
        overlapInformation: getOverlapCoefficient({
          draggedX: draggedItemBoundingRect.x,
          draggedY: draggedItemBoundingRect.y,
          draggedWidth: draggedItemBoundingRect.width,
          draggedHeight: draggedItemBoundingRect.height,
          targetX: element.boundingRect.x,
          targetY: element.boundingRect.y
        })
      };
    }).filter(function (element) {
      return element.overlapInformation.overlapCoefficient != -1;
    }).sort(function (a, b) {
      return a.overlapInformation.overlapCoefficient - b.overlapInformation.overlapCoefficient;
    });
    var overlappedElement = overlappedElements.length > 0 ? overlappedElements[0] : null;

    if (overlappedElement != null) {
      if (overlappedElement.overlapInformation.direction === "LEFT") {
        setSpaceBeforeIndex(overlappedElement.index);
        setSpaceAfterIndex(null);
      } else {
        setSpaceAfterIndex(overlappedElement.index);
        setSpaceBeforeIndex(null);
      }
    }
  }, [childrenRefs.current, gridState]); //Smooth scrolling here! (setTimeout always re-triggering this function if needed)

  React.useEffect(function () {
    if (gridScrollX != null) {
      var _childrenRefs$current = childrenRefs.current[gridState.draggedElementIndex].current.getBoundingClientRect(),
          topOffsetRelativeToWindow = _childrenRefs$current.top,
          childHeight = _childrenRefs$current.height;

      if (isScrollingUpNeeded) {
        if (topOffsetRelativeToWindow < 50 && gridScrollX >= 0) {
          scrollTimer.current = setTimeout(function () {
            var difference = -1;
            setGridScrollX(gridScrollX + difference);
            gridContainerRef.current.scrollTop += difference;
            setGridState(function (gridState) {
              return _objectSpread2(_objectSpread2({}, gridState), {}, {
                clientY: gridState.clientY + difference
              });
            });
          }, 10);
        }
      }

      if (isScrollingDownNeeded) {
        var _gridContainerRef$cur = gridContainerRef.current.getBoundingClientRect(),
            bottomOffsetContainerRelativeToWindow = _gridContainerRef$cur.bottom,
            gridContainerHeight = _gridContainerRef$cur.height;

        if (topOffsetRelativeToWindow + childHeight > bottomOffsetContainerRelativeToWindow && gridScrollXLimit >= gridScrollX + gridContainerHeight) {
          scrollTimer.current = setTimeout(function () {
            var difference = 1;
            setGridScrollX(gridScrollX + difference);
            gridContainerRef.current.scrollTop += difference;
            setGridState(function (gridState) {
              return _objectSpread2(_objectSpread2({}, gridState), {}, {
                clientY: gridState.clientY + difference
              });
            });
          }, 10);
        }
      }
    }
  }, [gridScrollX]);
  var scrollIfNeeded = React.useCallback(function () {
    var _childrenRefs$current2 = childrenRefs.current[gridState.draggedElementIndex].current.getBoundingClientRect(),
        topOffsetRelativeToWindow = _childrenRefs$current2.top,
        childHeight = _childrenRefs$current2.height;

    var parentScrollTop = gridContainerRef.current.scrollTop;

    var _gridContainerRef$cur2 = gridContainerRef.current.getBoundingClientRect(),
        bottomOffsetContainerRelativeToWindow = _gridContainerRef$cur2.bottom;

    if (topOffsetRelativeToWindow < 50 && parentScrollTop > 0) {
      setIsScrollingUpNeeded(true);
      setGridScrollX(parentScrollTop);
    } else {
      if (topOffsetRelativeToWindow + childHeight > bottomOffsetContainerRelativeToWindow) {
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
  }, [gridState, childrenRefs.current, gridContainerRef.current, isScrollingUpNeeded, isScrollingDownNeeded, scrollTimer.current]);
  var onMouseMove = React.useCallback(function (event) {
    if (gridState.draggedElementIndex != null && isDragEnabled) {
      event.preventDefault();
      var _event$nativeEvent = event.nativeEvent,
          movementX = _event$nativeEvent.movementX,
          movementY = _event$nativeEvent.movementY;
      setGridState(function (gridState) {
        return _objectSpread2(_objectSpread2({}, gridState), {}, {
          clientX: gridState.clientX + movementX,
          clientY: gridState.clientY + movementY
        });
      });
      verifyOverlappingItems();
      scrollIfNeeded();
    }
  }, [gridState, isDragEnabled, scrollIfNeeded]);
  var onTouchMove = React.useCallback(function (event) {
    if (gridState.draggedElementIndex != null && isDragEnabled) {
      event.preventDefault();
      var movementX = gridState.initialTouchClientX - event.nativeEvent.touches[0].clientX;
      var movementY = gridState.initialTouchClientY - event.nativeEvent.touches[0].clientY;
      setGridState(function (gridState) {
        return _objectSpread2(_objectSpread2({}, gridState), {}, {
          clientX: gridState.initialClientX - movementX,
          clientY: gridState.initialClientY - movementY
        });
      });
      verifyOverlappingItems();
      scrollIfNeeded();
    }
  }, [gridState, isDragEnabled, scrollIfNeeded]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DNDContext.Provider, {
    value: {
      gridState: gridState,
      setDraggedItemInfo: setDraggedItemInfo,
      setDragEnd: setDragEnd,
      isDragEnabled: isDragEnabled
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: gridContainerRef,
    className: _JSXStyle.dynamic([["3315442763", [fixedHeight ? fixedHeight : "".concat(gridHeight, "px"), centeredHorizontally ? "\n                      display: flex;\n                      justify-content: center;" : "", scrollable ? "overflow: auto;" : "", wrapperCSS, effectiveGridWidth ? "".concat(effectiveGridWidth, "px") : "100%", insidePadding ? "padding: ".concat(insidePadding, "px;") : "", fixedHeight || gridHeight > 0 ? "\n                          opacity: 1;\n                          " : "\n                          opacity: 0;\n                          "]]]) + " " + "wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    onMouseMove: onMouseMove,
    onTouchMove: onTouchMove,
    className: _JSXStyle.dynamic([["3315442763", [fixedHeight ? fixedHeight : "".concat(gridHeight, "px"), centeredHorizontally ? "\n                      display: flex;\n                      justify-content: center;" : "", scrollable ? "overflow: auto;" : "", wrapperCSS, effectiveGridWidth ? "".concat(effectiveGridWidth, "px") : "100%", insidePadding ? "padding: ".concat(insidePadding, "px;") : "", fixedHeight || gridHeight > 0 ? "\n                          opacity: 1;\n                          " : "\n                          opacity: 0;\n                          "]]]) + " " + "grid"
  }, React__default.Children.map(children, function (child, index) {
    var childRef = childrenRefs.current[index]; //we assign it a ref if it doesn't have one

    if (!childRef) {
      childRef = /*#__PURE__*/React.createRef();
      childrenRefs.current[index] = childRef;
    }

    return /*#__PURE__*/React__default.cloneElement(child, {
      ref: childRef,
      leftOffset: elementPositions[index] ? elementPositions[index].offsetX : 0,
      topOffset: elementPositions[index] ? elementPositions[index].offsetY : 0,
      dndIndex: index
    });
  })))), /*#__PURE__*/React__default.createElement(_JSXStyle, {
    id: "3315442763",
    dynamic: [fixedHeight ? fixedHeight : "".concat(gridHeight, "px"), centeredHorizontally ? "\n                      display: flex;\n                      justify-content: center;" : "", scrollable ? "overflow: auto;" : "", wrapperCSS, effectiveGridWidth ? "".concat(effectiveGridWidth, "px") : "100%", insidePadding ? "padding: ".concat(insidePadding, "px;") : "", fixedHeight || gridHeight > 0 ? "\n                          opacity: 1;\n                          " : "\n                          opacity: 0;\n                          "]
  }, [".wrapper.__jsx-style-dynamic-selector{width:100%;height:".concat(fixedHeight ? fixedHeight : "".concat(gridHeight, "px"), ";").concat(centeredHorizontally ? "\n                      display: flex;\n                      justify-content: center;" : "", " ").concat(scrollable ? "overflow: auto;" : "", " ").concat(wrapperCSS, ";}"), ".grid.__jsx-style-dynamic-selector{width:".concat(effectiveGridWidth ? "".concat(effectiveGridWidth, "px") : "100%", ";position:relative;").concat(insidePadding ? "padding: ".concat(insidePadding, "px;") : "", " transition:all 0.3s;").concat(fixedHeight || gridHeight > 0 ? "\n                          opacity: 1;\n                          " : "\n                          opacity: 0;\n                          ", ";}")]));
};

var GridElement = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$leftOffset = _ref.leftOffset,
      leftOffset = _ref$leftOffset === void 0 ? 0 : _ref$leftOffset,
      _ref$topOffset = _ref.topOffset,
      topOffset = _ref$topOffset === void 0 ? 0 : _ref$topOffset,
      dndIndex = _ref.dndIndex,
      children = _ref.children;

  var _useContext = React.useContext(DNDContext),
      gridState = _useContext.gridState,
      setDraggedItemInfo = _useContext.setDraggedItemInfo,
      setDragEnd = _useContext.setDragEnd,
      isDragEnabled = _useContext.isDragEnabled;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      wasWiggleAnimationPlayed = _useState2[0],
      setWasWiggleAnimationPlayed = _useState2[1];

  var longPressTimer = React.useRef(null);
  var enableDragging = React.useCallback(function (_ref2) {
    var _ref2$byTouch = _ref2.byTouch,
        byTouch = _ref2$byTouch === void 0 ? false : _ref2$byTouch,
        _ref2$initialTouchCli = _ref2.initialTouchClientX,
        initialTouchClientX = _ref2$initialTouchCli === void 0 ? null : _ref2$initialTouchCli,
        _ref2$initialTouchCli2 = _ref2.initialTouchClientY,
        initialTouchClientY = _ref2$initialTouchCli2 === void 0 ? null : _ref2$initialTouchCli2;

    if (byTouch) {
      setDraggedItemInfo({
        clientX: leftOffset,
        clientY: topOffset,
        initialTouchClientX: initialTouchClientX,
        initialTouchClientY: initialTouchClientY,
        dndIndex: dndIndex,
        byTouch: byTouch
      });
    } else {
      setDraggedItemInfo({
        clientX: leftOffset,
        clientY: topOffset,
        dndIndex: dndIndex,
        byTouch: byTouch
      });
    }
  }, [leftOffset, topOffset, dndIndex, setDraggedItemInfo]);
  var onMouseDown = React.useCallback(function () {
    if (isDragEnabled) {
      enableDragging({});
    }
  }, [isDragEnabled, enableDragging]);
  var onMouseUp = React.useCallback(function () {
    if (isDragEnabled) {
      setDragEnd();
    }
  }, [setDragEnd, isDragEnabled]);
  React.useEffect(function () {
    if (isDragEnabled) {
      setTimeout(function () {
        setWasWiggleAnimationPlayed(true);
      }, 500);
    } else {
      setWasWiggleAnimationPlayed(false);
    }
  }, [isDragEnabled]);
  var onTouchStart = React.useCallback(function (event) {
    if (isDragEnabled) {
      var initialTouchClientX = event.nativeEvent.touches[0].clientX;
      var initialTouchClientY = event.nativeEvent.touches[0].clientY;
      longPressTimer.current = setTimeout(function () {
        enableDragging({
          byTouch: true,
          initialTouchClientX: initialTouchClientX,
          initialTouchClientY: initialTouchClientY
        });
      }, 1000);
    }
  }, [longPressTimer, isDragEnabled, enableDragging]);
  var onTouchEnd = React.useCallback(function () {
    if (isDragEnabled) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }

      setDragEnd();
    }
  }, [longPressTimer, isDragEnabled, setDragEnd]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    className: _JSXStyle.dynamic([["577436616", [isDragEnabled ? "\n                          opacity: 0.6;\n                          " : "", gridState.draggedElementIndex === dndIndex ? "\n                              transition: none;\n                              left: ".concat(gridState.clientX, "px;\n                              top: ").concat(gridState.clientY - 10, "px;\n                              z-index: 1;\n                              opacity: 1;\n                              touch-action: none;\n                          ") : "\n                              left: ".concat(leftOffset, "px;\n                              top: ").concat(topOffset, "px;\n                          "), isDragEnabled ? "\n                          pointer-events: none;\n                          " : ""]]]) + " " + "draggable".concat(isDragEnabled && !wasWiggleAnimationPlayed ? " wiggle-animation" : "")
  }, /*#__PURE__*/React__default.createElement("div", {
    className: _JSXStyle.dynamic([["577436616", [isDragEnabled ? "\n                          opacity: 0.6;\n                          " : "", gridState.draggedElementIndex === dndIndex ? "\n                              transition: none;\n                              left: ".concat(gridState.clientX, "px;\n                              top: ").concat(gridState.clientY - 10, "px;\n                              z-index: 1;\n                              opacity: 1;\n                              touch-action: none;\n                          ") : "\n                              left: ".concat(leftOffset, "px;\n                              top: ").concat(topOffset, "px;\n                          "), isDragEnabled ? "\n                          pointer-events: none;\n                          " : ""]]]) + " " + "children"
  }, children)), /*#__PURE__*/React__default.createElement(_JSXStyle, {
    id: "577436616",
    dynamic: [isDragEnabled ? "\n                          opacity: 0.6;\n                          " : "", gridState.draggedElementIndex === dndIndex ? "\n                              transition: none;\n                              left: ".concat(gridState.clientX, "px;\n                              top: ").concat(gridState.clientY - 10, "px;\n                              z-index: 1;\n                              opacity: 1;\n                              touch-action: none;\n                          ") : "\n                              left: ".concat(leftOffset, "px;\n                              top: ").concat(topOffset, "px;\n                          "), isDragEnabled ? "\n                          pointer-events: none;\n                          " : ""]
  }, [".draggable.__jsx-style-dynamic-selector{cursor:pointer;position:absolute;-webkit-transition:all 0.5s;transition:all 0.5s;".concat(isDragEnabled ? "\n                          opacity: 0.6;\n                          " : "", " ").concat(gridState.draggedElementIndex === dndIndex ? "\n                              transition: none;\n                              left: ".concat(gridState.clientX, "px;\n                              top: ").concat(gridState.clientY - 10, "px;\n                              z-index: 1;\n                              opacity: 1;\n                              touch-action: none;\n                          ") : "\n                              left: ".concat(leftOffset, "px;\n                              top: ").concat(topOffset, "px;\n                          "), " -webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-callout:none;-webkit-tap-highlight-color:transparent;}"), ".draggable.__jsx-style-dynamic-selector:active,.draggable.__jsx-style-dynamic-selector:focus{outline:none;}", ".wiggle-animation.__jsx-style-dynamic-selector{-webkit-animation:DragEnabledWiggleAnimation-__jsx-style-dynamic-selector 0.5s;animation:DragEnabledWiggleAnimation-__jsx-style-dynamic-selector 0.5s;}", "@-webkit-keyframes DragEnabledWiggleAnimation-__jsx-style-dynamic-selector{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}25%{-webkit-transform:rotate(-1deg) scale(1.02);-ms-transform:rotate(-1deg) scale(1.02);transform:rotate(-1deg) scale(1.02);opacity:1;}75%{-webkit-transform:rotate(1deg) scale(1.02);-ms-transform:rotate(1deg) scale(1.02);transform:rotate(1deg) scale(1.02);opacity:1;}100%{-webkit-transform:rotate(0deg) scale(1);-ms-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1);opacity:0.6;}}", "@keyframes DragEnabledWiggleAnimation-__jsx-style-dynamic-selector{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}25%{-webkit-transform:rotate(-1deg) scale(1.02);-ms-transform:rotate(-1deg) scale(1.02);transform:rotate(-1deg) scale(1.02);opacity:1;}75%{-webkit-transform:rotate(1deg) scale(1.02);-ms-transform:rotate(1deg) scale(1.02);transform:rotate(1deg) scale(1.02);opacity:1;}100%{-webkit-transform:rotate(0deg) scale(1);-ms-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1);opacity:0.6;}}", ".children.__jsx-style-dynamic-selector{".concat(isDragEnabled ? "\n                          pointer-events: none;\n                          " : "", ";}")]));
});

exports.Grid = Grid;
exports.GridElement = GridElement;
