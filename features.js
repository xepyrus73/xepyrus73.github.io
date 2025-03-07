

window.features = new Features();

function Features() {
  this.version = 991118;
  this.mouseTracker = mouseTracker;
  this.setMouseTracker = setMouseTracker;
  if (!window.tDrag) {
    window.tDrag    = new Object();
    tDrag.startTreeDrag = startTreeDrag;
    tDrag.doTreeDrag  = doTreeDrag;
    tDrag.onTreeDrop  = onTreeDrop;
  }
}

//IE debugger
function debug(str) {
    window.debugStr = window.debugStr || "";
    debugStr += str + "\n";
    if (debugStr.length > 1000) debugStr = str;
    window.debugWin = window.debugWin || window.open("","debugWin","scrollbar,width=150,height=500");
    debugWin.document.open("text/plain");
    debugWin.document.writeln(debugStr);
    debugWin.document.close();
}

/** Tree **/
function removeTreeItem(e, l) {
  l = l || window.activeTreeItem || this;
  if (!l) return;
  if (document.layers) {
    var treeLayer = l.parentLayer.Tree.treeLayer;
    var layers = treeLayer.Tree.itemLayers;
    if (l == layers[layers.length-1]) {
      if (layers.length>1) treeLayer.lastLayer = layers[layers.length-2];
      else treeLayer.lastLayer = null;
    }
    adjustItemLayers(treeLayer.Tree, l);
    layers = treeLayer.Tree.itemLayers;
    for (var j=0; j < layers.length; j++) {
      if (l.pos==0 || layers[j].pos > l.pos) {
        if (layers[j].pos>0) layers[j].pos -= 1;
        else layers[j].pos = 0;
        layers[j].top -= l.clip.height;
        if (layers[j].childTree) {
          if (layers[j].childTree.isOpen) layers[j].childTree.treeLayer.top -= l.clip.height;
        }
      }
    }
    l.visibility = "hidden";
    l.isDeleted = true;
    l.top = -(l.clip.height);
    treeLayer.clip.height -= l.clip.height;
  } else {
    var pos = l.pos;
    var treeLayer = l.parentElement.Tree.treeLayer;
    var layers = treeLayer.children;
    if (l == layers[layers.length-1]) {
      if (layers.length>1) treeLayer.lastLayer = layers[layers.length-2];
      else treeLayer.lastLayer = null;
    }
    adjustItemLayers(treeLayer.Tree, l);
    layers = treeLayer.Tree.itemLayers;
    for (var j=0; j < layers.length; j++) {
      if (l.pos==0 || layers[j].pos > l.pos) {
        if (layers[j].pos>0) layers[j].pos -= 1;
        else layers[j].pos = 0;
        layers[j].style.pixelTop -= l.style.pixelHeight;
        if (layers[j].childTree) {
          if (layers[j].childTree.isOpen) layers[j].childTree.treeLayer.style.pixelTop -= l.style.pixelHeight;
        }
      }
    }
    l.style.visibility = "hidden";
    l.isDeleted = true;
    l.top = -(l.style.pixelHeight);
    treeLayer.style.pixelHeight -= l.style.pixelHeight;
    var tree = treeLayer.Tree;
    var items = new Array();
    var actions = new Array();
    var icons = new Array();
    for (var i=0; i < tree.items.length; i++) {
      if (i != pos) {
        items[items.length] = tree.items[i];
        actions[actions.length] = tree.actions[i];
        icons[icons.length] = tree.icons[i];
      }
    }
    tree.items = items;
    tree.actions = actions;
    tree.icons = icons;
  }
  if (l.childTree) l.childTree.isOpen = false;
  adjustChildTree(treeLayer.parentTree);
  adjustParentTree(treeLayer);
}
function insertTreeItem(tree, label, action, icons, fontSize, fontColor, fontColorHilite, selectedBgColor, isFolder) {
  tree = tree || this;
  if (!tree.treeLayer) return;
  if (document.layers) {
    var id = "treeItem";
    var openFolderIcon = null;
    if (isFolder) {
      var id = "treeFolder";
      if (!tree.disableOpenerIcon) openFolderIcon = tree.openFolderIcons[0];
    }
    var n = new Layer(window.innerWidth, tree.treeLayer);
    var item = makeTreeItemCore(label, id, item, fontSize, fontColor, fontColorHilite, icons[0], openFolderIcon);
    n.document.open();
    n.document.writeln(item);
    n.document.close();
    n.action = action;
    n.fontSize = fontSize;
    n.fontColor = fontColor;
    n.fontColorHilite = fontColorHilite;
    n.selectedBgColor = selectedBgColor;
    n.name  = "treeItem" + (document.layers.length-3);
    n.label = label;
    if (tree.treeLayer.lastLayer) {
      n.pos = tree.treeLayer.lastLayer.pos + 1;
      n.top = tree.treeLayer.lastLayer.top + tree.treeLayer.lastLayer.clip.height;
      if (tree.treeLayer.lastLayer.childTree) {
        if (tree.treeLayer.lastLayer.childTree.isOpen) n.top += tree.treeLayer.lastLayer.childTree.treeLayer.clip.height;
      }
    } else { 
      n.top = 0; 
      n.pos = 0;
      tree.treeLayer.clip.height = 0;
    }
    n.action = action;
    n.icons = icons;
    n.openFolderIcons = tree.openFolderIcons;
    n.onmouseover = onTreeItemOver;
    if (openFolderIcon) n.layers[2].left = n.layers[3].clip.width;
    n.layers[0].left = n.layers[2].left + n.layers[2].clip.width;
    n.layers[1].left = n.layers[0].left;
    //n.clip.width = n.layers[1].left + n.layers[1].clip.width;
    tree.treeLayer.focusItem.zIndex++;
    n.visibility = "inherit";
    activeTreeItem = n;
    adjustItemLayers(tree, null, n);
    tree.treeLayer.lastLayer = n;
    tree.treeLayer.clip.height += n.clip.height;
    if (tree.treeLayer.clip.width < n.clip.width) {
      tree.treeLayer.clip.width = n.clip.width;
      tree.treeLayer.focusItem.clip.width = n.clip.width;
    }
    tree.treeLayer.top -= n.clip.height;
  } else {
    tree.addTreeItem(label, action, icons, fontSize, fontColor);
    writeTree(tree, tree.container, true);
    buildTree(tree, tree.treeLayer.style.pixelLeft, tree.treeLayer.style.pixelTop);
    var n = tree.itemLayers[tree.itemLayers.length-1];
  }
  adjustChildTree(tree);
  adjustParentTree(tree);
  tree.handleContainer();
  return n;
}
function adjustItemLayers(tree, removeLayer, insertLayer) {
  var items = new Array();
  for (var i=0; i < tree.itemLayers.length; i++) {
    if (removeLayer != tree.itemLayers[i]) items[items.length] = tree.itemLayers[i];
  }
  if (insertLayer) items[items.length] = insertLayer;
  tree.itemLayers = items;
}
function fOnTreeItemUp(e, a) {
  e = e || window.Event || window.event;
  var x = e.pageX || e.clientX;
  var y = e.pageY || e.clientY;
  if (document.layers) {
    tDrag.dragLayer.visibility = "hidden";
    if (!a) {
    } else if (a.disableDrag || (tDrag.oldX <= e.pageX+3 && tDrag.oldX >= e.pageX-3 && tDrag.oldY <= e.pageY+3 && tDrag.oldY >= e.pageY-3)) {
    } else {
      tDrag.onTreeDrop(e);
      return true;
    }
  } else {
    tDrag.dragLayer.style.visibility = "hidden";
    tDrag.dragLayer.parentElement.style.visibility = "hidden";
    if (!a) {
    } else if (a.disableDrag || (tDrag.oldX <= x+3 && tDrag.oldX >= x-3 && tDrag.oldY <= y+3 && tDrag.oldY >= y-3)) {
    } else {
      tDrag.onTreeDrop(e);
      return true;
    }
  }
  return false;
}
function fOnTreeItemDown(e, l) {
  if (l.disableDrag) return false;
  var label = l.label;
  if (document.layers) {
    if (l.icons[0]) label = '<IMG SRC="'+ l.icons[0] +'">' + label;
    if (!tDrag.dragLayer) tDrag.dragLayer = new Layer(window.innerWidth,l.parentLayer.Tree.container);
    tDrag.dragLayer.visibility = "hidden";
    tDrag.dragLayer.document.open();
    tDrag.dragLayer.document.writeln(label);
    tDrag.dragLayer.document.close();
    tDrag.dragLayer.zIndex = l.parentLayer.Tree.container.trees.length;
    tDrag.dragLayer.origLayer = l;
    tDrag.dragLayer.parentLayer.Tree = l.parentLayer.Tree;
    tDrag.dragLayer.left = l.left + l.parentLayer.Tree.treeLayer.left;
    tDrag.dragLayer.top  = l.top + l.parentLayer.Tree.treeLayer.top;
    tDrag.oldX = tDrag.dragLayer.left;
    tDrag.oldY = tDrag.dragLayer.left;
    tDrag.startTreeDrag(e);
  } else {
    e = e || window.Event || window.event;
    var x = e.pageX || e.clientX;
    var y = e.pageY || e.clientY;
    if (l.icons[0]) label = '<NOBR><IMG SRC="'+ l.icons[0] +'">&nbsp;' + label + '&nbsp;<NOBR>';
    var c = document.all["dragContainer"];
    if (!c.children["dragLayer"]) c.innerHTML = '<SPAN ID="dragLayer" STYLE="position:absolute">'+ label +'</SPAN>'; 
    tDrag.dragLayer = c.children["dragLayer"];
    tDrag.dragLayer.innerHTML = label;
    tDrag.dragLayer.style.visibility = "hidden";
    tDrag.dragLayer.origLayer = l;
    setCordsForLayer(l);
    tDrag.dragLayer.style.pixelLeft = l.pageX || 0;
    tDrag.dragLayer.style.pixelTop  = l.pageY || 0;
    tDrag.oldX = tDrag.dragLayer.style.pixelLeft;
    tDrag.oldY = tDrag.dragLayer.style.pixelTop;
    tDrag.startTreeDrag(window.Event || window.event);
  }
  return true;
}
function startTreeDrag(e, x, y) {
  if (document.layers) {
    document.captureEvents(Event.MOUSEMOVE);
  } else {
    e = e || window.Event || window.event;
  }
  x = x || e.pageX || e.clientX;
  y = y || e.pageY || e.clientY;
  tDrag.offX = x;
  tDrag.offY = y;
  tDrag.oldX = x;
  tDrag.oldY = y;
  if (!activeTreeLayer.Tree.disableDrag) document.onmousemove = tDrag.doTreeDrag;
  return false;
}
function doTreeDrag(e) {
  if (!tDrag.dragLayer) return;
  e = e || window.Event || window.event;
  var x = e.pageX || e.clientX;
  var y = e.pageY || e.clientY;
  if (document.layers) {
    if (e.pageX >= tDrag.offX+2 || e.pageX <= tDrag.offX-2 || e.pageY >= tDrag.offY+2 || e.pageY <= tDrag.offY-2) {
      tDrag.dragLayer.moveBy(e.pageX-tDrag.offX,e.pageY-tDrag.offY);
      tDrag.offX = e.pageX;
      tDrag.offY = e.pageY;
      tDrag.dragLayer.visibility = "inherit";
    }
    var srcTree = tDrag.dragLayer.origLayer.parentLayer.Tree;
    var childTrees = srcTree.container.rootTree.childTrees;
    var destTree = getDragDestTree(e, childTrees);
    if (destTree) {
      if (srcTree.oldDestTree && srcTree.oldDestTree != destTree) {
        if (srcTree.oldDestTree.parentFolder == window.selectedTreeItem) srcTree.oldDestTree.parentFolder.layers[0].document.bgColor = srcTree.oldDestTree.parentFolder.selectedBgColor;
        else srcTree.oldDestTree.parentFolder.layers[0].document.bgColor = srcTree.oldDestTree.parentFolder.layers[0].saveBgColor || null;
      }
      destTree.parentFolder.layers[0].document.bgColor = destTree.dragBgColor || "#bbbbbb";
      srcTree.oldDestTree = destTree;
      tDrag.destTree = destTree;
    }
  } else {
    if (x >= tDrag.offX+2 || x <= tDrag.offX-2 || y >= tDrag.offY+2 || y <= tDrag.offY-2) {
      tDrag.dragLayer.style.pixelLeft += (x-tDrag.offX);
      tDrag.dragLayer.style.pixelTop  += (y-tDrag.offY);
      tDrag.offX = x;
      tDrag.offY = y;
      tDrag.dragLayer.style.visibility = "inherit";
      tDrag.dragLayer.parentElement.style.visibility = "inherit";
      tDrag.dragLayer.origLayer.isDrag = true;
    }
    var srcTree = tDrag.dragLayer.origLayer.parentElement.Tree;
    var childTrees = srcTree.container.rootTree.childTrees;
    var destTree = getDragDestTree(e, childTrees);
    if (destTree) {
      if (srcTree.oldDestTree && srcTree.oldDestTree != destTree) {
        if (srcTree.oldDestTree.parentFolder == window.selectedTreeItem) srcTree.oldDestTree.parentFolder.style.backgroundColor = srcTree.oldDestTree.parentFolder.selectedBgColor;
        else srcTree.oldDestTree.parentFolder.style.backgroundColor = srcTree.oldDestTree.parentFolder.saveBgColor || document.bgColor;
      }
      destTree.parentFolder.style.backgroundColor = destTree.dragBgColor || "#bbbbbb";
      srcTree.oldDestTree = destTree;
      tDrag.destTree = destTree;
    }
    return false; //for IE
  }
}
function getDragDestTree(e, childTrees, destTree) {
  if (!childTrees) return null;
  e = e || window.Event || window.event;
  var x = e.pageX || e.clientX;
  var y = e.pageY || e.clientY;
  for (var j=0; j<childTrees.length; j++) {
    if (isInLayer(x, y, childTrees[j].parentFolder)) {
      destTree = childTrees[j];
      break;
    } else if (isInLayer(x, y, childTrees[j].treeLayer)) {
      destTree = getDragDestTree(e, childTrees[j].childTrees);
    }
  }
  return destTree;
}
function onTreeDrop(e) {
  l = l || window.activeTreeItem || this;
  if (tDrag.dragLayer) {
    var tree = tDrag.destTree;
    if (tree) {
      var l = tDrag.dragLayer.origLayer;
      var p = l.parentLayer || l.parentElement;
      var srcTree = p.Tree;
      if (!tree.treeLayer) buildTree(tree);
      if (tree.treeLayer == srcTree.treeLayer || (l.parentFolder && tree.treeLayer.parentTree.treeLayer == l.parentFolder)) {
        if (document.layers) tree.parentFolder.layers[1].document.bgColor = tree.parentFolder.layers[1].saveBgColor || null;
        else tree.parentFolder.style.backgroundColor = tree.parentFolder.saveBgColor || document.bgColor;
        return;
      }
      var checkParent = tree.parentTree;
      while (checkParent) {
        if (checkParent == l.childTree) {
          handleTreeError("Cannot move folder: " + l.label + " into subfolder: " + tree.parentFolder.label); return;
          break;
        }
        checkParent = checkParent.parentTree;
      }
      var confirm = true;
      if (tree.moveAction) confirm = eval("" + tree.moveAction);
      if (confirm) {
        if (l.childTree) closeChildTree(l.childTree);
        var isFolder = l.childTree;
        var label = isFolder || l.label;
        var n = insertTreeItem(tree, label, l.action, l.icons, l.fontSize, l.fontColor, l.fontColorHilite, l.selectedBgColor, isFolder);
        if (l.childTree) {
          n.childTree = l.childTree;
          n.childTree.parentFolder = n;
          n.childTree.parentTree = tree;
          tree.childTrees[tree.childTrees.length] = n.childTree;
          var childTrees = new Array();
          for (var i in srcTree.childTrees) {
            if (srcTree.childTrees[i] != n.childTree) childTrees[childTrees.length] = srcTree.childTrees[i];
          }
          srcTree.childTrees = childTrees;
        }
        n.origLayer = l;
        if (document.layers) {
          n.layers[0].origLayer = l.layers[0];
          n.layers[1].origLayer = l.layers[0];
        }
        removeTreeItem(e, l);
      }
      if (tree.parentFolder != window.selectedTreeItem) {
        if (document.layers) tree.parentFolder.layers[1].document.bgColor = null;
        else tree.parentFolder.style.backgroundColor = null;
      }
    }
    tDrag.dragLayer = null;
  }
}

/** Event handlers... **/

function setCordsForLayer(layer) {
  if (!layer) return false;
  var l = layer;
  if (document.layers) {
    var x = l.left;
    var y = l.top;
    while (l.parentLayer) {
      if (!l.parentLayer.id || isNaN(l.parentLayer.top)) break;
      x += (l.parentLayer.left || 0);
      y += (l.parentLayer.top || 0);
      l = l.parentLayer;
    }
  } else {
    var x = l.style.pixelLeft;
    var y = l.style.pixelTop;
    while (l.parentElement) {
      if (!l.parentElement.id || isNaN(l.parentElement.style.pixelTop)) break;
      x += (l.parentElement.style.pixelLeft || 0);
      y += (l.parentElement.style.pixelTop || 0);
      l = l.parentElement;
    }
  }
  layer.pageX = x || 0;
  layer.pageY = y || 0;
}
function isInLayer(x, y, l, off, w, h) {
  if (!l) return false;
  setCordsForLayer(l);
  off = off || 0;
  if (document.layers) {
    var w = l.clip.width;
    var h = l.clip.height;
  } else {
    var w = l.style.pixelWidth || w;
    var h = l.style.pixelHeight || h;
  }
  if (x+off >= l.pageX && x-off <= l.pageX + w && y+off >= l.pageY && y-off <= l.pageY + h) return true;
  else return false;
}
function setMouseTracker() {
  if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
  document.onmousemove = this.mouseTracker;
}
function mouseTracker(e) {
  e = e || window.Event || window.event;
  window.pageX = e.pageX || e.clientX;
  window.pageY = e.pageY || e.clientY;
}
function setMouseUps(name) {
  if (window.handleMouseUps) {
    window.saveMouseUps = window.saveMouseUps || new Array();
    window.saveMouseUps[name] = name;
    if (window.onmouseup && window.onmouseup != handleMouseUps) window.saveMouseUps[onmouseup] = onmouseup;
    if (document.onmouseup && document.onmouseup != handleMouseUps) window.saveMouseUps[document.onmouseup] = document.onmouseup;
    document.onmouseup = handleMouseUps;
  } else {
    document.onmouseup = func;
  }
}
function handleMouseUps(e) {
  for (var i in window.saveMouseUps) {
    var mUp = eval(saveMouseUps[i]);
    if (typeof(mUp) == "function" && mUp != window.hideMenu && mUp != handleMouseUps) mUp(e);
  }
  if (window.hideMenu) hideMenu(e); // Menu backwards compat.
}