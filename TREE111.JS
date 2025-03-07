<script langu01age="javascript">
var old_menu='';
var old_cellbar='';
var old_img='';
function menuclick(submenu,cellbar)
{

   if(submenu.id.indexOf("_")!=-1){
   
   	if(submenu.style.display==""){
   		submenu.style.display="none";
   		cellbar.src= "images/gu01.gif";
   	}
   	else
   	{
   		submenu.style.display="";
   		cellbar.src="images/gu01_on.gif";
   	}
   	
   }
   else
   {
   	if(submenu.style.display==""){
   		if(old_menu != ''){
   			old_menu.style.display="none";
   			old_cellbar.src="images/gu01.gif";
   		}
   		
   		   	
   		submenu.style.display="none";
   		cellbar.src= "images/gu01.gif";
   		old_menu=submenu;
   		old_cellbar=cellbar;
   	}
   	else
   	{
   		if(old_menu != ''){
   			old_menu.style.display="none";
   			old_cellbar.src="images/gu01.gif";
   		}
   		submenu.style.display="";
   		cellbar.src="images/gu01_on.gif";
   		old_menu=submenu;
   		old_cellbar=cellbar;
   	}
   }
   	
   
}

</script>