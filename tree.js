

function Tree(label) {
  this.version = 991118;
  this.items = new Array();
  this.folders = new Array();
  this.actions = new Array();
  this.icons = new Array();
  this.fontColors = new Array();
  this.fontSizes = new Array();
  this.fontSize = 12;
  this.fontFamily = "Arial, Espy, sans-serif";
  this.fontColor = "#000000";
  this.fontColorHilite = "#0000ff";
  this.openFolderIcons = new Array("images/closed.gif","images/open.gif");
  this.folderIcons = new Array("images/folder.gif","images/folder_h.gif","images/folder_s.gif","images/folder_sh.gif");
  this.itemIcons = new Array("images/treeitem.gif","images/treeitem_h.gif","images/treeitem_s.gif","images/treeitem_h.gif");
  this.selectedBgColor = "#cccccc";
  this.itemBorder = 0;
  this.addTreeItem = addTreeItem;
  this.writeTree = writeTree;
  this.buildTree = buildTree;
  this.showTree = showTree;
  this.onTreeItemAction = onTreeItemAction;
  this.onTreeItemDown = onTreeItemDown;
  this.handleContainer = window.handleContainer || window.handleTreeContainer;
  this.mouseTracker = mouseTracker;
  this.setMouseTracker = setTreeMouseTracker;
  if (!window.trees) window.trees = new Array();
  if (!window.treeContainers) window.treeContainers = new Array();
  this.id = "treeLayer" + window.trees.length;
  this.label = label || this.id;
  window.trees[window.trees.length] = this;
  window.activeTreeLayers = window.activeTreeLayers || new Array();
  this.setMouseTracker();
}
function addTreeItem(label, action, icons, fontSize, fontColor) {
  this.items[this.items.length] = label;
  this.actions[this.actions.length] = action;
  this.icons[this.icons.length] = icons;
  this.fontSizes[this.fontSizes.length] = fontSize;
  this.fontColors[this.fontColors.length] = fontColor;
}
function writeTree(tree, container, isRewrite) {
  tree = tree || this;
  var l = container || tree.container || document.treeContainer;
  if (!l) {
    var root = document.all["rootContainer"]; //need this root for IE
    root.style.visibility = "inherit";
    root.innerHTML = '<SPAN ID="treeContainer'+treeContainers.length+'" STYLE="position:absolute;visibility:hidden"></SPAN>';
    l = document.all["treeContainer" + treeContainers.length];
    var content = "";
    for (var i=0; i<window.trees.length; i++) {
      content += '<SPAN ID="treeLayer'+ i +'" STYLE="position:absolute;visibility:hidden"></SPAN>';
    }
    l.innerHTML = content;
    if (!l) alert("writeTree() failed. Please consult Tree documentation.");
    l.containerLabel = "treeContainer" + treeContainers.length;
    treeContainers[treeContainers.length] = l;

    l.countTrees = l.countTrees || 0;
    l.trees = new Array();
    for (var i=0; i<window.trees.length; i++) {
      trees[i].container = l;
      l.trees[i] = trees[i];
      l.trees[trees[i].id] = trees[i];
      l.trees[trees[i].label] = trees[i];
      l.trees["treeLayer" + i] = trees[i];
    }
    window.trees.length = 0;
    l.rootTree = tree;
  }
  var countItems = 0;
  var content = "";
  tree.container = l;
  if (!isRewrite) tree.id = "treeLayer" + l.countTrees++;
  var proto = tree.protoTree || this.protoTree || tree;
  for (var j=0; j<tree.items.length; j++) {
    var item   = tree.items[j];
    var icons   = tree.icons[j];
    var label  = item;
    var isFolder = false, openFolderIcon = "";
    if (item.id) {
      label  = item.label;
      item   = item.id;
      isFolder = true;
    } else if (tree.isShowFoldersOnly) {
      continue;
    }
    if (isFolder) {
      icons = icons || proto.folderIcons;
      if (!tree.disableOpenerIcon) openFolderIcon = proto.openFolderIcons[0];
    } else {
      icons = icons || proto.itemIcons;
    }
    var id = item;
    item = ' <DIV ID="treeItem'+ j +':'+ id +'" STYLE="position:absolute;left:0;top:0;visibility:hidden;fontSize:'+ proto.fontSize +';color:'+ (proto.fontColors[j] || proto.fontColor) +';"><NOBR>';
    if (isFolder) {
      if (openFolderIcon != "") openFolderIcon = '<IMG SRC="'+ openFolderIcon +'" NAME="treeOpenerImg:treeItem'+ j +':'+ id +'" onMouseUp="onTreeFolder(this.parentElement.parentElement, true);event.cancelBubble=true">';
      content += item + openFolderIcon + '<IMG SRC="'+ icons[0] +'" NAME="treeFolderImg:treeItem'+ j +':'+ id +'">&nbsp;' + label + '&nbsp;</NOBR></DIV>\n';
    } else {
      content += item + '<IMG SRC="'+ icons[0] +'" NAME="treeItemImg:treeItem'+ j +':'+ id +'">&nbsp;' + label + '&nbsp;</NOBR></DIV>\n';
    }
  }
  var treeLayer = document.all[tree.id];
  treeLayer.innerHTML = content;
  treeLayer.label = tree.label;
  treeLayer.Tree = tree;
  tree.treeLayer = treeLayer;
  tree.protoTree = proto;
  l.treeContainerColor = proto.treeContainerColor;
}
function onTreeItemOver(e, l, a) {
  l = l || this;
  a = a || window.activeTreeItem;
  hiliteTreeItem(l);
  window.activeTreeItem = l;
  setMouseUps("onTreeItemUp", onTreeItemUp);
  if (l.style) l.style.cursor = "hand";
}
function onTreeItemOut(e, l, a) {
  l = l || this;
  if (!window.activeTreeItem) return;
  hiliteTreeItem();
  l.style.cursor = "hand";
  window.activeTreeItem = null;
}
function hiliteTreeItem(l, a, bgColor) {
  a = a || window.activeTreeItem;
  if (a && a != l) {
    if (a.isSelected && !a.childTree) {
      a.img.src = a.icons[2] || a._icons[2];//Selected;
    } else if (a.childTree) {
      if (a.childTree.isOpen) 
        a.img.src = a.icons[2] || a._icons[2];
      else 
        a.img.src = a.icons[0] || a._icons[0];
    } else {
      a.img.src = a.icons[0] || a._icons[0];
    }
    a.style.color = a.fontColor;
  }
  if (l) {
    if (l.isSelected && !l.childTree) {
      l.img.src = l.icons[3] || l._icons[3];//SelectedHilite
      return;
    } else if (l.childTree) {
      if (l.childTree.isOpen) {
        l.img.src = l.icons[3] || l._icons[3];
        return;
      }
    }
    l.img.src = l.icons[1] || l._icons[1];//Hilite
    l.style.color = l.fontColorHilite;
  }
}
function selectTreeItem(l) {
  var s = window.selectedTreeItem;
  if (s) {
    if (l == s) return;
    s.style.backgroundColor = s.saveBgColor;
    s.style.backgroundColor = s.saveBgColor;
    if (!s.childTree) s.img.src = s.icons[0] || s._icons[0];
    s.isSelected = false;
  } if (l) {
    l.saveBgColor = l.style.backgroundColor;
    l.saveBgColor = l.style.backgroundColor;
    l.style.backgroundColor = l.selectedBgColor;
    l.style.backgroundColor = l.selectedBgColor;
    l.isSelected = true;
    window.selectedTreeItem = l;
  }
}
function onTreeItemUp(e, isIcon, isDrag) {
  e = e || window.Event || window.event;
  if (e.which > 1) return false;
  document.saveMousemove = document.onmousemove;
  document.onmousemove = mouseTracker;
  var a = window.activeTreeItem;
  if (window.tDrag) {
    if (tDrag.dragLayer) isDrag = fOnTreeItemUp(e, a);
  }
  if (a && !isDrag) {
    if (a.isSelected) onTreeFolder(a);
    if (isIcon) {
    } else if (a.action) {
      selectTreeItem(a);
      window.saveActiveTreeItem = a;
      setTimeout('window.saveActiveTreeItem.parentElement.Tree.onTreeItemAction();', 2);
    } else {
      selectTreeItem(a);
    }
    hiliteTreeItem();
  }
  window.inactiveTreeItem = activeTreeItem;
  window.activeTreeItem = null;
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
function onTreeFolder(l) {
  document.onmousemove = mouseTracker;
  l = l || window.activeTreeItem;
  if (!l.childTree.treeLayer) l.childTree.writeTree();
  var childTreeLayer = l.childTree.treeLayer;
  var childTree = l.childTree;
  var parentTree = l.parentElement.Tree;
  childTreeLayer.parentTree = parentTree;
  childTreeLayer.zIndex = l.zIndex +1; //bring folders fwd for now...
  if (childTree.isOpen) {
    l.img.src = l.icons[1];
    if (l.openerImg) l.openerImg.src = l.openFolderIcons[0];
    closeChildTree(childTree);
  } else {
    childTree.isOpen = true;
    l.img.src = l.icons[3];
    if (l.openerImg) l.openerImg.src = l.openFolderIcons[1];
    if (parentTree) {
      childTreeLayer.style.visibility = "inherit";
      if (!childTreeLayer.onmouseover) buildTree(childTree);
      childTree.treeLayer.style.pixelLeft = parentTree.treeLayer.style.pixelLeft + 5;
      childTree.treeLayer.style.pixelTop = parentTree.treeLayer.style.pixelTop + l.style.pixelTop + l.style.pixelHeight + childTree.itemBorder;
    }
    adjustParentTree(childTree);
    adjustChildTree(childTree);
    activeTreeLayers[childTreeLayer.id] = childTreeLayer;
  }
  window.activeTreeLayer = childTreeLayer;
}
function closeChildTree(tree) {
  if (!tree) return;
  tree.isOpen = false;
  if (tree.treeLayer) tree.treeLayer.style.visibility = "hidden";
  adjustChildTree(tree);
  adjustParentTree(tree);
  activeTreeLayers[tree.id] = null;
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
    if (p.itemLayers.length > 0) {
      if (i>0) {
        p.itemLayers[i].style.pixelTop = p.itemLayers[i-1].style.pixelTop + p.itemLayers[i-1].style.pixelHeight;
        if (p.itemLayers[i-1].childTree && !p.itemLayers[i-1].isDeleted) {
          if (p.itemLayers[i-1].childTree.isOpen) {
            p.itemLayers[i-1].childTree.treeLayer.style.pixelTop = p.itemLayers[i-1].childTree.parentFolder.parentElement.style.pixelTop + p.itemLayers[i-1].childTree.parentFolder.style.pixelTop + p.itemLayers[i-1].childTree.parentFolder.style.pixelHeight;
            p.itemLayers[i].style.pixelTop += p.itemLayers[i-1].childTree.treeLayer.style.pixelHeight;
            for (var j in p.itemLayers[i-1].childTree.childTrees) {
              if (p.itemLayers[i-1].childTree.childTrees[j].isOpen) adjustChildTree(p.itemLayers[i-1].childTree);
            }
          }
        }
      }
      p.itemLayers[i].style.visibility = "inherit";
    }
  }
  if (l.lastLayer) {
    l.style.pixelHeight = l.lastLayer.style.pixelTop +20;
    if (l.lastLayer.childTree) {
      if (l.lastLayer.childTree.isOpen) {
        l.lastLayer.childTree.treeLayer.style.pixelTop = l.lastLayer.childTree.parentFolder.parentElement.style.pixelTop + l.lastLayer.childTree.parentFolder.style.pixelTop + l.lastLayer.childTree.parentFolder.style.pixelHeight;
        l.style.pixelHeight += l.lastLayer.childTree.treeLayer.style.pixelHeight;
      }
    }
  } else {
    l.style.pixelHeight = 0;
  }
  adjustParentTree(l);
}
function adjustChildTree(tree) {
  if (!tree) return;
  tree = tree.Tree || tree;
  var l = tree.treeLayer;
  if (!l) return;
  if (!tree.itemLayers) return;
  for (var i=0; i<tree.itemLayers.length; i++) {
    if (!tree.itemLayers[i].childTree) {
    } else if (!tree.itemLayers[i].childTree.treeLayer || tree.itemLayers[i].isDeleted) {
    } else if (tree.itemLayers[i].childTree) {
      tree.itemLayers[i].childTree.treeLayer.style.pixelTop = tree.itemLayers[i].childTree.parentFolder.parentElement.style.pixelTop + tree.itemLayers[i].childTree.parentFolder.style.pixelTop + tree.itemLayers[i].childTree.parentFolder.style.pixelHeight;
      tree.itemLayers[i].childTree.treeLayer.zIndex = l.zIndex +1; //bring folders fwd for now...
      if (l.style.visibility != "inherit") tree.itemLayers[i].childTree.treeLayer.style.visibility = "hidden";
      else if (tree.itemLayers[i].childTree.isOpen) tree.itemLayers[i].childTree.treeLayer.style.visibility = "inherit";
    }
    adjustChildTree(tree.itemLayers[i].childTree);
  }
}
function handleTreeContainer(e, container) {
}
function setTreeItemProps(l, label, action, icons, img, fontSize, fontColor, fontColorHilite, selectedBgColor, mouseover, childTree) {
    l.label = label;
    l.action = action;
    l.fontSize = fontSize || 9;
    l.fontColor = fontColor;
    l.fontColorHilite = fontColorHilite;
    l.selectedBgColor = selectedBgColor;
    if (childTree) {
      l.childTree = childTree;
      l.childTree.parentFolder = l;
    }
    l.icons = icons;
    l.img = img;
    l.onmouseover = mouseover;
}
function buildTree(tree, x, y, child) {
  tree = tree || this;
  if (!tree.treeLayer) writeTree(tree);
  var l = tree.treeLayer;
  if (!l) return;
  var items = new Array();
  for (var i=0; i<l.children.length; i++) items[i] = l.children[i];
  tree.itemLayers = items;
  var container = l.Tree.container;
  var actions = l.Tree.actions;
  var proto = l.Tree.protoTree;
  l.onmouseover = setActiveTree;
  l.Tree.childTrees = new Array();
  l.style.pixelWidth = proto.treeWidth || 200;
  l.style.pixelHeight = proto.treeHeight || 200;
  for (var i=0; i < l.children.length; i++) {
    child = l.children[i];
    child.pos = i;
    var childTree=null, icons=null, img=null;
    if (child.innerHTML.indexOf("treeFolderImg") > -1) {
      childTree = container.trees[child.id.substring(child.id.indexOf(":")+1)];
      l.Tree.childTrees[l.Tree.childTrees.length] = childTree;
      icons = l.Tree.icons[i] || l.Tree.protoTree.folderIcons;
      img = child.document.images["treeFolderImg:" + child.id];
      if (child.innerHTML.indexOf("treeOpenerImg") > -1) {
        child.openerImg = child.document.images["treeOpenerImg:" + child.id];
        child.openFolderIcons = proto.openFolderIcons;
      }
    } else {
      icons = l.Tree.icons[i] || l.Tree.protoTree.itemIcons;
      img = child.document.images["treeItemImg:" + child.id];
    }
    setTreeItemProps(child,(l.Tree.items[i].label || l.Tree.items[i]),actions[i],icons,img,(l.Tree.fontSizes[i] || proto.fontSize), (l.Tree.fontColors[i] || proto.fontColor),proto.fontColorHilite,proto.selectedBgColor,onTreeItemOver,childTree);
    child.style.pixelLeft = child.style.pixelWidth + 0;
    child.style.pixelLeft = child.style.pixelWidth + 0;
    child.style.pixelWidth = proto.treeItemWidth || 100;
    child.style.pixelHeight = proto.treeItemHeight || 20;
    if (i>0) {
      child.style.pixelLeft = l.children[i-1].style.pixelLeft;
      child.style.pixelTop = l.children[i-1].style.pixelTop + l.children[i-1].style.pixelHeight + proto.itemBorder;
      var w = l.children[i-1].style.pixelLeft + l.children[i-1].style.pixelWidth;
      if (child.style.pixelWidth < w) child.style.pixelWidth = w;
    }
    child.style.visibility = "inherit";
  }
  if (l.children.length == 1) {
    l.lastLayer = null;
    l.style.pixelHeight = 10;
  } else {
    l.lastLayer = child;
    child.isLastLayer = true;
    l.style.pixelHeight = child.style.pixelTop + child.style.pixelHeight;
    l.style.pixelWidth = child.style.pixelLeft + child.style.pixelWidth;
  }
  l.style.pixelLeft = x || 0;
  l.style.pixelTop = y || 0;
  l.onmousedown = onTreeItemDown;
  l.onmouseout = onTreeItemOut;
  if (container.style.visibility != "inherit") {
    container.style.pixelWidth = window.activeTreeLayer.style.pixelWidth +0;
    container.style.pixelHeight = window.activeTreeLayer.style.pixelHeight +2;
    container.style.visibility = "inherit";
  }
}
function showTree(tree, x, y) {
  tree = tree || this;
  if (!tree.treeLayer) writeTree(tree);
  var l = tree.treeLayer;
  if (!l) return;
  window.activeTreeLayer = l;
  window.activeTreeLayers[l.id] = l;
  if (l.parentElement) {
    if (x) l.parentElement.style.pixelLeft = x || 0;
    if (y) l.parentElement.style.pixelTop = y || 0;
    window.activeTreeLayer.style.pixelLeft = 1;
    window.activeTreeLayer.style.pixelTop = 1;
  }
  if (!l.onmouseover) buildTree(l.Tree);
  l.style.visibility = "inherit";
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
  document.onmousemove = this.mouseTracker;
}
function onTreeItemDown(e, l) {
  e = e || window.Event || window.event;
  l = l || window.activeTreeItem;
  if (!l) return false;
  if (e.which > 1) {
    if (l.parentElement.Tree.protoTree.onTreeRightDown) l.parentElement.Tree.protoTree.onTreeRightDown(e, l);
    return false;
  } else if (window.Features) {
    return fOnTreeItemDown(e, l);
  }
  return true;
}
function setMouseUps(name, func) {
  window.saveMouseUps = window.saveMouseUps || new Array();
  window.saveMouseUps[name] = func;
  if (window.onmouseup && window.onmouseup != handleMouseUps) window.saveMouseUps[onmouseup] = onmouseup;
  if (document.onmouseup && document.onmouseup != handleMouseUps) window.saveMouseUps[document.onmouseup] = document.onmouseup;
  document.onmouseup = handleMouseUps;
}
function handleMouseUps(e) {
  for (var i in window.saveMouseUps) {
    if (typeof(saveMouseUps[i]) == "function" && saveMouseUps[i] != window.hideMenu) saveMouseUps[i](e);
  }
  if (window.hideMenu) hideMenu(e); //backwards compat.
}
if (document.all) {
  if (!document.all["rootContainer"]) 
    document.writeln('<SPAN ID="rootContainer" STYLE="position:absolute;visibility:hidden"></SPAN>');
  if (!document.all["dragContainer"]) 
    document.writeln('<SPAN ID="dragContainer" STYLE="position:absolute;visibility:hidden"></SPAN>');
}