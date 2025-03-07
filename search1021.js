/***********************************************************************
 
      Program ID    :   search1021.js
 
      Description   :   키워드검색
 
      Special Logic :   none
 
************************************************************************
                                  MODIFICATION LOG
 
          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        2000/08/31        양광진                   
 
***********************************************************************/

function Search(frm) 
{
	
	if(frm.SearchStr.value.length < 1){
		alert("검색어를 입력하세요.");
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
