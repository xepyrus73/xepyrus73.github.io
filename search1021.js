/***********************************************************************
 
      Program ID    :   search1021.js
 
      Description   :   Ű����˻�
 
      Special Logic :   none
 
************************************************************************
                                  MODIFICATION LOG
 
          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/08/31        �籤��                   
 
***********************************************************************/

function Search(frm) 
{
	
	if(frm.SearchStr.value.length < 1){
		alert("�˻�� �Է��ϼ���.");
		frm.SearchStr.focus();
		return;
	}
	
//	parent.frames[1].frames[1].location='search1022.asp?SearchStr='+escape(frm.SearchStr.value);
//	return;
	
	frm.method='post';
	frm.action='search1022.asp';

	frm.target='center';

	frm.submit();
	return;
}
