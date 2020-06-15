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
  }, ".wrapper.__jsx-style-dynamic-selector{width:100%;height:".concat(fixedHeight ? fixedHeight : "".concat(gridHeight, "px"), ";").concat(centeredHorizontally ? "\n                      display: flex;\n                      justify-content: center;" : "", " ").concat(scrollable ? "overflow: auto;" : "", " ").concat(wrapperCSS, ";}.grid.__jsx-style-dynamic-selector{width:").concat(effectiveGridWidth ? "".concat(effectiveGridWidth, "px") : "100%", ";position:relative;").concat(insidePadding ? "padding: ".concat(insidePadding, "px;") : "", " transition:all 0.3s;").concat(fixedHeight || gridHeight > 0 ? "\n                          opacity: 1;\n                          " : "\n                          opacity: 0;\n                          ", ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeWNTLEFBR2tDLEFBT3dCLFdBTkMsd0JBT2xCLFlBSHZCLE1BS3lCLGlEQUV6Qiw2QkFBQyxHQVBBIiwiZmlsZSI6IkdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxuICB1c2VDYWxsYmFjayxcbiAgY3JlYXRlUmVmLFxufSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IERORENvbnRleHQgfSBmcm9tIFwiLi9ETkRDb250ZXh0XCI7XG5cbmNvbnN0IGdldEluaXRpYWxHcmlkU3RhdGUgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZHJhZ2dlZEVsZW1lbnRJbmRleDogbnVsbCxcbiAgICBjbGllbnRYOiAwLFxuICAgIGNsaWVudFk6IDAsXG4gICAgYnlUb3VjaDogZmFsc2UsXG4gICAgaW5pdGlhbENsaWVudFg6IG51bGwsXG4gICAgaW5pdGlhbENsaWVudFk6IG51bGwsXG4gICAgaW5pdGlhbFRvdWNoQ2xpZW50WDogbnVsbCxcbiAgICBpbml0aWFsVG91Y2hDbGllbnRZOiBudWxsLFxuICB9O1xufTtcblxuY29uc3QgZ2V0T3ZlcmxhcENvZWZmaWNpZW50ID0gKHtcbiAgZHJhZ2dlZFgsXG4gIGRyYWdnZWRZLFxuICBkcmFnZ2VkV2lkdGgsXG4gIGRyYWdnZWRIZWlnaHQsXG4gIHRhcmdldFgsXG4gIHRhcmdldFksXG59KSA9PiB7XG4gIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKHRhcmdldFggLSBkcmFnZ2VkWCk7XG4gIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKHRhcmdldFkgLSBkcmFnZ2VkWSk7XG4gIGNvbnN0IHRvdGFsRGVsdGEgPSBkZWx0YVggKyBkZWx0YVk7XG4gIGNvbnN0IHBlcmNlbnRhZ2VGcm9tVG90YWxQb3NzaWJsZSA9XG4gICAgKHRvdGFsRGVsdGEgLyAoZHJhZ2dlZFdpZHRoICsgZHJhZ2dlZEhlaWdodCkpICogMTAwO1xuICBjb25zdCBkaXJlY3Rpb24gPSB0YXJnZXRYIC0gZHJhZ2dlZFggPiAwID8gXCJMRUZUXCIgOiBcIlJJR0hUXCI7XG4gIGxldCBvdmVybGFwQ29lZmZpY2llbnQ7XG4gIC8vVE9ETzogTWFrZSB0aGlzIGNoYW5nZWFibGVcbiAgaWYgKHBlcmNlbnRhZ2VGcm9tVG90YWxQb3NzaWJsZSA8IDIwKSB7XG4gICAgb3ZlcmxhcENvZWZmaWNpZW50ID0gdG90YWxEZWx0YTtcbiAgfSBlbHNlIHtcbiAgICBvdmVybGFwQ29lZmZpY2llbnQgPSAtMTtcbiAgfVxuICByZXR1cm4geyBvdmVybGFwQ29lZmZpY2llbnQsIGRpcmVjdGlvbiB9O1xufTtcblxuY29uc3QgZ2V0TnVtYmVyT2ZSb3dzID0gKHsgbnVtYmVyT2ZFbGVtZW50c1BlclJvdywgbnVtYmVyT2ZFbGVtZW50cyB9KSA9PiB7XG4gIHJldHVybiBNYXRoLmNlaWwobnVtYmVyT2ZFbGVtZW50cyAvIG51bWJlck9mRWxlbWVudHNQZXJSb3cpO1xufTtcblxuY29uc3QgZ2V0TnVtYmVyT2ZFbGVtZW50c1BlclJvdyA9ICh7IGdyaWRXaWR0aCwgY2hpbGRXaWR0aCwgZ2FwIH0pID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoZ3JpZFdpZHRoIC8gKGNoaWxkV2lkdGggKyBnYXApKTtcbn07XG5cbmNvbnN0IGdldEVmZmVjdGl2ZUdyaWRXaWR0aCA9ICh7XG4gIGNoaWxkV2lkdGgsXG4gIG51bWJlck9mRWxlbWVudHNQZXJSb3csXG4gIGdhcCxcbiAgaW5zaWRlUGFkZGluZyxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICBNYXRoLmNlaWwoKGNoaWxkV2lkdGggKyBnYXApICogbnVtYmVyT2ZFbGVtZW50c1BlclJvdykgKyAyICogaW5zaWRlUGFkZGluZ1xuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEdyaWQgPSAoe1xuICBjaGlsZHJlbixcbiAgZ2FwID0gMCxcbiAgb25FbGVtZW50TW92ZSA9ICh7IHNvdXJjZUluZGV4LCB0YXJnZXRJbmRleCB9KSA9PiB7fSxcbiAgd3JhcHBlckNTUyA9IFwiXCIsXG4gIHNjcm9sbGFibGUgPSBmYWxzZSxcbiAgZml4ZWRIZWlnaHQgPSBudWxsLFxuICBpbnNpZGVQYWRkaW5nID0gMCxcbiAgaXNEcmFnRW5hYmxlZCA9IHRydWUsXG4gIGNlbnRlcmVkSG9yaXpvbnRhbGx5ID0gZmFsc2UsXG59KSA9PiB7XG4gIGNvbnN0IFtncmlkU3RhdGUsIHNldEdyaWRTdGF0ZV0gPSB1c2VTdGF0ZShnZXRJbml0aWFsR3JpZFN0YXRlKCkpO1xuICBjb25zdCBncmlkQ29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbZ3JpZEhlaWdodCwgc2V0R3JpZEhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2VmZmVjdGl2ZUdyaWRXaWR0aCwgc2V0RWZmZWN0aXZlR3JpZFdpZHRoXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBjaGlsZHJlblJlZnMgPSB1c2VSZWYoW10pO1xuICBjb25zdCBbZWxlbWVudFBvc2l0aW9ucywgc2V0RWxlbWVudFBvc2l0aW9uc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtzcGFjZUJlZm9yZUluZGV4LCBzZXRTcGFjZUJlZm9yZUluZGV4XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc3BhY2VBZnRlckluZGV4LCBzZXRTcGFjZUFmdGVySW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFttYXNrZWRFbGVtZW50U3BhY2VJbmRleCwgc2V0TWFza2VkRWxlbWVudFNwYWNlSW5kZXhdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtpc1Njcm9sbGluZ1VwTmVlZGVkLCBzZXRJc1Njcm9sbGluZ1VwTmVlZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzU2Nyb2xsaW5nRG93bk5lZWRlZCwgc2V0SXNTY3JvbGxpbmdEb3duTmVlZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyaWRTY3JvbGxYLCBzZXRHcmlkU2Nyb2xsWF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2dyaWRTY3JvbGxYTGltaXQsIHNldEdyaWRTY3JvbGxYTGltaXRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IHNjcm9sbFRpbWVyID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IExheW91dEVsZW1lbnRzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChncmlkQ29udGFpbmVyUmVmLmN1cnJlbnQgJiYgY2hpbGRyZW5SZWZzLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IGNoaWxkV2lkdGggPSBNYXRoLmNlaWwoXG4gICAgICAgIGNoaWxkcmVuUmVmcy5jdXJyZW50WzBdXG4gICAgICAgICAgPyBjaGlsZHJlblJlZnMuY3VycmVudFswXS5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgOiAwXG4gICAgICApO1xuICAgICAgY29uc3QgY2hpbGRIZWlnaHQgPSBNYXRoLmNlaWwoXG4gICAgICAgIGNoaWxkcmVuUmVmcy5jdXJyZW50WzBdXG4gICAgICAgICAgPyBjaGlsZHJlblJlZnMuY3VycmVudFswXS5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgICAgICAgIDogMFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZ3JpZFdpZHRoID1cbiAgICAgICAgTWF0aC5mbG9vcihncmlkQ29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIC1cbiAgICAgICAgMiAqIGluc2lkZVBhZGRpbmc7XG5cbiAgICAgIGNvbnN0IG51bWJlck9mRWxlbWVudHNQZXJSb3cgPVxuICAgICAgICBnZXROdW1iZXJPZkVsZW1lbnRzUGVyUm93KHsgZ3JpZFdpZHRoLCBjaGlsZFdpZHRoLCBnYXAgfSkgfHwgMTtcblxuICAgICAgY29uc3QgZWZmZWN0aXZlR3JpZFdpZHRoID0gZ2V0RWZmZWN0aXZlR3JpZFdpZHRoKHtcbiAgICAgICAgY2hpbGRXaWR0aCxcbiAgICAgICAgbnVtYmVyT2ZFbGVtZW50c1BlclJvdyxcbiAgICAgICAgZ2FwLFxuICAgICAgICBpbnNpZGVQYWRkaW5nLFxuICAgICAgfSk7XG4gICAgICBzZXRFZmZlY3RpdmVHcmlkV2lkdGgoZWZmZWN0aXZlR3JpZFdpZHRoKTtcblxuICAgICAgY29uc3QgbnVtYmVyT2ZSb3dzID0gZ2V0TnVtYmVyT2ZSb3dzKHtcbiAgICAgICAgbnVtYmVyT2ZFbGVtZW50c1BlclJvdyxcbiAgICAgICAgbnVtYmVyT2ZFbGVtZW50czogY2hpbGRyZW5SZWZzLmN1cnJlbnQubGVuZ3RoLFxuICAgICAgfSk7XG4gICAgICBpZiAoZ3JpZFN0YXRlLmRyYWdnZWRFbGVtZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBncmlkSGVpZ2h0ID1cbiAgICAgICAgICBudW1iZXJPZlJvd3MgKiBjaGlsZEhlaWdodCArXG4gICAgICAgICAgMiAqIGluc2lkZVBhZGRpbmcgK1xuICAgICAgICAgIGdhcCAqIChudW1iZXJPZlJvd3MgLSAxKTtcbiAgICAgICAgc2V0R3JpZEhlaWdodChncmlkSGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGNoaWxkcmVuUmVmcy5jdXJyZW50LmZvckVhY2goKGNoaWxkUmVmLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgaW5kZXhJbkNhbGN1bGF0aW9uID0gaW5kZXg7XG5cbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlSW5kZXggIT0gbnVsbCAmJiBpbmRleCA+PSBzcGFjZUJlZm9yZUluZGV4KSB7XG4gICAgICAgICAgaW5kZXhJbkNhbGN1bGF0aW9uKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3BhY2VBZnRlckluZGV4ICE9IG51bGwgJiYgaW5kZXggPj0gc3BhY2VBZnRlckluZGV4ICsgMSkge1xuICAgICAgICAgIGluZGV4SW5DYWxjdWxhdGlvbisrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1hc2tlZEVsZW1lbnRTcGFjZUluZGV4ICE9IG51bGwgJiZcbiAgICAgICAgICBpbmRleCA+IG1hc2tlZEVsZW1lbnRTcGFjZUluZGV4XG4gICAgICAgICkge1xuICAgICAgICAgIGluZGV4SW5DYWxjdWxhdGlvbi0tO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93TnVtYmVyT2ZFbGVtZW50ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICBpbmRleEluQ2FsY3VsYXRpb24gLyBudW1iZXJPZkVsZW1lbnRzUGVyUm93XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG51bWJlck9mRWxlbWVudEluUm93ID1cbiAgICAgICAgICBpbmRleEluQ2FsY3VsYXRpb24gJSBudW1iZXJPZkVsZW1lbnRzUGVyUm93O1xuXG4gICAgICAgIGNvbnN0IG9mZnNldFggPVxuICAgICAgICAgIG51bWJlck9mRWxlbWVudEluUm93ICogKGNoaWxkV2lkdGggKyBnYXApICsgaW5zaWRlUGFkZGluZztcbiAgICAgICAgY29uc3Qgb2Zmc2V0WSA9XG4gICAgICAgICAgcm93TnVtYmVyT2ZFbGVtZW50ICogY2hpbGRIZWlnaHQgK1xuICAgICAgICAgIHJvd051bWJlck9mRWxlbWVudCAqIGdhcCArXG4gICAgICAgICAgaW5zaWRlUGFkZGluZztcblxuICAgICAgICBzZXRFbGVtZW50UG9zaXRpb25zKChlbGVtZW50UG9zaXRpb25zKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmVsZW1lbnRQb3NpdGlvbnMsXG4gICAgICAgICAgICBbaW5kZXhdOiB7XG4gICAgICAgICAgICAgIG9mZnNldFgsXG4gICAgICAgICAgICAgIG9mZnNldFksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbXG4gICAgY2hpbGRyZW5SZWZzLFxuICAgIHNwYWNlQmVmb3JlSW5kZXgsXG4gICAgc3BhY2VBZnRlckluZGV4LFxuICAgIG1hc2tlZEVsZW1lbnRTcGFjZUluZGV4LFxuICAgIGluc2lkZVBhZGRpbmcsXG4gICAgZ3JpZENvbnRhaW5lclJlZixcbiAgICBncmlkU3RhdGUsXG4gIF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgTGF5b3V0RWxlbWVudHMoKTtcbiAgfSwgW1xuICAgIGNoaWxkcmVuUmVmcyxcbiAgICBzcGFjZUJlZm9yZUluZGV4LFxuICAgIHNwYWNlQWZ0ZXJJbmRleCxcbiAgICBtYXNrZWRFbGVtZW50U3BhY2VJbmRleCxcbiAgICBjaGlsZHJlbixcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgIExheW91dEVsZW1lbnRzKCk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9LCBbTGF5b3V0RWxlbWVudHNdKTtcblxuICBjb25zdCBzZXREcmFnZ2VkSXRlbUluZm8gPSB1c2VDYWxsYmFjayhcbiAgICAoe1xuICAgICAgY2xpZW50WCxcbiAgICAgIGNsaWVudFksXG4gICAgICBkbmRJbmRleCxcbiAgICAgIGJ5VG91Y2ggPSBmYWxzZSxcbiAgICAgIGluaXRpYWxUb3VjaENsaWVudFggPSBudWxsLFxuICAgICAgaW5pdGlhbFRvdWNoQ2xpZW50WSA9IG51bGwsXG4gICAgfSkgPT4ge1xuICAgICAgaWYgKGlzRHJhZ0VuYWJsZWQpIHtcbiAgICAgICAgaWYgKGJ5VG91Y2gpIHtcbiAgICAgICAgICBzZXRHcmlkU3RhdGUoKGdyaWRTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLmdyaWRTdGF0ZSxcbiAgICAgICAgICAgIGluaXRpYWxDbGllbnRZOiBjbGllbnRZLFxuICAgICAgICAgICAgaW5pdGlhbENsaWVudFg6IGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgICAgY2xpZW50WSxcbiAgICAgICAgICAgIGluaXRpYWxUb3VjaENsaWVudFgsXG4gICAgICAgICAgICBpbml0aWFsVG91Y2hDbGllbnRZLFxuICAgICAgICAgICAgZHJhZ2dlZEVsZW1lbnRJbmRleDogZG5kSW5kZXgsXG4gICAgICAgICAgICBieVRvdWNoLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRHcmlkU3RhdGUoKGdyaWRTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLmdyaWRTdGF0ZSxcbiAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZLFxuICAgICAgICAgICAgZHJhZ2dlZEVsZW1lbnRJbmRleDogZG5kSW5kZXgsXG4gICAgICAgICAgICBieVRvdWNoLFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRNYXNrZWRFbGVtZW50U3BhY2VJbmRleChkbmRJbmRleCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNEcmFnRW5hYmxlZF1cbiAgKTtcblxuICBjb25zdCBzZXREcmFnRW5kID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGxldCB0YXJnZXRJbmRleCA9IG51bGw7XG4gICAgaWYgKHNwYWNlQmVmb3JlSW5kZXggIT0gbnVsbCkge1xuICAgICAgdGFyZ2V0SW5kZXggPSBzcGFjZUJlZm9yZUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3BhY2VBZnRlckluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0SW5kZXggPSBzcGFjZUFmdGVySW5kZXggKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGFyZ2V0SW5kZXggIT0gbnVsbCkge1xuICAgICAgb25FbGVtZW50TW92ZSh7XG4gICAgICAgIHNvdXJjZUluZGV4OiBncmlkU3RhdGUuZHJhZ2dlZEVsZW1lbnRJbmRleCxcbiAgICAgICAgdGFyZ2V0SW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2V0R3JpZFN0YXRlKGdldEluaXRpYWxHcmlkU3RhdGUoKSk7XG4gICAgc2V0TWFza2VkRWxlbWVudFNwYWNlSW5kZXgobnVsbCk7XG4gICAgc2V0U3BhY2VCZWZvcmVJbmRleChudWxsKTtcbiAgICBzZXRTcGFjZUFmdGVySW5kZXgobnVsbCk7XG4gIH0sIFtncmlkU3RhdGUsIHNwYWNlQmVmb3JlSW5kZXgsIHNwYWNlQWZ0ZXJJbmRleCwgb25FbGVtZW50TW92ZV0pO1xuXG4gIGNvbnN0IHZlcmlmeU92ZXJsYXBwaW5nSXRlbXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgZHJhZ2dlZEl0ZW1Cb3VuZGluZ1JlY3QgPSBjaGlsZHJlblJlZnMuY3VycmVudFtcbiAgICAgIGdyaWRTdGF0ZS5kcmFnZ2VkRWxlbWVudEluZGV4XG4gICAgXS5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IG92ZXJsYXBwZWRFbGVtZW50cyA9IGNoaWxkcmVuUmVmcy5jdXJyZW50XG4gICAgICAubWFwKChjaGlsZCwgaW5kZXgpID0+ICh7XG4gICAgICAgIGJvdW5kaW5nUmVjdDogY2hpbGQuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgaW5kZXgsXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQuaW5kZXggIT0gZ3JpZFN0YXRlLmRyYWdnZWRFbGVtZW50SW5kZXgpXG4gICAgICAubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXg6IGVsZW1lbnQuaW5kZXgsXG4gICAgICAgICAgb3ZlcmxhcEluZm9ybWF0aW9uOiBnZXRPdmVybGFwQ29lZmZpY2llbnQoe1xuICAgICAgICAgICAgZHJhZ2dlZFg6IGRyYWdnZWRJdGVtQm91bmRpbmdSZWN0LngsXG4gICAgICAgICAgICBkcmFnZ2VkWTogZHJhZ2dlZEl0ZW1Cb3VuZGluZ1JlY3QueSxcbiAgICAgICAgICAgIGRyYWdnZWRXaWR0aDogZHJhZ2dlZEl0ZW1Cb3VuZGluZ1JlY3Qud2lkdGgsXG4gICAgICAgICAgICBkcmFnZ2VkSGVpZ2h0OiBkcmFnZ2VkSXRlbUJvdW5kaW5nUmVjdC5oZWlnaHQsXG4gICAgICAgICAgICB0YXJnZXRYOiBlbGVtZW50LmJvdW5kaW5nUmVjdC54LFxuICAgICAgICAgICAgdGFyZ2V0WTogZWxlbWVudC5ib3VuZGluZ1JlY3QueSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50Lm92ZXJsYXBJbmZvcm1hdGlvbi5vdmVybGFwQ29lZmZpY2llbnQgIT0gLTEpXG4gICAgICAuc29ydChcbiAgICAgICAgKGEsIGIpID0+XG4gICAgICAgICAgYS5vdmVybGFwSW5mb3JtYXRpb24ub3ZlcmxhcENvZWZmaWNpZW50IC1cbiAgICAgICAgICBiLm92ZXJsYXBJbmZvcm1hdGlvbi5vdmVybGFwQ29lZmZpY2llbnRcbiAgICAgICk7XG4gICAgY29uc3Qgb3ZlcmxhcHBlZEVsZW1lbnQgPVxuICAgICAgb3ZlcmxhcHBlZEVsZW1lbnRzLmxlbmd0aCA+IDAgPyBvdmVybGFwcGVkRWxlbWVudHNbMF0gOiBudWxsO1xuICAgIGlmIChvdmVybGFwcGVkRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBpZiAob3ZlcmxhcHBlZEVsZW1lbnQub3ZlcmxhcEluZm9ybWF0aW9uLmRpcmVjdGlvbiA9PT0gXCJMRUZUXCIpIHtcbiAgICAgICAgc2V0U3BhY2VCZWZvcmVJbmRleChvdmVybGFwcGVkRWxlbWVudC5pbmRleCk7XG4gICAgICAgIHNldFNwYWNlQWZ0ZXJJbmRleChudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNwYWNlQWZ0ZXJJbmRleChvdmVybGFwcGVkRWxlbWVudC5pbmRleCk7XG4gICAgICAgIHNldFNwYWNlQmVmb3JlSW5kZXgobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbY2hpbGRyZW5SZWZzLmN1cnJlbnQsIGdyaWRTdGF0ZV0pO1xuXG4gIC8vU21vb3RoIHNjcm9sbGluZyBoZXJlISAoc2V0VGltZW91dCBhbHdheXMgcmUtdHJpZ2dlcmluZyB0aGlzIGZ1bmN0aW9uIGlmIG5lZWRlZClcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZ3JpZFNjcm9sbFggIT0gbnVsbCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICB0b3A6IHRvcE9mZnNldFJlbGF0aXZlVG9XaW5kb3csXG4gICAgICAgIGhlaWdodDogY2hpbGRIZWlnaHQsXG4gICAgICB9ID0gY2hpbGRyZW5SZWZzLmN1cnJlbnRbXG4gICAgICAgIGdyaWRTdGF0ZS5kcmFnZ2VkRWxlbWVudEluZGV4XG4gICAgICBdLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoaXNTY3JvbGxpbmdVcE5lZWRlZCkge1xuICAgICAgICBpZiAodG9wT2Zmc2V0UmVsYXRpdmVUb1dpbmRvdyA8IDUwICYmIGdyaWRTY3JvbGxYID49IDApIHtcbiAgICAgICAgICBzY3JvbGxUaW1lci5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlID0gLTE7XG4gICAgICAgICAgICBzZXRHcmlkU2Nyb2xsWChncmlkU2Nyb2xsWCArIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgZ3JpZENvbnRhaW5lclJlZi5jdXJyZW50LnNjcm9sbFRvcCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgc2V0R3JpZFN0YXRlKChncmlkU3RhdGUpID0+ICh7XG4gICAgICAgICAgICAgIC4uLmdyaWRTdGF0ZSxcbiAgICAgICAgICAgICAgY2xpZW50WTogZ3JpZFN0YXRlLmNsaWVudFkgKyBkaWZmZXJlbmNlLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzU2Nyb2xsaW5nRG93bk5lZWRlZCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgYm90dG9tOiBib3R0b21PZmZzZXRDb250YWluZXJSZWxhdGl2ZVRvV2luZG93LFxuICAgICAgICAgIGhlaWdodDogZ3JpZENvbnRhaW5lckhlaWdodCxcbiAgICAgICAgfSA9IGdyaWRDb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRvcE9mZnNldFJlbGF0aXZlVG9XaW5kb3cgKyBjaGlsZEhlaWdodCA+XG4gICAgICAgICAgICBib3R0b21PZmZzZXRDb250YWluZXJSZWxhdGl2ZVRvV2luZG93ICYmXG4gICAgICAgICAgZ3JpZFNjcm9sbFhMaW1pdCA+PSBncmlkU2Nyb2xsWCArIGdyaWRDb250YWluZXJIZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2Nyb2xsVGltZXIuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IDE7XG4gICAgICAgICAgICBzZXRHcmlkU2Nyb2xsWChncmlkU2Nyb2xsWCArIGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgZ3JpZENvbnRhaW5lclJlZi5jdXJyZW50LnNjcm9sbFRvcCArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgc2V0R3JpZFN0YXRlKChncmlkU3RhdGUpID0+ICh7XG4gICAgICAgICAgICAgIC4uLmdyaWRTdGF0ZSxcbiAgICAgICAgICAgICAgY2xpZW50WTogZ3JpZFN0YXRlLmNsaWVudFkgKyBkaWZmZXJlbmNlLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwgW2dyaWRTY3JvbGxYXSk7XG5cbiAgY29uc3Qgc2Nyb2xsSWZOZWVkZWQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgdG9wOiB0b3BPZmZzZXRSZWxhdGl2ZVRvV2luZG93LFxuICAgICAgaGVpZ2h0OiBjaGlsZEhlaWdodCxcbiAgICB9ID0gY2hpbGRyZW5SZWZzLmN1cnJlbnRbXG4gICAgICBncmlkU3RhdGUuZHJhZ2dlZEVsZW1lbnRJbmRleFxuICAgIF0uY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwYXJlbnRTY3JvbGxUb3AgPSBncmlkQ29udGFpbmVyUmVmLmN1cnJlbnQuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHtcbiAgICAgIGJvdHRvbTogYm90dG9tT2Zmc2V0Q29udGFpbmVyUmVsYXRpdmVUb1dpbmRvdyxcbiAgICB9ID0gZ3JpZENvbnRhaW5lclJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKHRvcE9mZnNldFJlbGF0aXZlVG9XaW5kb3cgPCA1MCAmJiBwYXJlbnRTY3JvbGxUb3AgPiAwKSB7XG4gICAgICBzZXRJc1Njcm9sbGluZ1VwTmVlZGVkKHRydWUpO1xuICAgICAgc2V0R3JpZFNjcm9sbFgocGFyZW50U2Nyb2xsVG9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0b3BPZmZzZXRSZWxhdGl2ZVRvV2luZG93ICsgY2hpbGRIZWlnaHQgPlxuICAgICAgICBib3R0b21PZmZzZXRDb250YWluZXJSZWxhdGl2ZVRvV2luZG93XG4gICAgICApIHtcbiAgICAgICAgc2V0SXNTY3JvbGxpbmdEb3duTmVlZGVkKHRydWUpO1xuICAgICAgICBzZXRHcmlkU2Nyb2xsWChwYXJlbnRTY3JvbGxUb3ApO1xuICAgICAgICBzZXRHcmlkU2Nyb2xsWExpbWl0KGdyaWRDb250YWluZXJSZWYuY3VycmVudC5zY3JvbGxIZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0R3JpZFNjcm9sbFgobnVsbCk7XG4gICAgICAgIHNldElzU2Nyb2xsaW5nRG93bk5lZWRlZChmYWxzZSk7XG4gICAgICAgIHNldElzU2Nyb2xsaW5nVXBOZWVkZWQoZmFsc2UpO1xuICAgICAgICBzZXRHcmlkU2Nyb2xsWExpbWl0KG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW1xuICAgIGdyaWRTdGF0ZSxcbiAgICBjaGlsZHJlblJlZnMuY3VycmVudCxcbiAgICBncmlkQ29udGFpbmVyUmVmLmN1cnJlbnQsXG4gICAgaXNTY3JvbGxpbmdVcE5lZWRlZCxcbiAgICBpc1Njcm9sbGluZ0Rvd25OZWVkZWQsXG4gICAgc2Nyb2xsVGltZXIuY3VycmVudCxcbiAgXSk7XG5cbiAgY29uc3Qgb25Nb3VzZU1vdmUgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChncmlkU3RhdGUuZHJhZ2dlZEVsZW1lbnRJbmRleCAhPSBudWxsICYmIGlzRHJhZ0VuYWJsZWQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgeyBtb3ZlbWVudFgsIG1vdmVtZW50WSB9ID0gZXZlbnQubmF0aXZlRXZlbnQ7XG4gICAgICAgIHNldEdyaWRTdGF0ZSgoZ3JpZFN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmdyaWRTdGF0ZSxcbiAgICAgICAgICBjbGllbnRYOiBncmlkU3RhdGUuY2xpZW50WCArIG1vdmVtZW50WCxcbiAgICAgICAgICBjbGllbnRZOiBncmlkU3RhdGUuY2xpZW50WSArIG1vdmVtZW50WSxcbiAgICAgICAgfSkpO1xuICAgICAgICB2ZXJpZnlPdmVybGFwcGluZ0l0ZW1zKCk7XG4gICAgICAgIHNjcm9sbElmTmVlZGVkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZ3JpZFN0YXRlLCBpc0RyYWdFbmFibGVkLCBzY3JvbGxJZk5lZWRlZF1cbiAgKTtcblxuICBjb25zdCBvblRvdWNoTW92ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudCkgPT4ge1xuICAgICAgaWYgKGdyaWRTdGF0ZS5kcmFnZ2VkRWxlbWVudEluZGV4ICE9IG51bGwgJiYgaXNEcmFnRW5hYmxlZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBtb3ZlbWVudFggPVxuICAgICAgICAgIGdyaWRTdGF0ZS5pbml0aWFsVG91Y2hDbGllbnRYIC0gZXZlbnQubmF0aXZlRXZlbnQudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICBjb25zdCBtb3ZlbWVudFkgPVxuICAgICAgICAgIGdyaWRTdGF0ZS5pbml0aWFsVG91Y2hDbGllbnRZIC0gZXZlbnQubmF0aXZlRXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICBzZXRHcmlkU3RhdGUoKGdyaWRTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5ncmlkU3RhdGUsXG4gICAgICAgICAgY2xpZW50WDogZ3JpZFN0YXRlLmluaXRpYWxDbGllbnRYIC0gbW92ZW1lbnRYLFxuICAgICAgICAgIGNsaWVudFk6IGdyaWRTdGF0ZS5pbml0aWFsQ2xpZW50WSAtIG1vdmVtZW50WSxcbiAgICAgICAgfSkpO1xuICAgICAgICB2ZXJpZnlPdmVybGFwcGluZ0l0ZW1zKCk7XG4gICAgICAgIHNjcm9sbElmTmVlZGVkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZ3JpZFN0YXRlLCBpc0RyYWdFbmFibGVkLCBzY3JvbGxJZk5lZWRlZF1cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8RE5EQ29udGV4dC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17eyBncmlkU3RhdGUsIHNldERyYWdnZWRJdGVtSW5mbywgc2V0RHJhZ0VuZCwgaXNEcmFnRW5hYmxlZCB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndyYXBwZXJcIiByZWY9e2dyaWRDb250YWluZXJSZWZ9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyaWRcIlxuICAgICAgICAgICAgb25Nb3VzZU1vdmU9e29uTW91c2VNb3ZlfVxuICAgICAgICAgICAgb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGNoaWxkUmVmID0gY2hpbGRyZW5SZWZzLmN1cnJlbnRbaW5kZXhdO1xuICAgICAgICAgICAgICAvL3dlIGFzc2lnbiBpdCBhIHJlZiBpZiBpdCBkb2Vzbid0IGhhdmUgb25lXG4gICAgICAgICAgICAgIGlmICghY2hpbGRSZWYpIHtcbiAgICAgICAgICAgICAgICBjaGlsZFJlZiA9IGNyZWF0ZVJlZigpO1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuUmVmcy5jdXJyZW50W2luZGV4XSA9IGNoaWxkUmVmO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICByZWY6IGNoaWxkUmVmLFxuICAgICAgICAgICAgICAgIGxlZnRPZmZzZXQ6IGVsZW1lbnRQb3NpdGlvbnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICA/IGVsZW1lbnRQb3NpdGlvbnNbaW5kZXhdLm9mZnNldFhcbiAgICAgICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICAgICAgICB0b3BPZmZzZXQ6IGVsZW1lbnRQb3NpdGlvbnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICA/IGVsZW1lbnRQb3NpdGlvbnNbaW5kZXhdLm9mZnNldFlcbiAgICAgICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICAgICAgICBkbmRJbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9ETkRDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgPHN0eWxlIGpzeD5cbiAgICAgICAge2BcbiAgICAgICAgICAgICAgICAgIC53cmFwcGVyIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICR7Zml4ZWRIZWlnaHQgPyBmaXhlZEhlaWdodCA6IGAke2dyaWRIZWlnaHR9cHhgfTtcbiAgICAgICAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyZWRIb3Jpem9udGFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogYGBcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICR7c2Nyb2xsYWJsZSA/IGBvdmVyZmxvdzogYXV0bztgIDogYGB9XG4gICAgICAgICAgICAgICAgICAgICAgJHt3cmFwcGVyQ1NTfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLmdyaWQge1xuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlR3JpZFdpZHRoID8gYCR7ZWZmZWN0aXZlR3JpZFdpZHRofXB4YCA6IFwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgJHtpbnNpZGVQYWRkaW5nID8gYHBhZGRpbmc6ICR7aW5zaWRlUGFkZGluZ31weDtgIDogYGB9XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gICAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkSGVpZ2h0IHx8IGdyaWRIZWlnaHQgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogYFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBgfVxuICAgICAgPC9zdHlsZT5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */\n/*@ sourceURL=Grid.js */")));
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
  }, ".draggable.__jsx-style-dynamic-selector{cursor:pointer;position:absolute;-webkit-transition:all 0.5s;transition:all 0.5s;".concat(isDragEnabled ? "\n                          opacity: 0.6;\n                          " : "", " ").concat(gridState.draggedElementIndex === dndIndex ? "\n                              transition: none;\n                              left: ".concat(gridState.clientX, "px;\n                              top: ").concat(gridState.clientY - 10, "px;\n                              z-index: 1;\n                              opacity: 1;\n                              touch-action: none;\n                          ") : "\n                              left: ".concat(leftOffset, "px;\n                              top: ").concat(topOffset, "px;\n                          "), " -webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-callout:none;-webkit-tap-highlight-color:transparent;}.draggable.__jsx-style-dynamic-selector:active,.draggable.__jsx-style-dynamic-selector:focus{outline:none;}.wiggle-animation.__jsx-style-dynamic-selector{-webkit-animation:DragEnabledWiggleAnimation-__jsx-style-dynamic-selector 0.5s;animation:DragEnabledWiggleAnimation-__jsx-style-dynamic-selector 0.5s;}@-webkit-keyframes DragEnabledWiggleAnimation-__jsx-style-dynamic-selector{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}25%{-webkit-transform:rotate(-1deg) scale(1.02);-ms-transform:rotate(-1deg) scale(1.02);transform:rotate(-1deg) scale(1.02);opacity:1;}75%{-webkit-transform:rotate(1deg) scale(1.02);-ms-transform:rotate(1deg) scale(1.02);transform:rotate(1deg) scale(1.02);opacity:1;}100%{-webkit-transform:rotate(0deg) scale(1);-ms-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1);opacity:0.6;}}@keyframes DragEnabledWiggleAnimation-__jsx-style-dynamic-selector{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);opacity:1;}25%{-webkit-transform:rotate(-1deg) scale(1.02);-ms-transform:rotate(-1deg) scale(1.02);transform:rotate(-1deg) scale(1.02);opacity:1;}75%{-webkit-transform:rotate(1deg) scale(1.02);-ms-transform:rotate(1deg) scale(1.02);transform:rotate(1deg) scale(1.02);opacity:1;}100%{-webkit-transform:rotate(0deg) scale(1);-ms-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1);opacity:0.6;}}.children.__jsx-style-dynamic-selector{").concat(isDragEnabled ? "\n                          pointer-events: none;\n                          " : "", ";}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyaWRFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1IVyxBQUc4QixBQWdCRixBQUk2QixBQUlqQixBQUlhLEFBSUQsQUFJSCxBQU1yQyxhQXpCQyxFQWhCb0IsY0F5Q3BCLElBeENzQixnREFHZSxBQW9CdkIsVUFDWixpQkFXYyxTQUpGLEdBSkEsQUFTWixPQUpBLEdBSkEsb0JBVEYsZ0JBZjJCLHlCQUNELHdCQUNGLHNCQUNELHFCQUNKLHFGQUNFLG1CQUNxQix3Q0FDMUMiLCJmaWxlIjoiR3JpZEVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlRWZmZWN0LFxuICB1c2VTdGF0ZSxcbiAgdXNlQ2FsbGJhY2ssXG4gIHVzZVJlZixcbiAgZm9yd2FyZFJlZixcbiAgdXNlQ29udGV4dCxcbn0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBETkRDb250ZXh0IH0gZnJvbSBcIi4vRE5EQ29udGV4dFwiO1xuXG5leHBvcnQgY29uc3QgR3JpZEVsZW1lbnQgPSBmb3J3YXJkUmVmKFxuICAoeyBsZWZ0T2Zmc2V0ID0gMCwgdG9wT2Zmc2V0ID0gMCwgZG5kSW5kZXgsIGNoaWxkcmVuIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGdyaWRTdGF0ZSxcbiAgICAgIHNldERyYWdnZWRJdGVtSW5mbyxcbiAgICAgIHNldERyYWdFbmQsXG4gICAgICBpc0RyYWdFbmFibGVkLFxuICAgIH0gPSB1c2VDb250ZXh0KERORENvbnRleHQpO1xuICAgIGNvbnN0IFt3YXNXaWdnbGVBbmltYXRpb25QbGF5ZWQsIHNldFdhc1dpZ2dsZUFuaW1hdGlvblBsYXllZF0gPSB1c2VTdGF0ZShcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBjb25zdCBsb25nUHJlc3NUaW1lciA9IHVzZVJlZihudWxsKTtcblxuICAgIGNvbnN0IGVuYWJsZURyYWdnaW5nID0gdXNlQ2FsbGJhY2soXG4gICAgICAoe1xuICAgICAgICBieVRvdWNoID0gZmFsc2UsXG4gICAgICAgIGluaXRpYWxUb3VjaENsaWVudFggPSBudWxsLFxuICAgICAgICBpbml0aWFsVG91Y2hDbGllbnRZID0gbnVsbCxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgaWYgKGJ5VG91Y2gpIHtcbiAgICAgICAgICBzZXREcmFnZ2VkSXRlbUluZm8oe1xuICAgICAgICAgICAgY2xpZW50WDogbGVmdE9mZnNldCxcbiAgICAgICAgICAgIGNsaWVudFk6IHRvcE9mZnNldCxcbiAgICAgICAgICAgIGluaXRpYWxUb3VjaENsaWVudFgsXG4gICAgICAgICAgICBpbml0aWFsVG91Y2hDbGllbnRZLFxuICAgICAgICAgICAgZG5kSW5kZXgsXG4gICAgICAgICAgICBieVRvdWNoLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldERyYWdnZWRJdGVtSW5mbyh7XG4gICAgICAgICAgICBjbGllbnRYOiBsZWZ0T2Zmc2V0LFxuICAgICAgICAgICAgY2xpZW50WTogdG9wT2Zmc2V0LFxuICAgICAgICAgICAgZG5kSW5kZXgsXG4gICAgICAgICAgICBieVRvdWNoLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW2xlZnRPZmZzZXQsIHRvcE9mZnNldCwgZG5kSW5kZXgsIHNldERyYWdnZWRJdGVtSW5mb11cbiAgICApO1xuXG4gICAgY29uc3Qgb25Nb3VzZURvd24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBpZiAoaXNEcmFnRW5hYmxlZCkge1xuICAgICAgICBlbmFibGVEcmFnZ2luZyh7fSk7XG4gICAgICB9XG4gICAgfSwgW2lzRHJhZ0VuYWJsZWQsIGVuYWJsZURyYWdnaW5nXSk7XG5cbiAgICBjb25zdCBvbk1vdXNlVXAgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBpZiAoaXNEcmFnRW5hYmxlZCkge1xuICAgICAgICBzZXREcmFnRW5kKCk7XG4gICAgICB9XG4gICAgfSwgW3NldERyYWdFbmQsIGlzRHJhZ0VuYWJsZWRdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoaXNEcmFnRW5hYmxlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzZXRXYXNXaWdnbGVBbmltYXRpb25QbGF5ZWQodHJ1ZSk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRXYXNXaWdnbGVBbmltYXRpb25QbGF5ZWQoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sIFtpc0RyYWdFbmFibGVkXSk7XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSB1c2VDYWxsYmFjayhcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoaXNEcmFnRW5hYmxlZCkge1xuICAgICAgICAgIGNvbnN0IGluaXRpYWxUb3VjaENsaWVudFggPSBldmVudC5uYXRpdmVFdmVudC50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgY29uc3QgaW5pdGlhbFRvdWNoQ2xpZW50WSA9IGV2ZW50Lm5hdGl2ZUV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgICBsb25nUHJlc3NUaW1lci5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbmFibGVEcmFnZ2luZyh7XG4gICAgICAgICAgICAgIGJ5VG91Y2g6IHRydWUsXG4gICAgICAgICAgICAgIGluaXRpYWxUb3VjaENsaWVudFgsXG4gICAgICAgICAgICAgIGluaXRpYWxUb3VjaENsaWVudFksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtsb25nUHJlc3NUaW1lciwgaXNEcmFnRW5hYmxlZCwgZW5hYmxlRHJhZ2dpbmddXG4gICAgKTtcblxuICAgIGNvbnN0IG9uVG91Y2hFbmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBpZiAoaXNEcmFnRW5hYmxlZCkge1xuICAgICAgICBpZiAobG9uZ1ByZXNzVGltZXIuY3VycmVudCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChsb25nUHJlc3NUaW1lci5jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBzZXREcmFnRW5kKCk7XG4gICAgICB9XG4gICAgfSwgW2xvbmdQcmVzc1RpbWVyLCBpc0RyYWdFbmFibGVkLCBzZXREcmFnRW5kXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YGRyYWdnYWJsZSR7XG4gICAgICAgICAgICBpc0RyYWdFbmFibGVkICYmICF3YXNXaWdnbGVBbmltYXRpb25QbGF5ZWRcbiAgICAgICAgICAgICAgPyBcIiB3aWdnbGUtYW5pbWF0aW9uXCJcbiAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0PXtvblRvdWNoU3RhcnR9XG4gICAgICAgICAgb25Ub3VjaEVuZD17b25Ub3VjaEVuZH1cbiAgICAgICAgICBvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG4gICAgICAgICAgb25Nb3VzZVVwPXtvbk1vdXNlVXB9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoaWxkcmVuXCI+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGpzeD5cbiAgICAgICAgICB7YFxuICAgICAgICAgICAgLmRyYWdnYWJsZSB7XG4gICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbiAgICAgICAgICAgICAgJHtpc0RyYWdFbmFibGVkXG4gICAgICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDogYGB9XG4gICAgICAgICAgICAgICR7Z3JpZFN0YXRlLmRyYWdnZWRFbGVtZW50SW5kZXggPT09IGRuZEluZGV4XG4gICAgICAgICAgICAgICAgPyBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtncmlkU3RhdGUuY2xpZW50WH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJHtncmlkU3RhdGUuY2xpZW50WSAtIDEwfXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaC1hY3Rpb246IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICA6IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICR7bGVmdE9mZnNldH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJHt0b3BPZmZzZXR9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIHRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgICAgICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZHJhZ2dhYmxlOmFjdGl2ZSxcbiAgICAgICAgICAgIC5kcmFnZ2FibGU6Zm9jdXMge1xuICAgICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAud2lnZ2xlLWFuaW1hdGlvbiB7XG4gICAgICAgICAgICAgIGFuaW1hdGlvbjogRHJhZ0VuYWJsZWRXaWdnbGVBbmltYXRpb24gMC41cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBrZXlmcmFtZXMgRHJhZ0VuYWJsZWRXaWdnbGVBbmltYXRpb24ge1xuICAgICAgICAgICAgICAwJSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAyNSUge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKSBzY2FsZSgxLjAyKTtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDc1JSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMWRlZykgc2NhbGUoMS4wMik7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKSBzY2FsZSgxKTtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jaGlsZHJlbiB7XG4gICAgICAgICAgICAgICR7aXNEcmFnRW5hYmxlZFxuICAgICAgICAgICAgICAgID8gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDogYGB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH1cbiAgICAgICAgPC9zdHlsZT5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbik7XG4iXX0= */\n/*@ sourceURL=GridElement.js */")));
});

exports.Grid = Grid;
exports.GridElement = GridElement;
