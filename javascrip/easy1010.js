
/***********************************************************************
 
      Program ID    :   easy1031.js
 
      Description   :   
 
      Special Logic :   none
 
************************************************************************
                                  MODIFICATION LOG
 
          DATE            AUTHORS                DESCRIPTION
       -----------    -----------------      -------------------
        00/10/26           김태현                 Initial
 
***********************************************************************/
 
/**********************************************************************
 
    Function name : checkField(frm)
    Parameters    :	form이름		
    Return        : boolean (정상:true,비정상:false)
    Description   : 각 필드에 대한 Validation 점검
 
**********************************************************************/
 
function checkField(frm) 
{ 
	/*if (isBlank(frm.p_bigx_code)){
	     alert("제품군은 필수입력입니다.");
	     frm.p_bigx_code.focus();
	     return false;
	 }*/
	 
    UserName =  new objUserName(frm.p_user_name);
 
    if(!UserName.checkItem()) {  
		   return false;
     }
     
    TitlName =  new objTitlName(frm.p_titl_name);
 
    if(!TitlName.checkItem()) {  
		   return false;
     }
    
    BodyText =  new objBodyText(frm.p_body_text);
 
    if(!BodyText.checkItem()) {  
		   return false;
     }


    return true;
 
 
} 
/**********************************************************************
 
    function name : insertForm()
    Parameters :
      loc : form에 대해 action이 일어나는 프로그램의 디렉토리+이름
      tgt : action 이 일어나는 target (ex_: _parent,_self,_top,_blank)
      frm : form 이름
    Return     : void
    Description:등록(저장) 아이콘 Click 시

**********************************************************************/ 
function insertForm(loc,tgt,frm) 
{ 

    if( checkField(frm) ) { // 각 INPUT field의 내용이 입력조건에 만족하는 지 점검
        if(tgt=='' || tgt == null) {
			  frm.target = '_self';
        } else {
			  frm.target = tgt;
        }
    frm.method = 'post'	;
    frm.action = loc;
    frm.submit();  
    } else {
  	 return;
    }
}
