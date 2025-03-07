/**
 * Features 991122, Copyright (c) 1997-1999 by Gary Smith <smith@best.com>
 *
 * You are granted a royalty free license to use or modify this
 * software provided that this copyright notice appears on all copies.
 * You may not reprint this software without permission from the author.
 * This software is provided "AS IS," without a warranty of any kind.
 */

function Tree(label, win) {
  this.version = 991118;
  this.items = new Array();
  this.actions = new Array();
  this.icons = new Array();
  this.fontColors = new Array();
  this.fontSizes = new Array();
  this.fontSize = 12;
  this.fontFamily = "Arial, Espy, sans-serif";
  this.fontColor = "#000000";
  this.fontColorHilite = "#0000ff";
  this.selectedBgColor = "#cccccc";
  this.itemBorder = 2;
  this.openFolderIcons = new Array("images/closed.gif","images/open.gif");
  this.folderIcons = new Array("images/folder.gif","images/folder_h.gif","images/folder_s.gif","images/folder_sh.gif");
  this.itemIcons = new Array("images/treeitem.gif","images/treeitem_h.gif","images/treeitem.gif","images/treeitem_h.gif");
  this.addTreeItem = addTreeItem;
  this.writeTree = writeTree;
  this.buildTree = buildTree;
  this.showTree = showTree;
  this.openTree = openTree;
  this.onTreeFolder = onTreeFolder;
  this.onTreeItemAction = onTreeItemAction;
  this.onTreeItemDown = onTreeItemDown;
  this.handleContainer = window.handleContainer || window.handleTreeContainer;
  this.mouseTracker = mouseTracker;
  this.setMouseTracker = setTreeMouseTracker;
  this.win = win || window;
  if (!this.win.trees) this.win.trees = new Array();
  if (!this.win.treeContainers) this.win.treeContainers = new Array();
  this.id = "treeLayer" + this.win.trees.length;
  this.label = label || this.id;
  this.win.trees[this.id] = this;
  this.win.trees[this.label] = this;
  this.win.trees[this.win.trees.length] = this;
  this.win.activeTreeLayers = this.win.activeTreeLayers || new Array();
  this.win.tDrag = this.win.tDrag || new Object();
  this.setMouseTracker();
}
function addTreeItem(label, action, icons, fontSize, fontColor) {
//	alert(this.items.length);
  this.items[this.items.length] = label;
  this.actions[this.actions.length] = action;
  this.icons[this.icons.length] = icons;
  this.fontSizes[this.fontSizes.length] = fontSize;
  this.fontColors[this.fontColors.length] = fontColor;
}
function writeTree(tree, container) {
  tree = tree || this;
  var l = container || tree.container || document.treeContainer;
  if (!l) {
    l = new Layer(tree.win.innerWidth, tree.win);
    l.containerLabel = "treeContainer" + treeContainers.length;
    treeContainers[treeContainers.length] = l;
    l.countTrees = l.countTrees || 0;
    l.trees = new Array();
    for (var i=0; i<tree.win.trees.length; i++) {
      trees[i].container = l;
      l.trees[i] = trees[i];
      l.trees[trees[i].id] = trees[i];
      l.trees[trees[i].label] = trees[i];
      l.trees["treeLayer" + i] = trees[i];
    }
    tree.win.trees.length = 0;
    l.rootTree = tree;
  }
  var countItems = 0;
  var content = "";
  tree.container = l;
  tree.id = "treeLayer" + l.countTrees++;
  var proto = tree.protoTree || this.protoTree || tree;
  for (var j=0; j<tree.items.length; j++) {
    var item   = tree.items[j];
    var icons  = tree.icons[j];
    var label  = item;
    var isFolder = false;
    if (item.id) {
      label  = item.label;
      item   = item.id;
      isFolder = true;
    } else if (tree.isShowFoldersOnly) {
      continue;
    }
    var openFolderIcon = null;
    if (isFolder) {
      var id = "treeFolder" + j;
      icons = icons || proto.folderIcons;
      if (!tree.disableOpenerIcon) openFolderIcon = proto.openFolderIcons[0];
    } else {
      var id = "treeItem" + j;
      icons = icons || proto.itemIcons;
    }
    var item2 = '<DIV ID="'+ id +'" STYLE="position:absolute;left:0;top:0;visibility:hidden;">\n';
    item2 += makeTreeItemCore(label, id, item, proto.fontSize, (proto.fontColors[j] || proto.fontColor), proto.fontColorHilite, icons[0], openFolderIcon);
    content += item2 + '</DIV>\n';
  }
  content += '<DIV ID="treeItemFocus" STYLE="position:absolute;left:0;top:0;"><BR></DIV>\n';
  var treeLayer = new Layer(tree.win.innerWidth, l);
  treeLayer.document.ids.sysFont.fontSize = proto.fontSize;
  treeLayer.document.ids.sysFont.fontFamily = proto.fontFamily;
  treeLayer.document.open("text/html");
  treeLayer.document.writeln(content);
  treeLayer.document.close();
  tree.protoTree = proto;
  tree.treeLayer = treeLayer;
  tree.treeLayer.label = tree.label;
  tree.treeLayer.Tree = tree;
  l.treeContainerColor = proto.treeContainerColor;
}
function makeTreeItemCore(label, id, name, fontSize, fontColor, fontColorHilite, icon, openFolderIcon) {
  label = label.label || label;
  var item = ' <DIV ID="text" STYLE="position:absolute;left:0;top:0;fontSize:'+ fontSize +';color:'+ fontColor +';">&nbsp;' + label + '&nbsp;</DIV>\n';
  item += ' <DIV ID="hilite" STYLE="position:absolute;left:0;top:0;fontSize:'+ fontSize +';color:'+ fontColorHilite +';visibility:hidden;">&nbsp;' + label + '&nbsp;</DIV>\n';
  item += ' <DIV ID="icon" STYLE="position:absolute;left:0;top:0"><IMG SRC="'+ icon +'" NAME="'+ id +'-'+ name +'"></DIV>';
  if (openFolderIcon) item += '  <DIV ID="opener-'+ id +'" STYLE="position:absolute;left:0;top:0;"><IMG SRC="'+ openFolderIcon +'"></DIV>\n';
  return item;
}
function onTreeItemOver(e, l, a) {
  l = l || this;
  a = a || window.activeTreeItem;
  if (l.parentLayer.focusItem) l.parentLayer.focusItem.top = l.top;
  hiliteTreeItem(l);
  window.activeTreeItem = l;
  setMouseUps("onTreeItemUp", onTreeItemUp);
}
function onTreeItemOut(e, l, a) {
  l = l || this;
  if (!window.activeTreeItem) return;
  hiliteTreeItem();
  if (activeTreeItem.parentLayer.focusItem) activeTreeItem.parentLayer.focusItem.visibility = "hidden";
  window.activeTreeItem = null;
}
function hiliteTreeItem(l, a) {
  a = a || window.activeTreeItem;
  if (a && a != l) {
    var iconLayer = a.layers[2];  
    if (a.parentLayer.focusItem) a.parentLayer.focusItem.visibility = "hidden";
    a.layers[1].visibility = "hidden";
    a.layers[0].visibility = "inherit";
    if (a.isSelected && !a.childTree) {
      iconLayer.document.images[0].src = a.icons[2] || a._icons[2];//Selected;
      return;
    } else if (a.childTree) {
      if (a.childTree.isOpen) {
        iconLayer.document.images[0].src = a.icons[2] || a._icons[2];//Selected;
        if (a.layers.length>3) a.layers[3].document.images[0].src = a.openFolderIcons[1];
        return;
      }
      if (a.layers.length>3) a.layers[3].document.images[0].src = a.openFolderIcons[0];
    }
    iconLayer.document.images[0].src = a.icons[0] || a._icons[0];
  }
  if (l) {
    var iconLayer = l.layers[2];
    if (l.parentLayer.focusItem) {
      l.parentLayer.focusItem.visibility = "inherit";
      l.parentLayer.focusItem.activeItem = l;
    }
    l.layers[1].visibility = "inherit";
    l.layers[0].visibility = "hidden";
    if (l.isSelected && !l.childTree) {
      iconLayer.document.images[0].src = l.icons[3] || l._icons[3];//SelectedHilite;
      return;
    } else if (l.childTree) {
      if (l.childTree.isOpen) {
        iconLayer.document.images[0].src = l.icons[3] || l._icons[3];//SelectedHilite;
        if (l.layers.length>3) l.layers[3].document.images[0].src = l.openFolderIcons[1];
        return;
      }
      if (l.layers.length>3) l.layers[3].document.images[0].src = l.openFolderIcons[0];
    }
    iconLayer.document.images[0].src = l.icons[1] || l._icons[1];//Hilite;
  }
}
function selectTreeItem(l) {
  var s = window.selectedTreeItem;
  if (s) {
    if (l == s) return;
    s.layers[0].document.bgColor = s.layers[0].saveBgColor;
    s.layers[1].document.bgColor = s.layers[1].saveBgColor;
    if (!s.childTree) s.layers[2].document.images[0].src = s.icons[0] || s._icons[0];
    s.isSelected = false;
  } if (l) {
    l.layers[0].saveBgColor = l.layers[0].document.bgColor;
    l.layers[1].saveBgColor = l.layers[1].document.bgColor;
    l.layers[0].document.bgColor = l.selectedBgColor;
    l.layers[1].document.bgColor = l.selectedBgColor;
    l.isSelected = true;
    window.selectedTreeItem = l;
  }
}
function onTreeItemUp(e, isDrag) {
  if (e.which > 1) return false;
  document.saveMousemove = document.onmousemove;
  document.onmousemove = mouseTracker;
  var a = window.activeTreeItem;
  if (tDrag.dragLayer) {
    isDrag = fOnTreeItemUp(e, a);
  }
  if (a && !isDrag) {
    if (a.childTree) {
      if (a.layers.length > 3) {
        if (isInTreeLayer(e.pageX, e.pageY, a.layers[3])) {
          onTreeFolder();
          return true;
        }
      }
      if (a.isSelected) {
        onTreeFolder();
      }
    }
    selectTreeItem(a);
    if (a.action) {
      window.saveActiveTreeItem = a;
      setTimeout('window.saveActiveTreeItem.parentLayer.Tree.onTreeItemAction();', 2);
    }
    hiliteTreeItem();
  }
  window.inactiveTreeItem = a;
  window.activeTreeItem = null;
  return true;
}
function onTreeItemAction(e, l) {
  l = l || this;
  if (!window.saveActiveTreeItem) return;
  if (saveActiveTreeItem.action) {
    eval(saveActiveTreeItem.action + "");
  } else if (l.id) {
    if (l.id.indexOf("treeItem") != -1) eval(l.action +"");
  }
  window.saveActiveTreeItem = null;
}
function onTreeFolder(e, l) {
  l = l || window.activeTreeItem;
  if (!l.childTree.treeLayer) l.childTree.writeTree();
  var childTreeLayer = l.childTree.treeLayer;
  childTreeLayer.zIndex = l.zIndex +1; //bring folders fwd for now...
  if (childTreeLayer.Tree.isOpen) {
    l.layers[2].document.images[0].src = l.icons[1] || l._icons[1];//Hilite;
    if (l.layers.length>3) l.layers[3].document.images[0].src = l.openFolderIcons[0];
    closeChildTree(childTreeLayer);
  } else {
    childTreeLayer.Tree.isOpen = true;
    l.layers[2].document.images[0].src = l.icons[2] || l._icons[2];//Selected;
    if (l.layers.length>3) l.layers[3].document.images[0].src = l.openFolderIcons[1];
    if (!childTreeLayer.onmouseover) buildTree(childTreeLayer);
    if (l.parentLayer) { //parentTreeLayer
      childTreeLayer.parentTree = l.parentLayer.Tree;
      childTreeLayer.left = l.parentLayer.left + 5;
      childTreeLayer.top = l.parentLayer.top + l.top + l.clip.height + childTreeLayer.Tree.itemBorder;
      if (childTreeLayer.Tree.itemLayers.length > 0) {
        for (var i=0; i<childTreeLayer.Tree.itemLayers.length; i++) {
          childTreeLayer.Tree.itemLayers[i].visibility = "inherit";
          if (childTreeLayer.Tree.itemLayers[i].layers.length > 0) {
            childTreeLayer.Tree.itemLayers[i].layers[0].visibility = "inherit";
          }
        }
        childTreeLayer.visibility = "inherit";
        adjustParentTree(childTreeLayer);
        adjustChildTree(childTreeLayer);
        activeTreeLayers[childTreeLayer.id] = childTreeLayer;
        childTreeLayer.Tree.handleContainer();
      }
    }
  }
  window.activeTreeLayer = childTreeLayer;
}
function closeChildTree(tree) {
  tree = tree || this;
  if (tree.Tree) tree = tree.Tree;
  tree.isOpen = false;
  if (tree.treeLayer) {
    tree.treeLayer.visibility = "hidden";
    activeTreeLayers[tree.treeLayer.id] = null;
  }
  adjustChildTree(tree);
  adjustParentTree(tree);
  tree.handleContainer();
}
function adjustParentTree(tree) {
  if (!tree) return;
  tree = tree.Tree || tree;
  var treeLayer = tree.treeLayer || tree;
  var p = treeLayer.parentTree;
  if (!p) return;
  if (!p.itemLayers) return;
  var l = p.treeLayer;
  if (!l) return;
  for (var i=0; i<p.itemLayers.length; i++) {
    if (p.itemLayers[i].layers.length > 0) {
      if (i>0) {
        p.itemLayers[i].top = p.itemLayers[i-1].top + p.itemLayers[i-1].clip.height;
        if (p.itemLayers[i-1].childTree) {
          if (p.itemLayers[i-1].childTree.isOpen) {
            p.itemLayers[i-1].childTree.treeLayer.top = p.itemLayers[i-1].childTree.parentFolder.parentLayer.top + p.itemLayers[i-1].childTree.parentFolder.top + p.itemLayers[i-1].childTree.parentFolder.clip.height;
            p.itemLayers[i].top += p.itemLayers[i-1].childTree.treeLayer.clip.height;
            for (var j in p.itemLayers[i-1].childTree.childTrees) {
              if (p.itemLayers[i-1].childTree.childTrees[j].isOpen) adjustChildTree(p.itemLayers[i-1].childTree.treeLayer);
            }
          }
        }
      }
    }
  }
  if (l.lastLayer) {
    l.clip.height = l.lastLayer.top +20;
    if (l.lastLayer.childTree) {
      if (l.lastLayer.childTree.isOpen) {
        l.lastLayer.childTree.treeLayer.top = l.lastLayer.childTree.parentFolder.parentLayer.top + l.lastLayer.childTree.parentFolder.top + l.lastLayer.childTree.parentFolder.clip.height;
        l.clip.height += l.lastLayer.childTree.treeLayer.clip.height;
      }
    }
  } else {
    l.clip.height = 0;
  }
  adjustParentTree(l);
}
function adjustChildTree(tree) {
  if (!tree) return;
  tree = tree.Tree || tree;  
  var l = tree.treeLayer;
  if (!l) return;
  for (var i=0; i<tree.itemLayers.length; i++) {
    if (!tree.itemLayers[i].layers.length) {
    } else if (tree.itemLayers[i].childTree) {
      if (!tree.itemLayers[i].childTree.treeLayer) continue;
      tree.itemLayers[i].childTree.treeLayer.top = tree.itemLayers[i].childTree.parentFolder.parentLayer.top + tree.itemLayers[i].childTree.parentFolder.top + tree.itemLayers[i].childTree.parentFolder.clip.height;
      tree.itemLayers[i].childTree.treeLayer.zIndex = l.zIndex +1; //bring folders fwd for now...
      if (l.visibility != "inherit") tree.itemLayers[i].childTree.treeLayer.visibility = "hidden";
      else if (tree.itemLayers[i].childTree.isOpen) tree.itemLayers[i].childTree.treeLayer.visibility = "inherit";
    }
    adjustChildTree(tree.itemLayers[i].childTree);
  }
}
function handleTreeContainer(e, container) {
  var w=0; var h=0;
  var l = container || this.container;
  if (!l) return;
  for (var i in window.activeTreeLayers) {
    if (!activeTreeLayers[i]) continue;
    if (activeTreeLayers[i].visibility != "inherit") continue;
    if (w < activeTreeLayers[i].left + activeTreeLayers[i].clip.width)  w = activeTreeLayers[i].left + activeTreeLayers[i].clip.width;
    if (h < activeTreeLayers[i].top  + activeTreeLayers[i].clip.height) h = activeTreeLayers[i].top  + activeTreeLayers[i].clip.height;
  }
  l.clip.width = w;
  l.clip.height = h;
  if (l.noDocHandle) return;
  w += l.left;
  h += l.top;
  document.origWidth = document.origWidth || document.width;
  document.origHeight = document.origHeight || document.height;
  if (window.innerWidth > w) w = window.innerWidth;
  if (window.innerHeight > h) h = window.innerHeight;
  if (document.origWidth < w) document.width = w;
  else document.width = document.origHeight;
  if (document.origHeight < h) document.height = h;
  else document.height = document.origHeight;
}
function buildTree(tree) {
  tree = tree || this;
  tree = tree.Tree || tree;
  if (!tree.treeLayer) tree.writeTree();
  var l = tree.treeLayer;
  if (!l) return;
  if (!tree.itemLayers) {
    var items = new Array();
    for (var i=0; i<l.layers.length-1; i++) items[i] = l.layers[i];
    tree.itemLayers = items;
  }
  var container = l.Tree.container;
  if (container.treeContainerColor) container.document.bgColor = container.treeContainerColor;
  l.onmouseover = setActiveTree;
  tree.childTrees = new Array();
  var actions = l.Tree.actions;
  l.focusItem = l.layers[l.layers.length-1];
  for (var i=0; i<l.layers.length-1; i++) {
    var child = l.layers[i];
    child.pos = i;
    child.action = actions[i];
    child.fontSize = l.Tree.fontColors[i] || l.Tree.protoTree.fontSize || 14;
    child.fontColor = l.Tree.fontColors[i] || l.Tree.protoTree.fontColor;
    child.fontColorHilite = l.Tree.protoTree.fontColorHilite;
    child.selectedBgColor = l.Tree.protoTree.selectedBgColor;
    if (child.layers[2].document.images[0].name.indexOf("treeFolder") != -1) {
      child.label = l.Tree.items[i].label;
      child.childTree = container.trees[child.layers[2].document.images[0].name.substring(12)];
      tree.childTrees[tree.childTrees.length] = child.childTree;
      child.childTree.pos = i;
      child.childTree.parentFolder = child;
      child.openFolderIcons = tree.openFolderIcons;
      child.icons = l.Tree.icons[i] || l.Tree.protoTree.folderIcons;
      child._icons = l.Tree.protoTree.folderIcons;
      if (child.layers.length > 3) child.layers[2].left += child.layers[3].clip.width;
    } else {
      child.label = l.Tree.items[i];
      child.icons = l.Tree.icons[i] || l.Tree.protoTree.itemIcons;
      child._icons = l.Tree.protoTree.itemIcons;
    }
    child.layers[0].left = child.layers[2].left + child.layers[2].clip.width;
    child.layers[1].left = child.layers[0].left;
    child.onmouseover = onTreeItemOver;
    child.clip.width = child.layers[1].left + child.layers[1].clip.width;
    if (i>0) {
      child.top = l.layers[i-1].top + l.layers[i-1].clip.height + l.Tree.protoTree.itemBorder;
      var w = l.layers[i-1].left + l.layers[i-1].clip.width;
      if (child.clip.width < w) child.clip.width = w;
    }
    child.visibility = "inherit";
  }
  if (l.layers.length == 1) {
    l.lastLayer = null;
    l.clip.height = 0;
  } else {
    l.lastLayer = child;
    child.isLastLayer = true;
    l.clip.height = child.top + child.clip.height;
    l.clip.width = child.left + child.clip.width;
  }
  l.focusItem.clip.width = l.clip.width;
  l.focusItem.top = -l.focusItem.clip.height;
  l.focusItem.captureEvents(Event.MOUSEDOWN);
  l.focusItem.onmousedown = onTreeItemDown;
  l.focusItem.onmouseout = onTreeItemOut;
  l.focusItem = l.focusItem;
  if (container.visibility != "inherit" && window.activeTreeLayer) {
    container.clip.width = window.activeTreeLayer.clip.width +2;
    container.clip.height = window.activeTreeLayer.clip.height +2;
    container.visibility = "inherit";
  }
}
function openTree(i, tree) {
  tree = tree || this;
  if (!tree.treeLayer && tree.label) tree.writeTree();
  if (tree.treeLayer.parentLayer.containerLabel && !tree.treeLayer.onmouseover) tree.buildTree();
  window.activeTreeItem = tree.treeLayer.parentLayer.rootTree.treeLayer.layers[i];
  tree.onTreeFolder();
}
function showTree(tree, x, y, item) {
  tree = tree || this;
  if (!tree.treeLayer) tree.writeTree();
  var l = tree.treeLayer;
  if (!l) return;
  window.activeTreeLayer = l;
  window.activeTreeLayers[l.id] = l;
  if (l.parentLayer) {
    if (x) l.parentLayer.left = x || 0;
    if (y) l.parentLayer.top = y || 0;
    window.activeTreeLayer.left = 1;
    window.activeTreeLayer.top = 1;
    if (l.parentLayer.containerLabel && !l.onmouseover) tree.buildTree();
  }
  l.visibility = "inherit";
  l.Tree.handleContainer();
  if (!isNaN(item)) tree.openTree(item);
}
function setActiveTree(e, l) {
  window.activeTreeLayer = l || this;
}
function mouseTracker(e) {
  e = e || window.Event || window.event;
  window.pageX = e.pageX || e.clientX;
  window.pageY = e.pageY || e.clientY;
}
function setTreeMouseTracker() {
  if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
  document.onmousemove = this.mouseTracker;
}
function onTreeItemDown(e, l) {
  l = l || window.activeTreeItem || this;
  if (!l) return false;
  if (l.id == "treeItemFocus") {
    l = l.activeItem;
    activeTreeItem = l;
  }
  if (e.which > 1) {
    if (l.parentLayer.Tree.protoTree.onTreeRightDown) l.parentLayer.Tree.protoTree.onTreeRightDown(e, l);
    return false;
  } else if (window.Features) {
    return fOnTreeItemDown(e, l);
  }
  return true;
}
function setMouseUps(name, func) {
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
function isInTreeLayer(x, y, layer) {
  var l = layer;
  if (!l) return false;
  var layerX = l.left;
  var layerY = l.top;
  while (l.parentLayer) {
    if (!l.parentLayer.id || isNaN(l.parentLayer.top)) break;
    layerX += (l.parentLayer.left || 0);
    layerY += (l.parentLayer.top || 0);
    l = l.parentLayer;
  }
  if (x >= layerX && x <= layerX + layer.clip.width && y >= layerY && y <= layerY + layer.clip.height) return true;
  else return false;
}